<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script>
    import $ from 'jquery';
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "bar-chart",
        extends: AbstractChart,
        props: {
            options: Object,
            title: String,
            metric: String,
            descriptor: String,
            selector: String
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

                let vOffset = this.$utils.chart.getOffset(title) || 0;
                let hOffset = (this.$data.width - this.$data.width * (ds.length-1) / ds.length) / 2 || 0;

                let g = svg.selectAll('rect')
                    .data(ds);

                let maxVal = Math.max.apply(Math, ds.map((o) => o[metric]));

                let yScale = d3.scaleLinear()
                    .domain([0, maxVal])
                    .range([this.$data.height, 0]);

                let yAxis = d3.axisLeft()
                    .scale(yScale);

                let xScale = this.$utils.chart.initOrdinalScale(d3, ds, options.dim, this.$data.width);
                let xAxis = d3.axisBottom()
                    .scale(xScale);

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
                    .attr('width', () => this.$data.width / ds.length - 1 || 0)
                    .attr('height', d => this.$data.height - yScale(d[metric]) || 0)
                    .attr('x', (d, i) => i * this.$data.width / ds.length + this.horizontalOffset || 0)
                    .attr('y', d => yScale(d[metric]) || 0)
                    .on('mouseover', function(d) {
                        tip.show(d[descriptor] + ": " + d[metric], this);
                    })
                    .on('mouseout', tip.hide)
                    .attr('transform', 'translate(0,' + vOffset + ')');

                this.$utils.chart.drawAxis(this.$data.height, svg, xAxis, yAxis, vOffset, hOffset + this.horizontalOffset, null);
                g.exit().remove();
            }
        }
    }
</script>

<style scoped>
    .chart {
        padding: 20px;
    }

</style>

<style>
</style>