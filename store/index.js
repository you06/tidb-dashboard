export const state = () => ({
  status: {
    connections: 0,
    version: '-',
    git_hash: '-'
  },
  regions: []
})

export const mutations = {
  updateStatus(state, status) {
    state.status = status
  },
  updateRegions(state, regions) {
    state.regions = regions
  }
}
