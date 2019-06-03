<template>
  <section class="container">
    <!-- TiDB status -->
    <div class="line-display">
      <div class="left-display">
        <KV-display :kv="tidbStatus" title="TiDB Status" />
      </div>
      <div class="right-display">
        <ti-table
          :data="tidbAllinfo"
          :keys="tidbAllinfoKeys"
          :names="tidbAllinfoKeyName"
          title="TiDB Servers"
        />
      </div>
    </div>
    <!-- PD status -->
    <div class="line-display">
      <div class="left-display">
        <KV-display :kv="{ 'boot time': pdBootstrapTime }" title="PD Status" />
      </div>
      <div class="right-display">
        <ti-table
          :data="pdMembers"
          :keys="pdMemberKeys"
          :names="pdMemberKeyName"
          title="PD Servers"
        />
      </div>
    </div>
    <!-- TiKV status -->
    <div class="line-display">
      <div class="left-display">
        <KV-display :kv="tikvStatus" title="TiKV Status" />
      </div>
      <div class="right-display">
        <ti-table
          :data="tikvStores"
          :keys="tikvStoreKeys"
          title="TiKV Servers"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapState } from 'vuex'
import KVDisplay from '@/components/KVDisplay'
import TiTable from '@/components/TiTable'
import { formatDatetime } from '@/utils/datetime'

export default {
  name: 'Dashboard',
  components: {
    KVDisplay,
    TiTable
  },
  data() {
    return {
      tidbAllinfoKeys: ['ip', 'listening_port', 'status_port'],
      tidbAllinfoKeyName: {
        listening_port: 'listening port',
        status_port: 'status port'
      },
      pdMemberKeys: ['name', 'member_id', 'peer_urls', 'client_urls'],
      pdMemberKeyName: {
        member_id: 'id',
        peer_urls: 'peer urls',
        client_urls: 'client urls'
      },
      tikvStoreKeys: ['id', 'address', 'available', 'capacity']
    }
  },
  computed: mapState({
    tidbStatus: state => state.tidb.status,
    tidbRegions: state => state.tidb.regions,
    tidbAllinfo: state => {
      const allinfo = state.tidb.allinfo
      const res = []
      for (const id in allinfo.all_servers_info) {
        const server = cloneDeep(allinfo.all_servers_info[id])
        server.tag = id === allinfo.owner_id ? ['owner'] : []
        server.ip = server.ip || '-'
        res.push(server)
      }
      return res
    },
    pdBootstrapTime: state => formatDatetime(state.pd.raft_bootstrap_time),
    pdMembers: state => {
      const members = state.pd.members
      const leader = members.leader
      const etcdLeader = members.etcd_leader
      const res = []
      if (leader.member_id) {
        // data load complete
        for (const member of members.members) {
          const m = cloneDeep(member)
          m.tag = []
          if (m.member_id === leader.member_id) {
            m.tag.push({
              type: 'info',
              text: 'leader'
            })
          }
          if (m.member_id === etcdLeader.member_id) {
            m.tag.push({
              type: 'info',
              text: 'etcd leader'
            })
          }
          m.peer_urls = m.peer_urls.join(',')
          m.client_urls = m.client_urls.join(',')
          res.push(m)
        }
      }
      return res
    },
    tikvStatus: state => {
      const status = state.tikv.status
      const res = {
        count: status.count
      }
      return res
    },
    tikvStores: state => {
      const status = state.tikv.status
      return status.stores.map(store => {
        const res = {
          id: store.store.id,
          tag: [],
          address: store.store.address,
          available: store.status.available,
          capacity: store.status.capacity
        }
        if (store.state_name === 'Down') {
          res.tag.push({
            type: 'danger',
            text: 'Down'
          })
        } else if (store.state_name === 'Disconnected') {
          res.tag.push({
            type: 'danger',
            text: 'Disconnected'
          })
        } else if (store.state_name === 'Offline') {
          res.tag.push({
            type: 'disabled',
            text: 'Offline'
          })
        } else if (store.state_name === 'Tombstone') {
          res.tag.push({
            type: 'disabled',
            text: 'Tombstone'
          })
        }
        return res
      })
    }
  })
}
</script>

<style lang="stylus" scoped>
.container
  padding 10px 120px
  margin 0 auto
  color #fff
  .line-display
    width 100%
    padding 20px 0
    clear both
    .left-display, .right-display
      float right
    @media screen and (max-width: 1900px)
      .left-display
        width 100%
      .right-display
        width 100%
      .left-display, .right-display
        margin-top 20px
    @media screen and (min-width: 1900px)
      .left-display
        width 50%
      .right-display
        width 50%
</style>
