<script lang="ts">
 import { Prop, Vue, Watch } from 'vue-property-decorator';
 import Utils from "@/utils/utils";


export default abstract class AbstractChart extends Vue {
  @Prop() isStandardTooltips!: boolean;
  @Prop() chartData!: Chart.ChartData;
  @Prop() chartOptions!: Chart.ChartOptions;

 @Watch('chartData') onDataChanged() {
  if (this.isStandardTooltips) {
   this.chartOptions['tooltips'] = {
    callbacks: {
     label: function(tooltipItem: any, data: any) {
      let label = Object.prototype.hasOwnProperty.call(data.datasets[0], 'label') ? data.datasets[0]['label'] : null;
      let value = new Utils().number.getDecimalSeparatedNumber(tooltipItem.value);
      if (label) {
       return ' ' + label + ': ' + value;
      } else {
       return ' ' + value;
      }
     }
    }
   }
  }
 }

}
</script>
