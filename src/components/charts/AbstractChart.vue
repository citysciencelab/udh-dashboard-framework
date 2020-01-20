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
    width = 100; // %
    height = 100; // %

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

    get style() {
        return {
            width: `${this.width}%`,
            height: `${this.height}%`
        };
    }

    get svgElement() {
        // We assume it's an <svg>, so we can typecast from JQuery world to DOM world
        return <SVGSVGElement>($('#' + this.selector).get(0) as any);
    }

    abstract createChart(): void;
}
</script>

<style lang="scss">
    .chart {
        padding: 0 !important;
        height: 100%;
        width: 100%;
        display: inline-block;
    }
</style>