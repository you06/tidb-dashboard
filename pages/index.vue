<template>
  <section class="container">
    <div class="left-display">
      <ti-table title="TiDB Servers" />
    </div>
    <div class="right-display">
      <KV-display :kv="tidbStatus" title="TiDB Status" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import KVDisplay from '@/components/KVDisplay'
import TiTable from '@/components/TiTable'

export default {
  components: {
    KVDisplay,
    TiTable
  },
  computed: mapState({
    tidbStatus: state => state.tidb.status,
    tidbRegions: state => state.tidb.regions,
    tidbAllinfo: state => state.tidb.allinfo
  })
}
</script>

<style lang="stylus" scoped>
.container
  padding 30px 120px
  margin 0 auto
  display flex
  justify-content flex-start
  color #fff
  .left-display
    width 50%
  .right-display
    width 50%
</style>
