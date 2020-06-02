<script lang="ts">
import { Prop, Vue, Watch } from 'vue-property-decorator';
import Utils from "@/utils/utils";


export default abstract class AbstractChart extends Vue {
  @Prop() isStandardTooltips!: boolean;
  @Prop() chartData!: Chart.ChartData;
  @Prop() chartOptions!: Chart.ChartOptions;
  @Prop({ default: 'https://' }) linkPrefix!: string;
  currIndex!: number;

  @Watch('chartData') onDataChanged() {
    const that = this;

    if (this.chartData) {
      if (this.isStandardTooltips) {
        this.chartOptions['tooltips'] = {
          callbacks: {
            label: function (tooltipItem: any, data: any) {
              let tooltip = ' ';
              const value = new Utils().number.getDecimalSeparatedNumber(tooltipItem.value);
              const label = Object.prototype.hasOwnProperty.call(data.datasets[0], 'label') ? data.datasets[0]['label'] : null;
              const link = Object.prototype.hasOwnProperty.call(data.datasets[0], 'md_id') ? data.datasets[0]['md_id'] : null;

              if (label) {
                tooltip += `${label}: `;
              }
              if (value) {
                tooltip += value;
              }
              if (link) {
                that.currIndex = tooltipItem.index;
                tooltip += ' (Link öffnen)';
              }

              return tooltip;
            }
          }
        }
      }

      if (this.chartData.datasets) {
        if ((this.chartData.datasets[0] as Datum).md_id)
        this.$el.addEventListener('click', (e) => {
          const el = this.$data._chart.getDatasetAtEvent(e)[0];

          if (el) {
            if (this.chartData.datasets) {
              const dataset = (this.chartData.datasets[el._datasetIndex] as Datum);
              if (dataset.md_id) {
                window.open(this.linkUrl(dataset.md_id[this.currIndex]), "_blank");
              }
            }
          }
        });
      }
    }
  }

  linkUrl(path: string): string {
    return this.linkPrefix + path;
  }
}
</script>
