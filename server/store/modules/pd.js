const urljoin = require('url-join')

class PD {
  constructor(axios, servers) {
    this.axios = axios
    this.servers = servers.map(url => urljoin(url, 'pd/api/v1'))
  }

  async bootstrapTime() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'cluster/status'))
    return data.raft_bootstrap_time
  }

  async members() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'members'))
    return data
  }
}

module.exports = PD
