export default (socket, store) => {
  socket.on('tikv-status', data => {
    store.commit('tikv/updateStatus', data)
  })
  socket.on('tikv-regions', data => {
    store.commit('tikv/updateRegions', data)
  })
}
