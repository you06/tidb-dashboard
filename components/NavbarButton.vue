<template>
  <nuxt-link :to="to">
    <div class="navbar-botton">
      {{ text }}
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Navbar',
  components: {},
  props: {
    text: {
      type: String,
      default: 'button'
    },
    to: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar-botton
  padding 0 10px
  display inline-block
  font-size 18px
  color #fff
  transition text-shadow 0.3s ease-in-out
  cursor pointer
.navbar-botton:hover
  text-shadow #fff 0 0 4px
</style>
