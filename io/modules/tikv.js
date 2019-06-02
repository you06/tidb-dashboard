export default (socket, store) => {
  socket.on('tikv-status', data => {
    store.commit('tikv/updateStatus', data)
  })
}
