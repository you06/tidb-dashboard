export const state = () => ({
  status: {
    connections: 0,
    version: '-',
    git_hash: '-'
  },
  regions: [],
  allinfo: {
    server_num: 1,
    owner_id: '-',
    is_all_server_version_consistent: true,
    all_servers_info: {}
  }
})

export const mutations = {
  updateStatus(state, status) {
    state.status = status
  },
  updateRegions(state, regions) {
    state.regions = regions
  },
  updateAllinfo(state, allinfo) {
    state.allinfo = allinfo
  }
}
