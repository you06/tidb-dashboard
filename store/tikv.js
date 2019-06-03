export const state = () => ({
  status: {
    count: 0,
    stores: [],
    regions: {
      count: 0,
      regions: []
    }
  }
})

export const mutations = {
  updateStatus(state, status) {
    state.status = status
  },
  updateRegions(state, regions) {
    state.regions = regions
  }
}
