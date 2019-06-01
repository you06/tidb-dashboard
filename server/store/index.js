const axios = require('axios')
const Cache = require('./cache')
const Tidb = require('./modules/tidb')
const PD = require('./modules/pd')
const Prometheus = require('./modules/prometheus')

class Store {
  constructor(cluster, cacheTime, dashboard) {
    this.cluster = cluster
    this.cacheTime = cacheTime
    this.dashboard = dashboard
    this.axios = axios.create({
      timeout: 1000
    })
    this.cache = new Cache(this.cacheTime)
    this.tidb = new Tidb(this.axios, this.cluster)
    this.pd = new PD(this.axios, this.cluster)
    this.dashboard = new Prometheus(this.cluster.prometheus, dashboard, this.axios)
  }

  async fetchData(datastr, ...args) {
    const cacheKey = datastr + '-' + JSON.stringify(args)
    const cacheValue = this.cache.getCache(cacheKey)
    if (cacheValue) {
      // using cache
      return cacheValue
    } else {
      // fetch latest data
      const [ moduleName, key ] = datastr.split('.')
      const module = this[moduleName]
      if (module && module[key]) {
        try {
          const res = await module[key].call(module, ...args)
          // udpate cache
          this.cache.setCache(cacheKey, res)
          return res
        } catch(e) {
          // todo: error log
          return ''
        }
      } else {
        return ''
      }
    }
  }

  async fetchDashboardHistory(datastr, ...args) {
    const [ moduleName, key ] = datastr.split('.')
    try {
      const res = await this.dashboard.getHistory.call(this.dashboard, moduleName, key)
      return res
    } catch(e) {
      // todo: error log
      return ''
    }
  }

  async fetchDashboard(datastr, ...args) {
    const [ moduleName, key ] = datastr.split('.')
    try {
      const res = await this.dashboard.getData.call(this.dashboard, moduleName, key)
      return res
    } catch(e) {
      // todo: error log
      return ''
    }
  }
}

module.exports = Store
