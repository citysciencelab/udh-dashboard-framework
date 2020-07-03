<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { Bar } from 'vue-chartjs'
import AbstractChart from "@/components/charts/chartjs/AbstractChart.vue";

@Component({
    extends: Bar
})
export default class BarChart extends AbstractChart {

 @Watch('chartData') onChartDataChanged() {
  this.renderChart(this.chartData, this.chartOptions);
 }

}
</script>
