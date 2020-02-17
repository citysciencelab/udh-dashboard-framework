<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Bar } from 'vue-chartjs'
import AbstractChart from './AbstractChart.vue';

// Workaround for a problem with vue-chartjs, see: https://github.com/apertureless/vue-chartjs/issues/495
declare module 'vue/types/vue' {
  interface Vue {
    renderChart(chartData: Chart.ChartData, options?: Chart.ChartOptions): void
  }
}

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
