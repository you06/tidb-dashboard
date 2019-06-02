export const state = () => ({
  status: {
    count: 0,
    stores: []
  }
})

export const mutations = {
  updateStatus(state, status) {
    state.status = status
  }
}
