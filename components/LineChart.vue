<script>
import { cloneDeep } from 'lodash'
import { Line } from 'vue-chartjs'
import { formatTime } from '@/utils/datetime'
import { colors, getGradient } from '@/utils/color'
import ruleParser from '@/utils/rule-parser'

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    data: {
      type: [Array, Object],
      default: () => []
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      colors,
      gradients: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: { maxTicksLimit: 10 }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                callback: (value, index, values) => {
                  return value + (this.config.unit || '')
                }
              }
            }
          ]
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0
          }
        }
      },
      chartData: {
        labels: [],
        datasets: []
      }
    }
  },
  computed: {
    parser() {
      return {
        rule: this.config.rule,
        fn: ruleParser(this.config.rule)
      }
    },
    targets() {
      const res = []
      for (const target of this.config.targets) {
        if (target.children) {
          for (const childItem of target.children) {
            res.push(cloneDeep(childItem))
          }
        } else {
          res.push(cloneDeep(target))
        }
      }
      return res
    }
  },
  watch: {
    data: function() {
      this.reloadData(false)
    }
  },
  mounted() {
    if (this.config.unit) {
      this.options.scaleLabel = `<%=value%>${this.config.unit}`
    }
    this.reloadData(true)
  },
  methods: {
    reloadData(init) {
      this.chartData.labels = this.data.map(i => formatTime(i.ts))
      if (init) {
        for (let i = 0; i < this.targets.length; i++) {
          const target = this.targets[i]
          if (!target.childrenTemplate) {
            const colorIndex = this.chartData.datasets.length
            this.gradients.push(getGradient(this.$refs.canvas, colorIndex))
            this.chartData.datasets.push({
              id: target.id,
              label: target.tag || '',
              borderColor: '#ffffff',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: 'white',
              backgroundColor: this.gradients[colorIndex],
              data: []
            })
          }
        }
        this.renderChart(this.chartData, this.options)
      }
      for (let i = 0; i < this.targets.length; i++) {
        const target = this.targets[i]
        if (target.childrenTemplate) {
          const childrenTemplate = target.childrenTemplate
          if (this.data[0]) {
            for (let j = 0; j < this.data[0].data.length; j++) {
              const tag = this.data[0].data[j][childrenTemplate.tagKey]
              const id = childrenTemplate.id.replace('$', tag)
              let dataset = this.chartData.datasets.find(d => d.id === id)
              if (!dataset) {
                // craete dateset dynamically
                const colorIndex = this.chartData.datasets.length
                this.gradients.push(getGradient(this.$refs.canvas, colorIndex))
                this.chartData.datasets.push({
                  id,
                  label: tag || '',
                  borderColor: '#ffffff',
                  pointBackgroundColor: 'white',
                  borderWidth: 1,
                  pointBorderColor: 'white',
                  backgroundColor: this.gradients[colorIndex],
                  data: []
                })
              }
              dataset = this.chartData.datasets.find(d => d.id === id)
              dataset.data = this.data.map(item => {
                const data = item.data.find(i => i.id === id)
                return this.parser.fn(data.val) / (this.config.rate || 1)
              })
            }
          }
        } else {
          const dataset = this.chartData.datasets[i]
          dataset.data = this.data.map(item => {
            const data = item.data.find(i => i.id === target.id)
            return this.parser.fn(data.val) / (this.config.rate || 1)
          })
          if (target.tagKey) {
            if (this.data[0]) {
              dataset.label = this.data[0].data[i][target.tagKey]
            }
          }
        }
      }
      this.$data._chart.update()
    }
  }
}
</script>

<style lang="stylus" scoped></style>
