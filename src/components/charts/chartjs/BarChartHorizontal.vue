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
    mounted () {
        this.addPlugin({
            id: 'my-plugin',
            beforeInit: function (chart: any) {
                console.log("Maybe a plugin can solve the problem?")
            }
        })
    }
}
</script>
