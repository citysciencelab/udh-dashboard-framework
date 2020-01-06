<template>
    <svg class="chart" v-bind:id="selector" width="500" height="300"></svg>
</template>

<script>
    import $ from 'jquery';
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "scatter-plot",
        extends: AbstractChart,
        props: {
            options: Object,
            title: String,
            metric: String,
            metric2: String,
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
            createChart(d3, ds) {
                let metric = this.metric;
                let metric2 = this.metric2;
                let title = this.title;
                let svg = d3.select('#' + this.selector);
                let offset = this.$utils.chart.getOffset(title);
                let maxVal = Math.max.apply(Math, ds.map(function(o) {
                    return o[metric];
                }));

                let minVal = Math.min.apply(Math, ds.map(function(o) {
                    return o[metric];
                }));

                let maxVal2 = Math.max.apply(Math, ds.map(function(o) {
                    return o[metric2];
                }));

                let minVal2 = Math.min.apply(Math, ds.map(function(o) {
                    return o[metric2];
                }));

                let g = svg.selectAll('circle')
                    .data(ds);

                let yScale = d3.scaleLinear()
                    .domain([minVal, maxVal])
                    .range([this.$data.height, 0]);

                let yAxis = d3.axisLeft()
                    .scale(yScale);

                let xScale = d3.scaleLinear()
                    .domain([minVal2, maxVal2])
                    .range([0, this.$data.width]);

                let xAxis = d3.axisBottom()
                    .scale(xScale);

                svg.selectAll('g').remove();

                if (title) this.$utils.chart.addTitle(title, svg, this.$data.width);

                g.enter()
                    .append('circle')
                    .attr('r', '4')
                    .attr('class', 'point')
                    .merge(g)
                    .attr('cx', (d) => {
                        // FIXME: breaks when metric2 is undefined
                        return (xScale(d[metric2])) + this.horizontalOffset
                    })
                    .attr('cy', d => {
                        return yScale(d[metric]);
                    })
                    .attr('transform', 'translate(0,' + offset + ')');

                this.$utils.chart.drawAxis(this.$data.height, svg, xAxis, yAxis, offset, this.horizontalOffset, null);
                svg.exit().remove();
            }
        }
    }
</script>

<style scoped>
</style>