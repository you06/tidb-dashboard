import io from 'socket.io-client'
import tidbWrapper from './modules/tidb'
import pdWrapper from './modules/pd'

export default function({ store }) {
  const socket = io(`${location.protocol}//${location.host}`)

  socket.on('connect', () => {
    tidbWrapper(socket, store)
    pdWrapper(socket, store)
  })
  store.socket = socket
}
