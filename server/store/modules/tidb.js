const urljoin = require('url-join')

class Tidb {
  constructor(axios, { tidb, prometheus }) {
    this.axios = axios
    this.servers = tidb
  }

  async status() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'status'))
    return data
  }

  async regions() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'status'))
    return data
  }

  async allinfo() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'info/all'))
    return data
  }

  async duration() {
    const query = 'histogram_quantile(0.999, sum(rate(tidb_server_handle_query_duration_seconds_bucket[1m])) by (le))'
    const { data } = await this.axios.get(urljoin(this.prometheus, 'query'), {
      params: { query }
    })
    console.log(data)
    const res = data.data.result[0].value
    console.log(res)
    return res
  }

  async dashboard(key) {
    const config = key
  }
}

module.exports = Tidb
