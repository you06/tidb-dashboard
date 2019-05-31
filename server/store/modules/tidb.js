const urljoin = require('url-join')

class Tidb {
  constructor(axios, servers) {
    this.axios = axios
    this.servers = servers
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
}

module.exports = Tidb
