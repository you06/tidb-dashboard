const urljoin = require('url-join')
const dns = require('../utils/dns')

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
    const promises = []
    for (const member of data.members) {
      for (let i = 0; i < member.peer_urls.length; i++) {
        const promise = dns(member.peer_urls[i]).then(({ hostname, ip }) => {
          member.peer_urls[i] = member.peer_urls[i].replace(hostname, ip)
        })
        promises.push(promise)
      }
      for (let i = 0; i < member.client_urls.length; i++) {
        const promise = dns(member.client_urls[i]).then(({ hostname, ip }) => {
          member.client_urls[i] = member.client_urls[i].replace(hostname, ip)
        })
        promises.push(promise)
      }
    }
    await Promise.all(promises)
    return data
  }

  async stores() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'stores'))
    const promises = []
    for (const store of data.stores) {
      const promise = dns(store.store.address).then(({ hostname, ip }) => {
        store.store.address = store.store.address.replace(hostname, ip)
      })
      promises.push(promise)
    }
    await Promise.all(promises)
    return data
  }

  async regions() {
    const { data } = await this.axios.get(urljoin(this.servers[0], 'regions'))
    return data
  }
}

module.exports = PD
