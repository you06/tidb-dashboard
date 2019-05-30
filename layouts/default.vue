<template>
  <div class="body-box">
    <timer class="global-timer" />
    <navbar class="global-navbar" />
    <nuxt />
  </div>
</template>

<script>
import Timer from '@/components/Timer'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Timer,
    Navbar
  }
}
</script>

<style lang="stylus">
html
  font-family 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif
  font-size 16px
  word-spacing 1px
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  box-sizing border-box
  background #0b0a1c
  height 100vh

*,
*:before,
*:after
  box-sizing border-box
  margin 0
  font-family roboto

.body-box
  position relative
  .global-timer
    position absolute
    left 50px
    top 25px
    display none
  .global-navbar
    margin-top 50px
    padding 0 100px
</style>
