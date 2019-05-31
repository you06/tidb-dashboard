const tikvWrapper = require('./modules/tikv')
const tidbWrapper = require('./modules/tidb')

module.exports = (io, opt) => {
  const connections = []
  io.on('connection', client => {
    connections.push(client)
    const int = setInterval(async () => {
      // emit event here
      tikvWrapper(client, opt)
      tidbWrapper(client, opt)
    }, 3000)
    client.on('disconnect', () => {
      const index = connections.indexOf(client)
      connections.splice(index, 1)
      clearInterval(int)
    })
  })
  return io
}
