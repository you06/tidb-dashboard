export const state = () => ({
  raft_bootstrap_time: 0,
  members: {
    header: { cluster_id: '-' },
    members: [],
    leader: {},
    etcd_leader: {}
  }
})

export const mutations = {
  updateBootstrapTime(state, t) {
    state.raft_bootstrap_time = t
  },
  updateMembers(state, members) {
    state.members = members
  }
}
