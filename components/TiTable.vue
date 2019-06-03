<template>
  <div class="table-container">
    <h2 class="table-title">{{ title }}</h2>
    <div class="table-head">
      <div
        v-for="(key, ki) in keys"
        :key="ki"
        class="table-item"
        :style="{ width: `${100 / keys.length}%` }"
      >
        {{ names[key] || key }}
      </div>
    </div>
    <div v-for="(d, kd) in data" :key="kd" class="table-line">
      <div
        v-for="(key, ki) in keys"
        :key="ki"
        class="table-item"
        :style="{ width: `${100 / keys.length}%` }"
      >
        {{ d[key] }}
        <template v-if="ki === 0 && d['tag']">
          <tag
            v-for="(t, kt) in d['tag']"
            :key="kt"
            :text="t.text"
            :type="t.type"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/Tag'

export default {
  name: 'Table',
  components: { Tag },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    keys: {
      type: Array,
      default: () => []
    },
    names: {
      type: Object,
      default: () => {
        return {}
      }
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
  padding 0 20px
  width 100%
  .table-title
    font-size 20px
    font-weight bold
    margin-bottom 10px
  .table-head, .table-line
    height 40px
    line-height 40px
    .table-item
      display inline-block
  .table-head
    border-bottom 1px solid #fff
  .table-line
    height 30px
    line-height 30px
</style>
