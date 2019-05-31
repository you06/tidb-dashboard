export default (socket, store) => {
  socket.on('regions', data => {
    store.commit('tidb/updateRegions', data)
  })
  socket.on('status', data => {
    store.commit('tidb/updateStatus', data)
  })
  socket.on('allinfo', data => {
    store.commit('tidb/updateAllinfo', data)
  })
}
