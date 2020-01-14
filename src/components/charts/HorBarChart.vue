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

    mounted() {
        this.redraw();
        window.addEventListener('resize', this.redraw);
    }

    redraw() {
        this.redrawOnDimensionsChange(this.getSVGElement());
    }

    createChart() {
        let svg = <SVG>d3.select('#' + this.selector);
        svg.html(null);

        let yOffset = this.$utils.chart.getYOffset(this.title) || 0;
        let xOffset = this.$utils.chart.getXOffset(this.getSVGElement(), this.holderElement);
        let barAreaHeight = this.height - yOffset - this.barAxisSpace;

        let g = svg.selectAll<SVGRectElement, any>('rect')
            .data(this.ds);

        // Draw the Y-Axis - but just for calculation
        let yScale = this.$utils.chart.initOrdinalScale(this.ds, this.options.dim, barAreaHeight);
        let yAxis = d3.axisLeft(yScale);

        let maxWidthAxis = this.$utils.chart.drawAxisMeasureExtent(svg, yAxis, 'yAxis');
        let barAreaWidth = this.width - xOffset - maxWidthAxis;
        // Remove the axis
        svg.selectAll('.yAxis').remove();

        // Now drawing the xAxis
        let maxVal = Math.max.apply(Math, this.ds.map(o => o[this.metric]));
        let xScale = d3.scaleLinear()
            .domain([0, maxVal])
            .range([0, barAreaWidth]);
        let xAxis = d3.axisBottom(xScale);

        // Calculate the axis size and take it into account
        let maxHeightAxis = this.$utils.chart.drawAxisMeasureExtent(svg, xAxis, 'xAxis');
        yOffset = maxHeightAxis + yOffset;

        // Now we can recalculate the actual chart area
        barAreaHeight = this.height - yOffset;

        svg.selectAll('.xAxis')
            .attr('transform', 'translate(' + (xOffset + maxWidthAxis + this.barAxisSpace) + ',' + (yOffset + barAreaHeight + this.barAxisSpace) + ')');

        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d: string[]) => d[0]);
        svg.call(tip);

        if (this.title) {
            this.$utils.chart.addTitle(this.title, svg, this.width);
        }

        let barHeight = barAreaHeight / this.ds.length - 1;

        g.enter()
            .append('rect')
            .merge(g)
            .attr('class', 'bar')
            .attr('width', d => xScale(d[this.metric]))
            .attr('height', () => barHeight)
            .attr('y', (d, i) => i * barAreaHeight / this.ds.length + yOffset)
            .attr('x', d => xOffset + maxWidthAxis)
            .on('mouseover', d => tip.show([d[this.descriptor] + ': ' + d[this.metric]], d3.event.target))
            .on('mouseout', tip.hide)
            .attr('transform', 'translate(' + xOffset + ', 0)');

        // Now that we have the real barAreaWidth, we can finally draw the xAxis
        yScale = this.$utils.chart.initOrdinalScale(this.ds, this.options.dim, barAreaHeight);
        yAxis = d3.axisLeft(yScale);

        // this.$utils.chart.drawYAxis(svg, yAxis, (barAreaHeight + yOffset + this.barAxisSpace), (xOffset + this.barAxisSpace + barWidth/2) );
        this.$utils.chart.drawYAxis(svg, yAxis, xOffset + maxWidthAxis, yOffset + this.barAxisSpace);
        g.exit().remove();
    }
}
</script>
