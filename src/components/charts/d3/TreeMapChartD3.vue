import {Tooltip} from "d3/types/d3";
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
import AbstractChartD3 from './AbstractChartD3.vue';

// eslint-disable-next-line no-unused-vars
import { Tooltip } from 'd3/types/d3';
import _d3tip from "d3-tip";
const d3tip = _d3tip as () => Tooltip;

@Component({})
export default class TreeMapChartD3 extends AbstractChartD3 {

    mounted() {
        this.svg = <SVG>d3.select('#' + this.selector);
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

        // TODO: das hier beim setten schon ändern!
        let dsClone = [...this.ds.datasets[0].tree];
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
            .size([this.svgWidth, this.svgHeight])
            .padding(4)
            .round(true)(root);

        // Create tooltip
        const tip = d3tip()
                .attr('class', 'd3-tip')
                .html((d: string[]) => d[0]);
        svg.call(tip);

        svg.selectAll('rect')
            .data(root.leaves())
            .enter()
            .append('rect')
            .attr('x', d => d.x0)
            .attr('y', d => d.y0)
            .attr('label', d => d.id || '')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .style('stroke', d => d.data.color ? d.data.color : 'slateblue')
            .style('fill', d => d.data.color ? d.data.color : 'slateblue')
            .attr('transform', 'translate(' + xOffset + ',' + yOffset + ')');

        svg.selectAll('rect').each(function () {
            let content,
                foreignObject,
                element,
                div;

            element = d3.select(this);
            content =  element.attr('label');

            let rectHeight = element["_groups"][0][0]["height"]["baseVal"]["valueInSpecifiedUnits"];
            // add foreign object and set dimensions, position, etc
            foreignObject = svg.append('foreignObject');
            foreignObject.attr('class', 'treeMapLabel')
                .attr('width', element.attr('width'))
                .attr('height', element.attr('height'))
                .attr('x', element.attr('x'))
                .attr('y', element.attr('y'))
                    .on('mouseover', d => tip.show(
                            [`${d}: ${d3.event.target}`], d3.event.target)
                    )
                    .on('mouseout', tip.hide);

            // insert an HTML div
            div = foreignObject.append('xhtml:div');

            // set div to same dimensions as foreign object
            div.style('height', element.attr('height'))
                .style('width', element.attr('width'))
                .style('top', (rectHeight/2)-10 + 'px')
                // insert text content
                .html(content);

            const labelHeight = div["_groups"][0][0].clientHeight;
            if (labelHeight > rectHeight * 0.8) {
              div.html("...");
            }
            div.style('top', (rectHeight / 2) - (labelHeight / 2) + 'px');

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
        text-align: center;
        word-wrap: break-word;
        color: white;

      div {
        position: absolute;
        width: 100%;
        text-align: center;
        padding: 0 10px;
      }
    }
</style>
