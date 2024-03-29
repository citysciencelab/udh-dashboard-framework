import {Tooltip} from "d3/types/d3";
<template>
  <div class="chart-wrapper"
       :style="style">
    <svg :id="selector"
         class="chart" />
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import * as d3 from 'd3';
  import AbstractChartD3 from './AbstractChartD3.vue';

  // eslint-disable-next-line no-unused-vars
  import {Tooltip} from 'd3/types/d3';
  import _d3tip from 'd3-tip';
  import Color from 'color';

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
      let dsClone = [...(this.ds as Datum)['datasets'][0]['tree']];
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

      // Delete all old tooltips if necessary
      d3.select(".d3-tip").remove();

      // Create tooltip
      const tip = d3tip()
       .attr('class', 'd3-tip')
       .offset([-8, 0])
       .html(this.showToolTip);
      svg.call(tip);

      var cell = svg.selectAll('g')
       .data(root.leaves())
       .enter().append('g')
       .attr('transform', 'translate(' + xOffset + ',' + yOffset + ')');

      // Create the treemap elements
      cell.append('rect')
       .attr('id', function (d) {
         return d.data.id;
       })
       .attr('width', function (d) {
         return d.x1 - d.x0;
       })
       .attr('height', function (d) {
         return d.y1 - d.y0;
       })
       .attr('x', d => d.x0)
       .attr('y', d => d.y0)
       .attr('fill', function (d) {
         if (d['value'] === 0) {
           return '#FFFFFF'
         } else {
           return d.data.color ? d.data.color : 'slateblue';
         }
       })
       .on('mouseover', tip.show)
       .on('mouseenter', function (d) {
         if (d['value'] === 0) {
           d3.select(this).attr('fill', '#FFFFFF');
         } else {
           d3.select(this).attr('fill', Color(d.data.color ? d.data.color : 'slateblue').alpha(0.9).hex());
         }
       })
       .on('mouseout', function (d) {
         if (d['value'] === 0) {
           d3.select(this).attr('fill', '#FFFFFF');
         } else {
           d3.select(this).attr('fill', d.data.color ? d.data.color : 'slateblue');
         }
         tip.hide();
       })
       .on('click', this.clickChartElement);

      const textMarginH = 12;
      const textMarginW = 5;

      // Create the labels
      cell.append('text')
       .attr('width', function (d) {
         return d.x1 - d.x0;
       })
       .attr('x', d => d.x0 + textMarginW)
       .attr('y', d => d.y0 + textMarginH)
       .attr('transform', 'translate(' + xOffset + ',' + yOffset + ')')
       .attr('class', 'treemap-label')
       .attr('font-size', '12px')
       .attr('fill', 'white')
       .on('click', this.clickChartElement)
       .text(function (d): string {
         return d['id'] + '';
       });

      svg.selectAll('text')
       .style('display',
        function (): string {
          if (this) {
            const element = (this as Datum);
            const rectBounds = element.parentNode.firstElementChild.getBBox();
            const textWidth = element.getComputedTextLength();
            return rectBounds['width'] > (textWidth + (textMarginW * 2)) ? 'inline' : 'none';
          }
          return 'inline';
        });

      if (this.title) {
        this.$utils.chart.addTitle(this.title, svg, this.$data.width);
      }
    }

    showToolTip(d: Datum) {
      return (this.toolTipKey ? d['data'][this.toolTipKey] : d['id']) + ': ' + d['value'];
    }

    clickChartElement(d: Datum, i: number) {
      this.$emit('click', d);
    }
  }
</script>

<style lang='scss'>
    .treemap-label {
        font-size: 12px;
        color: white;
        cursor: context-menu;
    }
</style>
