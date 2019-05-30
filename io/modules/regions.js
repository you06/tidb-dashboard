export default (socket, store) => {
  socket.on('connect', () => {
    socket.on('regions', data => {
      store.commit('updateRegions', data)
    })
  })
}
