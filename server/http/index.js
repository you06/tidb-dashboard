const Router = require('koa-router')
const histroyWrapper = require('./history')

module.exports = (opt) => {
  const router = new Router()
  histroyWrapper(router, opt)
  return router
}
