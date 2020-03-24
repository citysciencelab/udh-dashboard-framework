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
import AbstractChart from './AbstractChart.vue';

@Component({})
export default class TreeMapChart extends AbstractChart {

    mounted() {
        window.addEventListener('resize', this.createChart);
    }

    createChart() {
        let svg = <SVG>d3.select('#' + this.selector);
        svg.html(null);

        let yOffset = this.$utils.chart.getYOffset(this.title) || 0;
        let xOffset = this.$utils.chart.getXOffset(this.svgElement, this.holderElement);

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
            .parentId(d => d[parentName])(dsClone);
        root.sum(d => d[this.metric]);

        d3.treemap<Datum>()
            .size([this.width, this.height])
            .padding(4)
            .round(true)(root);

        svg.selectAll('rect')
            .data(root.leaves())
            .enter()
            .append('rect')
            .attr('x', d => d.x0)
            .attr('y', d => d.y0)
            .attr('label', d => d.id || '')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .style('stroke', 'black')
            .style('fill', 'slateblue')
            .attr('transform', 'translate(' + xOffset + ',' + yOffset + ')');

        const labelPaddingY = 17;

        svg.selectAll('rect').each(function () {
            let content,
                foreignObject,
                element,
                div;

            element = d3.select(this);

            // extract our desired content from the single text element
            content =  element.attr('label');
            // add foreign object and set dimensions, position, etc
            foreignObject = svg.append('foreignObject');
            foreignObject.attr('class', 'treeMapLabel')
                .attr('width', element.attr('width'))
                .attr('height', element.attr('height'))
                .attr('transform', 'translate(' + xOffset + ',' + labelPaddingY + ')')
                .attr('x', element.attr('x'))
                .attr('y', parseInt(element.attr('y')) + labelPaddingY);

            // insert an HTML div
            div = foreignObject.append('xhtml:div');

            // set div to same dimensions as foreign object
            div.style('height', element.attr('height'))
                .style('width', element.attr('width'))
                // insert text content
                .html(content);
            return div;
        });

        if (this.title) {
            this.$utils.chart.addTitle(this.title, svg, this.$data.width);
        }
    }
}
</script>

<style lang='scss'>
    .treeMapLabel {
        font-size: 11px;
        text-overflow: ellipsis;
        text-align: left;
        word-wrap: break-word;
        color: white;
        div {
            padding-left: 5px;
        }
    }
</style>
