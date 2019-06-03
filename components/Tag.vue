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
    type: {
      type: String,
      default: 'info'
    }
  },
  data() {
    return {
      colors: {
        info: '#2c8ebb',
        danger: '#d94747',
        disabled: '#999999'
      }
    }
  },
  computed: {
    background() {
      return this.colors[this.type] || '#2c8ebb'
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
