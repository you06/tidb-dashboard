<template>
  <div class="kv-container">
    <h2 class="kv-title">{{ title }}</h2>
    <p v-for="(item, key) in store" :key="key" class="kv-line">
      <span class="kv-key">{{ item.k }}: </span>
      <span class="kv-value">
        {{ item.v }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'KVDisplay',
  props: {
    kv: {
      type: [Array, Object],
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      store: []
    }
  },
  watch: {
    kv: function() {
      this.updateStore()
    }
  },
  created() {
    this.updateStore()
  },
  methods: {
    updateStore() {
      const type = Object.prototype.toString.call(this.kv)
      if (type === '[object Object]') {
        this.store = []
        for (const key in this.kv) {
          this.store.push({
            k: key,
            v: this.kv[key]
          })
        }
      } else if (type === '[object Array]') {
        this.store = this.kv
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.kv-container
  width 100%
  .kv-title
    font-size 20px
    font-weight bold
    margin-bottom 10px
  .kv-line
    height 30px
    line-height 30px
</style>
