import io from 'socket.io-client'
import tidbWrapper from './modules/tidb'

export default function({ env, store }) {
  if (process.client) {
    const socket = io(
      `${env.socket.protocol}://${env.socket.host}:${env.socket.port}`
    )

    socket.on('connect', () => {
      tidbWrapper(socket, store)
    })
    store.socket = socket
  }
}
