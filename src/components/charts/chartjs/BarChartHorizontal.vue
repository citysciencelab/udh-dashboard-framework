<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { HorizontalBar } from 'vue-chartjs'
import AbstractChart from "@/components/charts/chartjs/AbstractChart.vue";

@Component({
    extends: HorizontalBar
})
export default class HorizontalBarChart extends AbstractChart {
 @Watch('chartData') onChartDataChanged() {
  this.renderChart(this.chartData, this.chartOptions);
 }
}
</script>
