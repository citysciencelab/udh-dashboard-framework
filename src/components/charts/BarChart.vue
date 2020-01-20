<template>
    <div class="chart-wrapper" :style="style">
        <svg class="chart" v-bind:id="selector"></svg>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';
import _d3tip from 'd3-tip';
import { Tooltip } from 'd3/types/d3';
import AbstractChart from './AbstractChart.vue';

const d3tip = _d3tip as () => Tooltip;

@Component({})
export default class BarChart extends AbstractChart {
    svgWidth = 0; // px
    svgHeight = 0; // px
    axisPadding = 10; // px

    mounted() {
        window.addEventListener('resize', this.createChart);
    }

    createChart() {
        const svg = <SVG>d3.select('#' + this.selector);
        svg.html(null);

        const node = svg.node();
        if (!node) {
            throw new Error("BarChart element is null")
        }
        const container = node.parentElement;
        if (!container) {
            throw new Error("BarChart's parent element is null")
        }

        // Get dimensions in pixels
        this.svgWidth = container.clientWidth;
        this.svgHeight = container.clientHeight;

        // Draw axes as if they filled the while SVG, only so we can measure the space
        // needed for the axis labels
        let xScale = this.$utils.chart.ordinalScale(this.ds, this.options.dim, this.svgWidth);
        let xAxis = d3.axisBottom(xScale);
        let xAxisHeight = this.$utils.chart.drawXAxis(svg, xAxis);

        let yMax = Math.max(...this.ds.map(o => o[this.metric]));
        let yScale = d3.scaleLinear().domain([0, yMax]).range([this.svgHeight, 0]);
        let yAxis = d3.axisLeft(yScale);
        let yAxisWidth = this.$utils.chart.drawYAxis(svg, yAxis);

        // Origin = bottom left corner of the first bar
        let originX = yAxisWidth + this.axisPadding;
        let originY = this.svgHeight - xAxisHeight - this.axisPadding;

        let barAreaWidth = this.svgWidth - originX;
        let barAreaHeight = originY;
        let barWidth = barAreaWidth / this.ds.length - 1;

        // Remove and redraw axes at fitted scale
        svg.select('.xAxis').remove();
        svg.select('.yAxis').remove();

        xScale = this.$utils.chart.ordinalScale(this.ds, this.options.dim, barAreaWidth);
        xAxis = d3.axisBottom(xScale);
        this.$utils.chart.drawXAxis(svg, xAxis, originX + barWidth / 2, originY + this.axisPadding);

        yScale = d3.scaleLinear().domain([0, yMax]).range([barAreaHeight, 0]);
        yAxis = d3.axisLeft(yScale);
        this.$utils.chart.drawYAxis(svg, yAxis, originX - this.axisPadding, 0);

        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d: string[]) => d[0]);
        svg.call(tip);

        const g = svg.selectAll<SVGRectElement, any>('rect').data(this.ds);

        g.enter()
            .append('rect')
            .merge(g)
            .attr('class', 'bar')
            .attr('width', () => barWidth)
            .attr('height', d => barAreaHeight - yScale(d[this.metric]))
            .attr('x', (d, i) => originX + i * barAreaWidth / this.ds.length)
            .attr('y', d => yScale(d[this.metric]))
            .on('mouseover', d => tip.show([`${d[this.descriptor]}: ${d[this.metric]}`], d3.event.target))
            .on('mouseout', tip.hide)

        this.$utils.chart.cleanSVGTag(svg);
        g.exit().remove();
    }
}
</script>
