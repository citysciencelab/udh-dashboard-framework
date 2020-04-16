<template>
  <div class="chart-wrapper"
       :style="style">
    <svg :id="selector"
         class="chart" />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import * as d3 from 'd3';
import _d3tip from 'd3-tip';
// eslint-disable-next-line no-unused-vars
import { Tooltip } from 'd3/types/d3';
import AbstractChart from './AbstractChart.vue';

const d3tip = _d3tip as () => Tooltip;

@Component({})
export default class PieChart extends AbstractChart {

    mounted() {
        this.svg = <SVG>d3.select('#' + this.selector);
        window.addEventListener('resize', this.createChart);
    }

    createChart() {
        // Create pie
        let radius = Math.min(this.svgHeight, this.svgWidth) / 2;

        let pie = d3.pie<Datum>().value(d => d[this.metric]);

        let path = d3.arc<Datum>()
            .outerRadius(radius - 10)
            .innerRadius(25);

        let arc = this.svg.selectAll<SVGPathElement, any>('.arc')
            .data(pie(this.ds));

        // Create tooltip
        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d: string[]) => d[0]);
        this.svg.call(tip);

        let color = d3.scaleSequential(d3.interpolateRdBu);

        arc.enter()
            .append('g')
            .append('path')
            .merge(arc)
            .attr('class', 'arc')
            .attr('d', path)
            .attr('fill', (d, i) => color(i * 0.1))
            .on('mouseover', d => tip.show([`${d.data[this.descriptor]}: ${d.data[this.metric]}`], d3.event.target))
            .on('mouseout', tip.hide)
            .attr('transform', `translate(${this.svgWidth / 2}, ${this.svgHeight / 2})`);

        arc.exit().remove();
    }
}
</script>
