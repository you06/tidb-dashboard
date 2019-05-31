export default (socket, store) => {
  socket.on('pd-bootstrapTime', data => {
    store.commit('pd/updateBootstrapTime', data)
  })
  socket.on('pd-members', data => {
    store.commit('pd/updateMembers', data)
  })
}
