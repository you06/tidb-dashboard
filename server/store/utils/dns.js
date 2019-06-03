const dns = require('dns')

function dnslookup(host) {
  return new Promise((res, rej) => {
    dns.lookup(host, (err, address, family) => {
      if (err) {
        // err when not in docker subnet
        // return origin host
        res(host)
      } else {
        res(address)
      }
    })
  })
}

module.exports = async (host) => {
  const reg = /^[0-9a-zA-Z]*:\/\/([\s\S]*?):.*$/
  let hostPattern = host.match(reg)
  if (!hostPattern) {
    const regNoProtocol = /^([\s\S]*?):.*$/
    hostPattern = host.match(regNoProtocol)
  }
  if (hostPattern) {
    const hostname = hostPattern[1]
    const ip = await dnslookup(hostname)
    return { hostname, ip }
  } else {
    const ip = await dnslookup(host)
    return { host, ip }
  }
}
