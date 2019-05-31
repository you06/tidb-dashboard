const axios = require('axios')
const Cache = require('./cache')
const Tidb = require('./modules/tidb')

class Store {
  constructor(cluster, cacheTime) {
    this.cluster = cluster
    this.cacheTime = cacheTime
    this.axios = axios.create({
      timeout: 1000
    })
    this.cache = new Cache(this.cacheTime)
    this.tidb = new Tidb(this.axios, this.cluster.tidb)
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
        const res = await module[key].call(module, ...args)
        // udpate cache
        this.cache.setCache(cacheKey, res)
        return res
      } else {
        return ''
      }
    }
  }
}

module.exports = Store
