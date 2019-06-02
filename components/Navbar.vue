<template>
  <div class="navbar">
    <div class="btn-line">
      <NavbarButton
        v-for="(item, key) in nav"
        :key="key"
        :text="item.text"
        :to="item.to"
        :active="item.to === $route.path"
      />
    </div>
    <div class="bottom-decoration" />
  </div>
</template>

<script>
import NavbarButton from './NavbarButton'

export default {
  name: 'Navbar',
  components: {
    NavbarButton
  },
  data() {
    return {
      nav: [
        {
          text: 'Overview',
          to: '/'
        },
        {
          text: 'TiDB',
          to: '/tidb'
        },
        {
          text: 'PD',
          to: '/pd'
        },
        {
          text: 'TiKV',
          to: '/tikv'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar
  width 100%
  .bottom-decoration
    margin-top 10px
    width 100%
    height 4px
    background #fff
    border-radius 2px
</style>
