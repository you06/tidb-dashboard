const getStatus = require('../../data/status')

module.exports = io => {
  io.on('connection', client => {
    setInterval(async () => {
      client.emit('status', await getStatus())
    }, 3000)
  })
  return io
}
