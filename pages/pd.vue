<template>
  <section class="container">
    <div v-for="(item, key) in charts" :key="key" class="chart-container">
      <h2 class="chart-title">{{ item.display }}</h2>
      <line-chart
        :data="$store.state.dashboard.data[`${name}.${item.name}`]"
        :config="item"
      />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import LineChart from '@/components/LineChart'

const name = 'pd'

export default {
  name: 'PD',
  components: {
    LineChart
  },
  data() {
    return {
      name
    }
  },
  computed: mapState({
    charts: state => state.dashboard.config[name]
  })
}
</script>

<style lang="stylus" scoped>
.container
  padding 10px 120px
  margin 0 auto
  color #fff
  width 100%
  .chart-container
    width 50%
    float left
    height 450px
    .chart-title
      width 100%
      text-align center
      color #ccc
      font-weight normal
      font-size 20px
</style>
