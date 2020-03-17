<template>
  <div
    class="chart-wrapper"
    :style="style"
  >
    <svg
      class="chart"
      :id="selector"
    />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import * as d3 from 'd3';
import _d3tip from 'd3-tip';
import { Tooltip } from 'd3/types/d3';  // eslint-disable-line no-unused-vars
import AbstractChart from './AbstractChart.vue';

const d3tip = _d3tip as () => Tooltip;

@Component({})
export default class BarChart extends AbstractChart {
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
        let barWidth = barAreaWidth / this.ds.length - 1;

        // Origin = bottom left corner of the first bar
        let originX = this.svgWidth - barAreaWidth;
        let originY = barAreaHeight;

        // Remove and redraw axes at fitted scale
        this.svg.select('.xAxis').remove();
        this.svg.select('.yAxis').remove();

        xScale = this.xScale(barAreaWidth);
        xAxis = d3.axisBottom(xScale);
        this.$utils.chart.drawXAxis(this.svg, xAxis, originX + barWidth / 2, originY + this.axisPadding);

        yScale = this.yScale(barAreaHeight);
        yAxis = d3.axisLeft(this.reverseYScale(barAreaHeight));
        this.$utils.chart.drawYAxis(this.svg, yAxis, originX - this.axisPadding, 0);

        // Create tooltip
        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d: string[]) => d[0]);
        this.svg.call(tip);

        // Draw bars
        const g = this.svg.selectAll<SVGRectElement, any>('rect')
            .data(this.ds);

        g.enter()
            .append('rect')
            .merge(g)
            .attr('class', 'bar')
            .attr('width', barWidth)
            .attr('height', d => yScale(d[this.metric]))
            .attr('x', (d, i) => originX + i * barAreaWidth / this.ds.length)
            .attr('y', d => originY - yScale(d[this.metric]))
            .on('mouseover', d => tip.show([`${d[this.descriptor]}: ${d[this.metric]}`], d3.event.target))
            .on('mouseout', tip.hide);

        this.$utils.chart.cleanSVGTag(this.svg);
        g.exit().remove();
    }

    private xScale(width: number) {
        return this.$utils.chart.ordinalScale(this.ds, this.options.dim, width);
    }

    private yScale(height: number) {
        let yMax = Math.max(...this.ds.map(o => o[this.metric]));
        return d3.scaleLinear().domain([0, yMax]).range([0, height]);
    }

    private reverseYScale(height: number) {
        let yMax = Math.max(...this.ds.map(o => o[this.metric]));
        return d3.scaleLinear().domain([0, yMax]).range([height, 0]);
    }
}
</script>
