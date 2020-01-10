<template>
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
export default class PieChart extends AbstractChart {
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
        let svg = <SVG>d3.select('#' + this.selector);
        svg.html(null);

        let radius = this.height > this.width ? this.width / 2 : this.height / 2;
        let offset = this.$utils.chart.getYOffset(this.title);

        let pie = d3.pie<Datum>().value(d => d[this.metric]);

        let path = d3.arc<Datum>()
            .outerRadius(radius - 10)
            .innerRadius(25);

        let arc = (<d3.Selection<SVGPathElement, any, SVGSVGElement, any>>svg.selectAll('.arc'))
            .data(pie(this.ds));

        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d: string[]) => d[0]);

        svg.call(tip);

        let color = d3.scaleSequential(d3.interpolateRdBu);

        if (this.title) {
            this.$utils.chart.addTitle(this.title, svg, this.width);
        }

        arc.enter()
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')')
            .append('path')
            .merge(arc)
            .attr('class', 'arc')
            .attr('d', path)
            .attr('fill', (d, i) => color(i * 0.1))
            .on('mouseover', d => tip.show([d.data[this.descriptor] + ': ' + d.data[this.metric]], d3.event.target))
            .on('mouseout', tip.hide)
            .attr('transform', 'translate(0,' + offset + ')');

        arc.exit().remove();
    }
}
</script>
