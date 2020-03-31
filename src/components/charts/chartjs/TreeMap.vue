<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { generateChart } from 'vue-chartjs';
import 'chartjs-chart-treemap'
import AbstractChart from "@/components/charts/chartjs/AbstractChart.vue";

const TreeMap = generateChart('tree-map', 'treemap');

@Component({
    extends: TreeMap
})
export default class TreeMapChart extends AbstractChart {

    @Watch('chartData') onChartDataChanged() {
        this.chartOptions.tooltips = {
            callbacks: {
                title: (item: any, data: any) => {
                    let titleItem = item[0];
                    return data.datasets[titleItem.datasetIndex].data[titleItem.index].g;
                },
                label: (item: any, data: any) => {
                    if (data.datasets && data.datasets.length > 0 && item.datasetIndex != null) {
                        let index = item.datasetIndex;
                        let dataset = data.datasets[index];
                        if (dataset.data && item.index > -1) {
                            let index2: number = item.index;
                            let dataItem = dataset.data[index2];
                            return dataItem.v;
                        }
                    }
                }
            }
        }
        this.chartOptions.onClick = (event?: MouseEvent, activeElements?: Array<{}>) => {
            this.$emit('click', activeElements);
        };

        this.renderChart(this.chartData, this.chartOptions);
    }
}
</script>
