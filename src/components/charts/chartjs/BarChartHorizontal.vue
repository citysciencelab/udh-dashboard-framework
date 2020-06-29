<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { HorizontalBar } from 'vue-chartjs'
import AbstractChart from "@/components/charts/chartjs/AbstractChart.vue";

@Component({
    extends: HorizontalBar
})
export default class HorizontalBarChart extends AbstractChart {

 @Watch('chartData') onChartDataChanged() {
   if (!this.chartData || !this.chartData.datasets || !this.chartData.datasets[0] || !this.chartData.datasets[0].data || this.chartData.datasets[0].data.length === 0) {
     console.warn('No data for this chart')
   } else {
     this.renderChart(this.chartData, this.chartOptions);
   }
 }
}
</script>
