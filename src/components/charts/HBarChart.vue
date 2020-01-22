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
export default class HBarChart extends AbstractChart {
    axisPadding = 10; // px

    mounted() {
        this.svg = <SVG>d3.select('#' + this.selector);
        window.addEventListener('resize', this.createChart);
    }

    createChart() {
        // Draw axes as if they filled the whole SVG, only so we can measure the space
        // needed for the axis labels
        let xScale = this.xScale(this.svgWidth);
        let xAxis = d3.axisBottom(xScale);
        let xAxisHeight = this.$utils.chart.drawXAxis(this.svg, xAxis);

        let yScale = this.yScale(this.svgHeight);
        let yAxis = d3.axisLeft(yScale);
        let yAxisWidth = this.$utils.chart.drawYAxis(this.svg, yAxis);

        // Calculate size of drawing area
        let barAreaWidth = this.svgWidth - yAxisWidth - this.axisPadding;
        let barAreaHeight = this.svgHeight - xAxisHeight - this.axisPadding;
        let barWidth = barAreaHeight / this.ds.length - 1;

        // Origin = bottom left corner of the first bar
        let originX = this.svgWidth - barAreaWidth;
        let originY = barAreaHeight;

        // Remove and redraw axes at fitted scale
        this.svg.select('.xAxis').remove();
        this.svg.select('.yAxis').remove();

        xScale = this.xScale(barAreaWidth);
        xAxis = d3.axisBottom(xScale);
        this.$utils.chart.drawXAxis(this.svg, xAxis, originX, originY + this.axisPadding);

        yScale = this.yScale(barAreaHeight);
        yAxis = d3.axisLeft(yScale);
        this.$utils.chart.drawYAxis(this.svg, yAxis, originX - this.axisPadding,  barWidth / 2);

        // Create tooltip
        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d: string[]) => d[0]);
        this.svg.call(tip);

        // Draw bars
        let g = this.svg.selectAll<SVGRectElement, any>('rect').data(this.ds);

        g.enter()
            .append('rect')
            .merge(g)
            .attr('class', 'bar')
            .attr('width', d => xScale(d[this.metric]))
            .attr('height', barWidth)
            .attr('x', originX)
            .attr('y', (d, i) => i * barAreaHeight / this.ds.length)
            .on('mouseover', d => tip.show([d[this.descriptor] + ': ' + d[this.metric]], d3.event.target))
            .on('mouseout', tip.hide);

        this.$utils.chart.cleanSVGTag(this.svg);
        g.exit().remove();
    }

    private xScale(width: number) {
        let xMax = Math.max(...this.ds.map(o => o[this.metric]));
        return d3.scaleLinear().domain([0, xMax]).range([0, width]);
    }

    private yScale(height: number) {
        return this.$utils.chart.ordinalScale(this.ds, this.options.dim, height);
    }
}
</script>
