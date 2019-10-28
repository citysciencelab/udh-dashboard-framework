<template>
    <svg class="chart" v-bind:id="selector" width="500" height="300"></svg>
</template>

<script>
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "bar-chart",
        extends: AbstractChart,
        props: {
            ds: Array,
            options: Object,
            title: String,
            metric: String,
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
                var title = this.title;
                var svg = d3.select('#' + this.selector);
                var offset = this.$helpers.chart.getOffset(title);
                var g = svg.selectAll('rect')
                    .data(ds);

                var maxVal = Math.max.apply(Math, ds.map(function (o) {
                    return o[metric];
                }));

                var yScale = d3.scaleLinear()
                    .domain([0, maxVal])
                    .range([options.height, 0]);

                var yAxis = d3.axisLeft()
                    .scale(yScale);

                var xScale = this.$helpers.chart.initOrdinalScale(d3, ds, options.dim, options.width);
                var xAxis = d3.axisBottom()
                    .scale(xScale)

                svg.selectAll('g').remove();
                if (title) this.$helpers.chart.addTitle(title, svg, options.width);

                g.enter()
                    .append('rect')
                    .merge(g)
                    .attr('class', 'bar')
                    .attr('width', (d, i) => {
                        return (options.width / ds.length) - 1
                    })
                    .attr('height', d => {
                        return options.height - yScale(d[metric])
                    })
                    .attr('x', (d, i) => {
                        return (i * (options.width / ds.length)) + 60
                    })
                    .attr('y', d => {
                        return yScale(d[metric]);
                    })
                    .on('mouseover', d => {
                        this.$helpers.chart.addTooltip(d, svg,
                            d3.mouse(d3.event.currentTarget)[0],
                            d3.mouse(d3.event.currentTarget)[1], metric)
                    })
                    .on('mouseout', d => {
                        this.$helpers.chart.removeTooltip(svg);
                    })
                    .attr('transform', 'translate(0,' + offset + ')');

                this.$helpers.chart.drawAxis(options.height, svg, xAxis, yAxis, offset);
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