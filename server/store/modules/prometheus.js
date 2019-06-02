const urljoin = require('url-join')

class Prometheus {
  constructor(url, dashboard, axios) {
    this.url = urljoin(url, '/api/v1')
    this.dashboard = dashboard
    this.axios = axios
    this.initHistory()
    this.initFetch()
  }

  initHistory() {
    this.history = {}
    for (const moduleName in this.dashboard) {
      const submodule = this.dashboard[moduleName]
      for (const item of submodule) {
        const itemKey = `${moduleName}.${item.name}`
        if (item.history === 0) {
          // no history
          this.history[itemKey] = {
            itemKey,
            moduleName,
            name: item.name,
            history: 0,
            data: {}
          }
        } else {
          this.history[itemKey] = {
            itemKey,
            moduleName,
            name: item.name,
            history: item.history,
            data: []
          }
        }
      }
    }
  }

  pushHistory(itemKey, ts, data) {
    if (this.history[itemKey].history === 0) {
      this.history[itemKey].data = {
        ts,
        data
      }
    } else {
      const d = new Date().getTime() - this.history[itemKey].history
      this.history[itemKey].data.push({
        ts,
        data
      })
      while (this.history[itemKey].data[0].ts < d) {
        this.history[itemKey].data.shift()
      }
    }
  }

  async initInstance() {
    this.axios.get(urljoin(this.url, 'query'), {
      params: { query: 'pd_cluster_status' }
    }).then(({ data }) => {
      this.instance = data.data.result[0].metric.instance
    })
  }

  async initFetch() {
    await this.initInstance()
    setInterval(() => {
      for (const moduleName in this.dashboard) {
        const submodule = this.dashboard[moduleName]
        for (const item of submodule) {
          this.fetchData(moduleName, item.name)
        }
      }
    }, 2500)
  }

  async fetchData(moduleName, key) {
    const dashboardModule = this.dashboard[moduleName]
    if (!dashboardModule) {
      return ''
    } else {
      const item = dashboardModule.find(item => item.name === key)
      const itemKey = `${moduleName}.${item.name}`
      if (!item) {
        return ''
      } else {
        // fetch data
        if (item.type === 'chart') {
          return await this.fetchChart(item, itemKey)
        }
      }
    }
  }

  async fetchChart(item, itemKey) {
    // console.log(cfg)
    const res = []
    const promises = []
    for (const target of item.targets) {
      const { id, expr } = target
      const promise = this.axios.get(urljoin(this.url, 'query'), {
        params: { query: expr.replace('$instance', this.instance) }
      }).then(({ data }) => {
        data.data.result[0].value[0] *= 1000
        if (target.childrenTemplate) {
          for (let i = 0; i < data.data.result.length; i++) {
            const r = {
              val: data.data.result[i].value
            }
            const { tagKey, res: tag } = this.parseTagKey(target.childrenTemplate.tagKey, data.data.result[i])
            r[tagKey] = tag
            const id = target.childrenTemplate.id.replace('$', tag)
            r.id = id
            res.push(r)
          }
        } else if (target.children) {
          for (let i = 0; i < target.children.length; i++) {
            if (data.data.result[i]) {
              const r = {
                id: target.children[i].id,
                val: data.data.result[i].value
              }
              if (target.children[i].tagKey) {
                const { tagKey, res: tag } = this.parseTagKey(target.children[i].tagKey, data.data.result[i])
                r[tagKey] = tag
              }
              res.push(r)
            }
          }
        } else {
          res.push({
            id,
            val: data.data.result[0].value
          })
        }
      })
      promises.push(promise)
    }
    // start multiple query at the same time
    await Promise.all(promises)
    const ts = res[0].val[0]
    this.pushHistory(itemKey, ts, res)
    return res
  }

  getData(moduleName, key) {
    const itemKey = `${moduleName}.${key}`
    const item = this.history[itemKey]
    if (item.history === 0) {
      return item.data
    } else {
      return item.data[item.data.length - 1]
    }
  }

  getHistory(moduleName, key) {
    const itemKey = `${moduleName}.${key}`
    const item = this.history[itemKey]
    return item.data
  }

  parseTagKey(tagKey, raw) {
    const tags = tagKey.split('.')
    let res = raw
    for (const tag of tags) {
      res = res[tag]
    }
    return { tagKey, res }
  }
}

module.exports = Prometheus
