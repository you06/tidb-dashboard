export default (socket, store) => {
  socket.on('connect', () => {
    socket.on('status', data => {
      store.commit('updateStatus', data)
    })
  })
}
