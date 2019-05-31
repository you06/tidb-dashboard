class Cache {
  constructor(cacheTime) {
    this.cacheTime = cacheTime
    this.cacheStore = {}
  }

  current() {
    return new Date().getTime()
  }

  getCache(key) {
    const ts = this.current()
    const match = this.cacheStore[key]
    if (match && ts - match.ts < this.cacheTime) {
      return match.value
    } else {
      return false
    }
  }

  setCache(key, value) {
    const ts = this.current()
    this.cacheStore[key] = {
      ts,
      value
    }
  }
}

module.exports = Cache
