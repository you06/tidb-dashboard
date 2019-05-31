<template>
  <div class="table-container">
    <h2 class="table-title">{{ title }}</h2>
    <div v-for="(d, kd) in data" :key="kd" class="table-line">
      <div v-for="(key, ki) in keys" :key="ki" class="table-item">
        {{ d[key] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    keys: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.table-container
  .table-title
    font-size 20px
    font-weight bold
    margin-bottom 10px
  .kv-line
    height 30px
    line-height 30px
</style>
