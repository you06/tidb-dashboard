const statusWrapper = require('./modules/status')
const regionsWrapper = require('./modules/regions')

module.exports = io => {
  statusWrapper(io)
  regionsWrapper(io)
  return io
}
