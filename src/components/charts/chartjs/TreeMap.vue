<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Chart from 'chart.js'
import { generateChart } from 'vue-chartjs';
import 'chartjs-chart-treemap'

// Workaround for a problem with vue-chartjs, see: https://github.com/apertureless/vue-chartjs/issues/495
declare module 'vue/types/vue' {
  interface Vue {
    renderChart(chartData: Chart.ChartData, options?: Chart.ChartOptions): void
  }
}

const TreeMap = generateChart('tree-map', 'treemap');

@Component({
    extends: TreeMap
})
export default class TreeMapChart extends Vue {
    @Prop() chartData!: Chart.ChartData;
    @Prop() chartOptions!: Chart.ChartOptions;

    @Watch('chartData') onChartDataChanged() {
        this.renderChart(this.chartData, this.chartOptions);
    }

}
</script>
