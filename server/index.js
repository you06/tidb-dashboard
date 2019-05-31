const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const Store = require('./store')

const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const ioWrapper = require('./socket')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  const cluster = {
    tidb: JSON.parse(process.env.TIDB || '[]'),
    // tikv: JSON.parse(process.env.TIKV || '[]'),
    pd: JSON.parse(process.env.PD || '[]')
  }
  const cacheTime = parseInt(process.env.CACHE_TIME || 1000)

  const store = new Store(cluster, cacheTime)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  ioWrapper(io, { cluster, store })

  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
