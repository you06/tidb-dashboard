export const state = () => ({
  title: {},
  data: {},
  config: {}
})

export const mutations = {
  initdata(state, data) {
    state.data = data
  },
  initconfig(state, config) {
    state.config = config
  },
  newtitle(state, { name, keys }) {
    state.title[name] = keys
  },
  newdata(state, { key, item, data }) {
    if (item.history === 0) {
      // udpate
      state.data[key] = data
    } else {
      // add
      state.data[key].push(data)
      const d = new Date().getTime() - item.history
      while (state.data[key][0].ts < d) {
        state.data[key].shift()
      }
    }
  }
}
