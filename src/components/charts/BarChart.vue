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
export default class BarChart extends AbstractChart {
    @Prop() ds!: Dataset;
    @Prop() options!: { dim: string };
    @Prop() title!: string;
    @Prop() metric!: string;
    @Prop() descriptor!: string;
    @Prop() selector!: string;
    @Prop() holderElement!: string;

    mounted() {
        this.redraw();
        window.addEventListener('resize', this.redraw);
    }

    redraw() {
        this.redrawOnDimensionsChange(this.getSVGElement());
    }

    createChart() {
        const svg = <SVG>d3.select('#' + this.selector);
        svg.html(null);

        let yOffset = this.$utils.chart.getYOffset(this.title) || 0;
        let xOffset = this.$utils.chart.getXOffset(this.getSVGElement(), this.holderElement);
        let barAreaWidth = this.width - xOffset - this.barAxisSpace;

        let g = svg.selectAll<SVGRectElement, any>('rect')
            .data(this.ds);

        // Draw the X-Axis - but just for calculation
        let xScale = this.$utils.chart.initOrdinalScale(this.ds, this.options.dim, barAreaWidth);
        let xAxis = d3.axisBottom(xScale);
        let maxHeightAxis = this.$utils.chart.drawAxisMeasureExtent(svg, xAxis, 'xAxis');
        let barAreaHeight = this.height - yOffset - maxHeightAxis;
        // Remove the axis
        svg.selectAll('xAxis').remove();

        // Now drawing the yAxis
        let maxVal = Math.max.apply(Math, this.ds.map(o => o[this.metric]));
        let yScale = d3.scaleLinear()
            .domain([0, maxVal])
            .range([barAreaHeight, 0]);
        let yAxis = d3.axisLeft(yScale);

        // Calculate the axis size and take it into account
        let maxWidthAxis = this.$utils.chart.drawAxisMeasureExtent(svg, yAxis, 'yAxis');
        xOffset = maxWidthAxis + xOffset;

        // Now we can recalculate the actual chart area
        barAreaWidth = this.width - xOffset - this.barAxisSpace;

        svg.selectAll('.yAxis')
            .attr('transform', 'translate(' + xOffset + ',' + yOffset + ')');

        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d: string[]) => d[0]);
        svg.call(tip);

        if (this.title) {
            this.$utils.chart.addTitle(this.title, svg, this.width);
        }

        let barWidth = barAreaWidth / this.ds.length - 1;

        g.enter()
            .append('rect')
            .merge(g)
            .attr('class', 'bar')
            .attr('width', () => barWidth)
            .attr('height', d => barAreaHeight - yScale(d[this.metric]))
            .attr('x', (d, i) => i * barAreaWidth / this.ds.length + xOffset + this.barAxisSpace)
            .attr('y', d => yScale(d[this.metric]))
            .on('mouseover', d => tip.show([d[this.descriptor] + ': ' + d[this.metric]], d3.event.target))
            .on('mouseout', tip.hide)
            .attr('transform', 'translate(0,' + yOffset + ')');

        // Now that we have the real barAreaWidth, we can finally draw the xAxis
        xScale = this.$utils.chart.initOrdinalScale(this.ds, this.options.dim, barAreaWidth);
        xAxis = d3.axisBottom(xScale);

        this.$utils.chart.drawXAxis(svg, xAxis, xOffset + this.barAxisSpace + barWidth/2, barAreaHeight + yOffset + this.barAxisSpace);
        g.exit().remove();
    }
}
</script>

<style scoped>
</style>
