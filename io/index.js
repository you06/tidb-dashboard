import io from 'socket.io-client'
import statusWrapper from './modules/status'
import regionsWrapper from './modules/regions'

export default function({ env, store }) {
  if (process.client) {
    const socket = io(
      `${env.socket.protocol}://${env.socket.host}:${env.socket.port}`
    )
    statusWrapper(socket, store)
    regionsWrapper(socket, store)
    store.socket = socket
  }
}
