<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';
import AbstractChart from './AbstractChart.vue';
import { HierarchyNode } from 'd3';

interface TreeDatum extends Datum {
    x0?: number;
    x1?: number;
    y0?: number;
    y1?: number;
}

@Component({})
export default class TreeMapChart extends AbstractChart {
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
        svg.html(null);

        let vOffset = this.$utils.chart.getOffset(this.title) || 0;
        let hOffset = (this.width - this.width * (this.ds.length - 1) / this.ds.length) / 2 || 0;

        // If no hierarchy exists - we need to artificially create one
        const parentName = 'parent';
        const parentValue = 'origin';
        let dsClone = [...this.ds];
        for (const element of dsClone) {
            element[parentName] = parentValue
        }

        let originElement: Datum = {};
        originElement[this.descriptor] = parentValue;
        originElement[parentName] = null;
        originElement[this.metric] = null;
        dsClone.push(originElement);

        let root = <d3.HierarchyRectangularNode<Datum>>d3.stratify<Datum>()
            .id(d => d[this.descriptor])
            .parentId(d => d[parentName])
            (dsClone);
        root.sum(d => d[this.metric]);

        d3.treemap<Datum>()
            .size([this.width, this.height])
            .padding(4)
            .round(true)
            (root);

        svg.selectAll('rect')
            .data(root.leaves())
            .enter()
            .append('rect')
            .attr('x', (d) => d.x0)
            .attr('y', d => d.y0)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .style('stroke', 'black')
            .style('fill', 'slateblue')
            .attr('transform', 'translate(0,' + vOffset + ')');

        svg.selectAll('text')
            .data(root.leaves())
            .enter()
            .append('text')
            .attr('x', d => d.x0 + 5)
            .attr('y', d => d.y0 + 20)
            .text(d => d.data[this.descriptor])
            .attr('font-size', '11px')
            .attr('fill', 'white')
            .attr('transform', 'translate(0,' + vOffset + ')');
    }
}
</script>

<style scoped>
    .chart {
        padding: 20px;
    }

</style>