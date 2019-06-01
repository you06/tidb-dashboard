export default (socket, store, dashboard) => {
  for (const moduleName in dashboard) {
    const submodule = dashboard[moduleName]
    for (const item of submodule) {
      const key = `${moduleName}.${item.name}`
      socket.on(`dashboard-${key}`, data => {
        store.commit('dashboard/newdata', { key, item, data })
      })
    }
  }
}
