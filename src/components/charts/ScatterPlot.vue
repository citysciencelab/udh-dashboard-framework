<template>
    <svg class="chart" v-bind:id="selector" width="500" height="300"></svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';
import AbstractChart from './AbstractChart.vue';

@Component({})
export default class ScatterPlot extends AbstractChart {
    @Prop() origins!: string[];
    @Prop() metric2!: string;

    mounted() {
        this.redraw();
        window.addEventListener('resize', this.redraw);
    }

    redraw() {
        this.redrawOnDimensionsChange(this.getSVGElement());
    }

    createChart() {
        let svg = <SVG>d3.select('#' + this.selector);
        let offset = this.$utils.chart.getYOffset(this.title);

        let maxVal = Math.max(...this.ds.map(o => o[this.metric]));
        let minVal = Math.min(...this.ds.map(o => o[this.metric]));
        let maxVal2 = Math.max(...this.ds.map(o => o[this.metric2]));
        let minVal2 = Math.min(...this.ds.map(o => o[this.metric2]));

        let g = (<d3.Selection<SVGCircleElement, any, SVGSVGElement, any>>svg.selectAll('circle'))
            .data(this.ds);

        let yScale = d3.scaleLinear()
            .domain([minVal, maxVal])
            .range([this.height, 0]);

        let yAxis = d3.axisLeft(yScale);

        let xScale = d3.scaleLinear()
            .domain([minVal2, maxVal2])
            .range([0, this.width]);

        let xAxis = d3.axisBottom(xScale);

        svg.selectAll('g').remove();

        if (this.title) {
            this.$utils.chart.addTitle(this.title, svg, this.width);
        }

        g.enter()
            .append('circle')
            .attr('r', '4')
            .attr('class', 'point')
            .merge(g)
            .attr('cx', d => xScale(d[this.metric2]) + this.horizontalOffset)
            .attr('cy', d => yScale(d[this.metric]))
            .attr('transform', 'translate(0,' + offset + ')');

        this.$utils.chart.drawAxis(this.height, svg, xAxis, yAxis, offset, this.horizontalOffset, 0);
        svg.exit().remove();
    }
}
</script>
