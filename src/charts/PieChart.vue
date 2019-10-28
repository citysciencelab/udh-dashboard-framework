<template>
    <svg class="chart" v-bind:id="selector" width="500" height="300"></svg>
</template>

<script>
    export default {
        name: "pie-chart",
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
         * $helpers.chart.pieChart
         * bind data to a pie chart.
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
                let metric = this.metric;
                let title = this.title;
                let svg = d3.select('#' + this.selector);
                let radius = options.height > options.width ? (options.width - options.width * 0.1) / 2 : (options.height - options.height * 0.1) / 2;
                let offset = this.$helpers.chart.getOffset(title);

                let pie = d3.pie()
                    .sort(null)
                    .value(function(ds) {
                        return ds[metric];
                    });

                let path = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(25);

                let arc = svg.selectAll('.arc')
                    .data(pie(ds));

                // let color = d3.scaleOrdinal()
                //     .range(['#4D4D4D', '#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0',
                //         '#B2912F', '#B276B2', '#DECF3F', '#F15854'
                //     ]);

                let color = d3.scaleSequential(d3.interpolateRdBu);

                if (title) this.$helpers.chart.addTitle(title, svg, options.width);

                arc.enter()
                    .append('g')
                    .attr('transform', 'translate(' + options.width / 2 + ',' + options.height / 2 + ')')
                    .append('path')
                    .merge(arc)
                    .attr('class', 'arc')
                    .attr('d', path)
                    .attr('fill', function(d, i) {
                        return color(i*0.1);
                    })
                    .on('mouseover', d => {
                        this.$helpers.chart.addTooltip(d.data, svg,
                            d3.event['offsetX'], d3.event['offsetY'], metric)
                    })
                    .on('mouseout', d => {
                        this.$helpers.chart.removeTooltip(svg);
                    })
                    .attr('transform', 'translate(0,' + offset + ')');

                arc.exit().remove();
            }
        }
    }
</script>

<style scoped>
    .chart {
        padding: 20px;
    }
</style>