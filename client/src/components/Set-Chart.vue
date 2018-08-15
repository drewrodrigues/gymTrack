<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'Set-Chart',
  props: ['sets'],
  extends: Line,
  
  data() {
    return {
      dataCollection: {
        // Set 1, Set 2...
        labels: Array.from({length: this.sets.length }, (v, i) => "Set " + (i+1)),
        datasets: [
          { // Calculated 1 RM
            label: 'Calculated 1 RM',
            backgroundColor: '#f87979',
            data: this.sets.map(x => x.calculatedOneRepMax)
          }
        ]
      },

      chartProps: {
        maintainAspectRatio: false
      }
    }
  },

  mounted() {
    this.renderChart(this.dataCollection, this.chartProps)
  }
}
</script>

