<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Bar } from 'vue-chartjs'

@Component({
    extends: Bar
})
export default class BarChart extends Vue {
    @Prop() chartData!: Chart.ChartData;
    @Prop() chartOptions!: Chart.ChartOptions;

    @Watch('chartData') onChartDataChanged() {
        this.renderChart(this.chartData, this.chartOptions);
    }

}
</script>
