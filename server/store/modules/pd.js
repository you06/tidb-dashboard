const urljoin = require('url-join')

class PD {
  constructor(axios, { pd, prometheus }) {
    this.axios = axios
    this.servers = pd.map(url => urljoin(url, 'pd/api/v1'))
    this.prometheus = urljoin(prometheus, '/api/v1')
  }

  async bootstrapTime() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'cluster/status'))
    return data.raft_bootstrap_time
  }

  async members() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'members'))
    return data
  }

  async stores() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'stores'))
    return data
  }

  async regions() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'regions'))
    return data
  }
}

module.exports = PD
