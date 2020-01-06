<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

export default abstract class AbstractChart extends Vue {
    @Prop() abstract ds: Dataset;
    @Prop() abstract options: ChartOptions;
    @Prop() abstract title: string;
    width = 300;
    height = 300;
    horizontalOffset = 60;

    @Watch('ds') onDsChanged() {
        if (this.ds.length > 0) {
            this.createChart();
        }
    }

    mounted() {
        // This double checks the setting of all $props variables
        // If the component gets initiated by

        //TODO: vielleicht in der componente vue-masterportal attrs gegen props austauschen und das callen ausprobieren!!!
        for (let obj of Object.keys(this.$props)) {
            if (this.$props[obj] === null) {
                if (this.$attrs[obj] !== null) {
                    this.$props[obj] = this.$attrs[obj];
                }
            }
        }
    }

    abstract createChart(): void;

    redrawOnDimensionsChange(svg: SVG) {
        const dimensions = this.$utils.chart.getDimensions(svg, this.title);
        if (this.$data.width !== dimensions[0] || this.$data.height !== dimensions[1]) {
            this.$data.width = dimensions[0];
            this.$data.height = dimensions[1] < 1 ? 300 : dimensions[1];
            if (this.ds.length > 0) {
                this.createChart();
            }
        }
    }
}
</script>

<style>
    .chart-container {
        display: inline-block;
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        vertical-align: top;
        overflow: hidden;
    }

    .chart {
        padding: 0 !important;
        height: 100%;
        width: 100%;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>