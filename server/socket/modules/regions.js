const getRegions = require('../../data/regions')

module.exports = io => {
  io.on('connection', client => {
    setInterval(async () => {
      client.emit('regions', await getRegions())
    }, 3000)
  })
  return io
}
