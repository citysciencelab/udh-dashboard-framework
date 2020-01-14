<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as d3 from 'd3';
import $ from 'jquery';

export default abstract class AbstractChart extends Vue {
    @Prop() ds!: Dataset;
    @Prop() options!: ChartOptions;
    @Prop() title!: string;
    @Prop() metric!: string;
    @Prop() descriptor!: string;
    @Prop() selector!: string;
    @Prop() holderElement!: string;
    width = 300;
    height = 300;
    horizontalOffset = 60;
    barAxisSpace = 10;

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

    redrawOnDimensionsChange(svg: SVGSVGElement) {
        const dimensions = this.$utils.chart.getDimensions(svg, this.title, this.holderElement);
        let changed = false;

        if (!dimensions.length) {
            return;
        }
        if (this.width !== dimensions[0] && dimensions[0] > 0) {
            this.width = dimensions[0];
            changed = true;
        }
        if (this.height !== dimensions[1] && dimensions[1] > 0) {
            this.height = dimensions[1];
            changed = true;
        }
        if (changed && this.ds.length > 0) {
            this.createChart();
        }
    }

    getSVGElement() {
        // We assume it's an <svg>, so we can typecast from JQuery world to DOM world
        return <SVGSVGElement>($('#' + this.selector).get(0) as any);
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