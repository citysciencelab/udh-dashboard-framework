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
     console.log('No data for this chart')
     // Show some message? Append warning to canvas?
     // this.$refs['canvas'];
     // Maybe add this to canvas: <md-icon class="no-data">block</md-icon>
   } else {
     this.renderChart(this.chartData, this.chartOptions);
   }
 }
}
</script>
