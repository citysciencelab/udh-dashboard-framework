<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script>
    import $ from 'jquery';
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "h-bar-chart",
        extends: AbstractChart,
        props: {
            descriptor: String
        },
        mounted() {
            this.redraw();
            window.addEventListener("resize", this.redraw);
        },
        methods: {
            redraw: function () {
                const svg = $('#' + this.selector);
                this.redrawOnDimensionsChange(svg);
            },
            createChart(d3, ds, options) {
                let metric = this.metric;
                let descriptor = this.descriptor;
                let title = this.title;
                let svg = d3.select('#' + this.selector);
                let vOffset = this.$utils.chart.getOffset(title);
                let g = svg.selectAll('rect')
                    .data(ds);

                let maxVal = Math.max.apply(Math, ds.map((o) => o[metric]));
                let xScale = d3.scaleLinear()
                    .domain([maxVal, 0])
                    .range([0, this.$data.width]);
                let xAxis = d3.axisBottom()
                    .scale(xScale);
                let yScale = this.$utils.chart.initOrdinalScale(d3, ds, options.dim, this.$data.height);
                let yAxis = d3.axisLeft()
                    .scale(yScale);

                const tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(d => d);
                svg.call(tip);
                svg.selectAll('g').remove();

                if (title) {
                    this.$utils.chart.addTitle(title, svg, this.$data.width);
                }

                g.enter()
                    .append('rect')
                    .merge(g)
                    .attr('class', 'bar')
                    .attr('height', () => this.$data.height / ds.length - 1)
                    .attr('width', d => this.$data.width - xScale(d[metric]))
                    .attr('y', (d, i) => i * this.$data.height / ds.length)
                    .attr('x', this.horizontalOffset)
                    .on('mouseover', function(d) {
                        tip.show(d[descriptor] + ": " + d[metric], this);
                    })
                    .on('mouseout', tip.hide)
                    .attr('transform', 'translate(0,' + vOffset + ')');

                // Half an element size plus offset
                const yAxisOffset = ((this.$data.height / ds.length)/2) + vOffset;
                this.$utils.chart.drawAxis(this.$data.height, svg, xAxis, yAxis, vOffset, this.horizontalOffset, yAxisOffset);
                g.exit().remove();
            }
        }
    }
</script>

<style scoped>
</style>
