<template>
  <span :style="{ background }" class="tag-container">{{ text }}</span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    text: {
      type: String,
      default: '-'
    },
    background: {
      type: String,
      default: '#2c8ebb'
    }
  }
}
</script>

<style lang="stylus" scoped>
.tag-container
  font-size 13px
  line-height 13px
  padding 5px
  border-radius 5px
  color #fff
  margin 0 5px
</style>
