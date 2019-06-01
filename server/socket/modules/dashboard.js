module.exports = async (client, { store, dashboard }) => {

  for (const moduleName in dashboard) {
    const submodule = dashboard[moduleName]
    for (const item of submodule) {
      const key = `${moduleName}.${item.name}`
      client.emit(`dashboard-${key}`, await store.fetchDashboard(key))
    }
  }

  return client
}
