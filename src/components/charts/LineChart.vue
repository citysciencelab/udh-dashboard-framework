<template>
  <div
    class="chart-wrapper"
    :style="style"
  >
    <svg
      :id="selector"
      class="chart"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';
import AbstractChart from './AbstractChart.vue';

@Component({})
export default class LineChart extends AbstractChart {
    @Prop() origins!: string[];
    @Prop() metric2!: string;
    horizontalOffset = 60;

    mounted() {
        window.addEventListener('resize', this.createChart);
    }

    createChart() {
        let svg = <SVG>d3.select('#' + this.selector);

        let vOffset = this.$utils.chart.getYOffset(this.title) || 0;
        let hOffset = this.horizontalOffset || 0;

        let maxVal = Math.max(...this.ds.map(o => Math.max(...this.origins.map(origin => o[origin]))));
        let minVal = Math.min(...this.ds.map(o => Math.min(...this.origins.map(origin => o[origin]))));

        let y = d3.scaleLinear()
            .domain([minVal, maxVal])
            .range([this.height, 0]);
        // let yAxis = d3.axisLeft(y);
        let x = this.$utils.chart.timeScale(this.ds, this.options.dim2, this.width);
        // let xAxis = d3.axisBottom<Date>(x)
        //     .tickFormat(d3.timeFormat('%y-%b')).tickValues(this.ds.map(d => d.date));

        svg.selectAll('path').remove();
        svg.selectAll('g').remove();

        if (this.title) {
            this.$utils.chart.addTitle(this.title, svg, this.width);
        }

        let color = d3.scaleSequential(d3.interpolateRdBu);

        let index = 0;
        for (let origin of this.origins) {
            let lineFunction = d3.line<Datum>()
                .x(d => x(d[this.options.dim2]) + hOffset || 0)
                .y(d => y(d[origin]) || 0);

            svg.append('path')
                .datum(this.ds)
                .attr('fill', 'none')
                .attr('stroke', color(index))
                .attr('stroke-width', 3)
                .attr('d', lineFunction)
                .attr('transform', 'translate(0,' + vOffset + ')')
                .on('mouseover', ds => {
                    let mouse = d3.mouse(d3.event.currentTarget)[0];
                    const bisect = d3.bisector((d: Datum) => d.date).left;
                    const date = x.invert(mouse);
                    const index = bisect(ds, date, 1);
                    const a = ds[index - 1];
                    const b = ds[index];
                    let info: Datum;
                    if (b) {
                        info = date.getDate() - a.date > b.date - date.getDate() ? b : a;
                    } else {
                        info = a;
                    }
                    //TODO: Tooltip position - also trigger on close areas
                    this.$utils.chart.addTooltip(info, svg, x(info.date), y(info.val2), origin);
                })
                .on('mouseout', () => this.$utils.chart.removeTooltip(svg));
            index++;
        }

        // this.$utils.chart.drawAxis(this.height, svg, xAxis, yAxis, vOffset, hOffset, 0);
        svg.exit().remove();
    }
}
</script>
