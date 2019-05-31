<template>
  <div class="navbar">
    <div class="btn-line">
      <NavbarButton
        v-for="(item, key) in nav"
        :key="key"
        :text="item.text"
        :to="item.to"
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
          text: 'PD',
          to: '/pd'
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
