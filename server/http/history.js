module.exports = function(router, { dashboard, store }) {
  router.get('/api/v1/history/:key', async (ctx, next) => {
    // ctx.router available
    const [ moduleName, name ] = ctx.params.key.split('.')
    if (dashboard[moduleName]) {
      const item = dashboard[moduleName].find(i => i.name === name)
      if (item) {
        ctx.body = await store.fetchDashboardHistory(`${moduleName}.${item.name}`)
      }
    }
  })
}
