<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { HorizontalBar } from 'vue-chartjs'

@Component({
    extends: HorizontalBar
})
export default class HorizontalBarChart extends Vue {
    @Prop() chartData!: Chart.ChartData;
    @Prop() chartOptions!: Chart.ChartOptions;

    @Watch('chartData') onChartDataChanged() {
        this.renderChart(this.chartData, this.chartOptions);
    }

}
</script>
