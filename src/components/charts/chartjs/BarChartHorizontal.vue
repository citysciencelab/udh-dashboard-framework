<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { HorizontalBar } from 'vue-chartjs'

// Workaround for a problem with vue-chartjs, see: https://github.com/apertureless/vue-chartjs/issues/495
declare module 'vue/types/vue' {
  interface Vue {
    renderChart(chartData: Chart.ChartData, options?: Chart.ChartOptions): void
  }
}

@Component({
    extends: HorizontalBar
})
export default class HorizontalBarChart extends Vue {
    @Prop() chartData!: Chart.ChartData;
    @Prop() chartOptions!: Chart.ChartOptions;

    @Watch('chartData') onChartDataChanged() {
        this.renderChart(this.chartData, this.chartOptions);
        // this.renderChart({
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        //     datasets: [
        //         {
        //             type: 'horizontalBar',
        //             label: 'Data One',
        //             backgroundColor: '#f87979',
        //             data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        //         }
        //     ]
        // }, this.chartOptions)
    }

}
</script>
