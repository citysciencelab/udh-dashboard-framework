<template>
    <svg class="chart" v-bind:id="selector" width="500" height="300"></svg>
</template>

<script>
    export default {
        name: "line-chart",
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
            ds: function (newVal, oldVal) {
                this.createChart(this.$d3, this.ds, this.options);
            }
        },

        /**
         * $helpers.chart.lineChart
         * bind data to a line graph.
         * @param {string} d3 - reference to d3 object.
         * @param {string} ds - dataset for the graph.
         * @param {Object} options - options for bar graph.
         * @param {string} options.selector - selector name to place the graph.
         * @param {string} options.metric - value you are measuring.
         * @param {string} options.dim2 - value you will be categorizing the data by.
         * @param {string} options.width - width of the chart.
         * @param {string} options.height - height of the chart.
         * @param {string} options.title - title of the chart.
         */

        methods: {
            callout(x, d) {
                // console.log("dd")
            },
            createChart(d3, ds, options) {
                let metric = this.metric;
                let title = this.title;
                let svg = d3.select('#' + this.selector);
                let offset = this.$helpers.chart.getOffset(title);
                let maxVal = Math.max.apply(Math, ds.map(function (o) {
                    return o[metric];
                }));

                let minVal = Math.min.apply(Math, ds.map(function (o) {
                    return o[metric];
                }));

                let yScale = d3.scaleLinear()
                    .domain([minVal, maxVal])
                    .range([options.height, 0]);

                let yAxis = d3.axisLeft()
                    .scale(yScale);

                // let xScale = this.$helpers.chart.initOrdinalScale(d3, ds, options.dim2, options.width);
                let xScale = this.$helpers.chart.initTimeScale(d3, ds, options.dim2, options.width);
                let xAxis = d3.axisBottom()
                    .scale(xScale);

                let lineFunction = d3.line()
                    .x(function (d, i) {
                        return xScale(d[options.dim2]) + 60;
                    })
                    .y(function (d) {
                        return yScale(d[metric]);
                    });

                svg.selectAll('path').remove();
                svg.selectAll('g').remove();

                if (options.title) this.$helpers.chart.addTitle(title, svg, options.width);

                svg.append('path')
                    .datum(ds)
                    .attr('fill', 'none')
                    .attr('stroke', '#ffab00')
                    .attr('stroke-width', 3)
                    .attr('d', lineFunction)
                    .attr('transform', 'translate(0,' + offset + ')')
                    .on('mouseover', d => {
                        let data = d;
                        let mouse = d3.mouse(d3.event.currentTarget)[0];
                        const bisect = d3.bisector(d => d.date).left;
                        const date = xScale.invert(mouse);
                        const index = bisect(data, date, 1);
                        const a = data[index - 1];
                        const b = data[index];
                        const info = date - a.date > b.date - date ? b : a;
                        this.$helpers.chart.addTooltip(info, svg,
                             d3.event['offsetX'], d3.event['offsetY'], metric)
                    })
                    .on('mouseout', d => {
                        this.$helpers.chart.removeTooltip(svg);
                    });

                this.$helpers.chart.drawAxis(options.height, svg, xAxis, yAxis, offset);
                // this.drawAxis(options.height, svg, xAxis, yAxis, offset);
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