export default (socket, store, dashboard) => {
  const keys = []
  for (const moduleName in dashboard) {
    const submodule = dashboard[moduleName]
    for (const item of submodule) {
      const key = `${moduleName}.${item.name}`
      keys.push(key)
      socket.on(`dashboard-${key}`, data => {
        store.commit('dashboard/newdata', { key, item, data })
      })
    }
  }
  store.dispatch('dashboard/fetchHistoryData', keys)
}
