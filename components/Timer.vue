<template>
  <div class="container">
    <svg viewBox="-2 -2 204 204">
      <g fill="none" stroke-width="2" transform="translate(100,100)">
        <path d="M 0,-100 A 100,100 0 1 0 0,100" stroke="#44c4fa" />
        <path d="M 0,100 A 100,100 1 0 0 100,0" stroke="url(#gradient)" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  components: {}
}
</script>

<style lang="stylus" scoped>
.container
  width 50px
  height 50px
g
  animation loading linear 2s infinite
@keyframes loading
  from
    transform translate(100px,100px) rotate(0deg)
  to
    transform: translate(100px,100px) rotate(360deg)
</style>
