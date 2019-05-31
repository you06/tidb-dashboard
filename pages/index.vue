<template>
  <section class="container">
    <div class="cluster-display">
      <ti-table title="TiDB Servers" />
    </div>
    <KV-display :kv="status" title="TiDB Status" class="status-display" />
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
    status: state => state.status,
    regions: state => state.regions
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
  .cluster-display
    width 50%
  .status-display
    width 50%
</style>
