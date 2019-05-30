<template>
  <section class="container">
    <KV-display :kv="status" class="status-display" />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import KVDisplay from '@/components/KVDisplay'

export default {
  components: {
    KVDisplay
  },
  computed: mapState({
    status: state => state.status
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
  .status-display
    width 50%
</style>
