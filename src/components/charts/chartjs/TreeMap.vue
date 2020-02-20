<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Chart from 'chart.js'
import { generateChart } from 'vue-chartjs';
import 'chartjs-chart-treemap'

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
