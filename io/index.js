import io from 'socket.io-client'
import tidbWrapper from './modules/tidb'
import pdWrapper from './modules/pd'
import dashboardWrapper from './modules/dashboard'

export default function({ store, env: { dashboard } }) {
  const socket = io(`${location.protocol}//${location.host}`)

  socket.on('connect', () => {
    tidbWrapper(socket, store)
    pdWrapper(socket, store)
    dashboardWrapper(socket, store, dashboard)
  })
  store.socket = socket
}
