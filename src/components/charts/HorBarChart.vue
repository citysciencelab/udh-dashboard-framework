<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';
import _d3tip from 'd3-tip';
import { Tooltip } from 'd3/types/d3';
import AbstractChart from './AbstractChart.vue';

const d3tip = _d3tip as () => Tooltip;

@Component({})
export default class HBarChart extends AbstractChart {
    @Prop() ds!: Dataset;
    @Prop() options!: { dim: string };
    @Prop() title!: string;
    @Prop() metric!: string;
    @Prop() descriptor!: string;
    @Prop() selector!: string;

    mounted() {
        this.redraw();
        window.addEventListener('resize', this.redraw);
    }

    redraw() {
        const svg = <SVG>d3.select('#' + this.selector);
        this.redrawOnDimensionsChange(svg);
    }

    createChart() {
        let svg = <SVG>d3.select('#' + this.selector);
        let vOffset = this.$utils.chart.getOffset(this.title);
        let g = (<d3.Selection<SVGRectElement, any, SVGSVGElement, any>>svg.selectAll('rect'))
            .data(this.ds);

        let maxVal = Math.max.apply(Math, this.ds.map(o => o[this.metric]));
        let xScale = d3.scaleLinear()
            .domain([maxVal, 0])
            .range([0, this.width]);
        let xAxis = d3.axisBottom(xScale);
        let yScale = this.$utils.chart.initOrdinalScale(this.ds, this.options.dim, this.height);
        let yAxis = d3.axisLeft(yScale);

        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d: string[]) => d[0]);
        svg.call(tip);
        svg.selectAll('g').remove();

        if (this.title) {
            this.$utils.chart.addTitle(this.title, svg, this.width);
        }

        g.enter()
            .append('rect')
            .merge(g)
            .attr('class', 'bar')
            .attr('height', () => this.height / this.ds.length - 1)
            .attr('width', d => this.width - xScale(d[this.metric]))
            .attr('y', (d, i) => i * this.height / this.ds.length)
            .attr('x', this.horizontalOffset)
            .on('mouseover', d => tip.show([d[this.descriptor] + ': ' + d[this.metric]], d3.event.target))
            .on('mouseout', tip.hide)
            .attr('transform', 'translate(0,' + vOffset + ')');

        // Half an element size plus offset
        const yAxisOffset = this.height / this.ds.length / 2 + vOffset;
        this.$utils.chart.drawAxis(this.height, svg, xAxis, yAxis, vOffset, this.horizontalOffset, yAxisOffset);
        g.exit().remove();
    }
}
</script>

<style scoped>
    .chart {
        padding: 20px;
    }
</style>
