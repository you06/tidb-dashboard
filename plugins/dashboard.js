export default function({ store, env: { dashboard } }) {
  store.commit('dashboard/initconfig', dashboard)
  const data = {}
  for (const moduleName in dashboard) {
    const submodule = dashboard[moduleName]
    const keys = []
    for (const item of submodule) {
      const key = `${moduleName}.${item.name}`
      keys.push({
        name: item.name,
        display: item.display
      })
      if (item.history === 0) {
        // udpate
        data[key] = {}
      } else {
        // add
        data[key] = []
      }
    }
    store.commit('dashboard/newtitle', {
      name: moduleName,
      keys
    })
  }
  store.commit('dashboard/initdata', data)
}
