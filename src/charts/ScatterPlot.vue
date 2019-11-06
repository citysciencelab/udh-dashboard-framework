<template>
    <svg class="chart" v-bind:id="selector" width="500" height="300"></svg>
</template>

<script>
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

        mounted: function () {
            const svg = $('#' + this.selector);
            const dimensions = this.$helpers.chart.getDimensions(svg, this.title);
            this.$data.width = dimensions[0];
            this.$data.height = dimensions[1] < 1 ? 300 : dimensions[1];
        },


        /**
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
                const chartElementOffset = 60;

                let metric = this.metric;
                let metric2 = this.metric2;
                let title = this.title;
                let svg = d3.select('#' + this.selector);
                let offset = this.$helpers.chart.getOffset(title);
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

                if (title) this.$helpers.chart.addTitle(title, svg, this.$data.width);

                g.enter()
                    .append('circle')
                    .attr('r', '4')
                    .attr('class', 'point')
                    .merge(g)
                    .attr('cx', (d, i) => {
                        return (xScale(d[metric2])) + chartElementOffset
                    })
                    .attr('cy', d => {
                        return yScale(d[metric]);
                    })
                    .attr('transform', 'translate(0,' + offset + ')');

                this.$helpers.chart.drawAxis(this.$data.height, svg, xAxis, yAxis, offset, chartElementOffset);

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