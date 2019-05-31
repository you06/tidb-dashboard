export default (socket, store) => {
  socket.on('tidb-regions', data => {
    store.commit('tidb/updateRegions', data)
  })
  socket.on('tidb-status', data => {
    store.commit('tidb/updateStatus', data)
  })
  socket.on('tidb-allinfo', data => {
    store.commit('tidb/updateAllinfo', data)
  })
}
