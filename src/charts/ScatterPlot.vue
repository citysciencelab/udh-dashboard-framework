<template>
    <svg class="chart" v-bind:id="selector" width="500" height="300"></svg>
</template>

<script>
    export default {
        name: "scatter-plot",
        props: {
            ds: Array,
            options: Object,
            title: String,
            metric: String,
            metric2: String,
            selector: String
        },

        mounted: function () {
            this.createChart(this.$d3, this.ds, this.options);
        },

        watch: {
            ds: function(newVal, oldVal) {
                this.createChart(this.$d3, this.ds, this.options);
            }
        },

        /**
         * $helpers.chart.barChart
         * bind data to a bar graph.
         * @param {string} d3 - reference to d3 object.
         * @param {string} ds - dataset for the graph.
         * @param {Object} options - options for bar graph.
         * @param {string} options.selector - selector name to place the graph.
         * @param {string} options.metric - value you are measuring.
         * @param {string} options.dim - value you will be categorizing the data by.
         * @param {string} options.width - width of the chart.
         * @param {string} options.height - height of the chart.
         * @param {string} options.title - title of the chart.
         */

        methods: {
            createChart(d3, ds, options) {
                var metric = this.metric;
                var metric2 = this.metric2;
                var title = this.title;
                var svg = d3.select('#' + this.selector);
                var offset = this.$helpers.chart.getOffset(title);
                var maxVal = Math.max.apply(Math, ds.map(function(o) {
                    return o[metric];
                }));

                var minVal = Math.min.apply(Math, ds.map(function(o) {
                    return o[metric];
                }));

                var maxVal2 = Math.max.apply(Math, ds.map(function(o) {
                    return o[metric2];
                }));

                var minVal2 = Math.min.apply(Math, ds.map(function(o) {
                    return o[metric2];
                }));

                var g = svg.selectAll('circle')
                    .data(ds);

                var yScale = d3.scaleLinear()
                    .domain([minVal, maxVal])
                    .range([options.height, 0]);

                var yAxis = d3.axisLeft()
                    .scale(yScale);

                var xScale = d3.scaleLinear()
                    .domain([minVal2, maxVal2])
                    .range([0, options.width]);

                var xAxis = d3.axisBottom()
                    .scale(xScale);

                svg.selectAll('g').remove();

                if (title) this.$helpers.chart.addTitle(title, svg, options.width);

                g.enter()
                    .append('circle')
                    .attr('r', '4')
                    .attr('class', 'point')
                    .merge(g)
                    .attr('cx', (d, i) => {
                        return (xScale(d[metric2])) + 60
                    })
                    .attr('cy', d => {
                        return yScale(d[metric]);
                    })
                    .attr('transform', 'translate(0,' + offset + ')');

                this.$helpers.chart.drawAxis(options.height, svg, xAxis, yAxis, offset);

                svg.exit().remove();
            }
        }
    }
</script>

<style scoped>
    .chart {
        padding: 20px;
    }
</style>