<template>
    <svg class="chart" v-bind:id="selector" width="500" height="300"></svg>
</template>

<script>
    import $ from 'jquery';
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "pie-chart",
        extends: AbstractChart,
        props: {
            options: Object,
            title: String,
            metric: String,
            selector: String
        },

        mounted: function () {
            const svg = $('#' + this.selector);
            const dimensions = this.$utils.chart.getDimensions(svg, this.title);
            this.$data.width = dimensions[0];
            this.$data.height = dimensions[1] < 1 ? 300 : dimensions[1];
        },

        /**
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
            createChart(d3, ds) {
                let metric = this.metric;
                let title = this.title;
                let svg = d3.select('#' + this.selector);
                let radius = this.$data.height > this.$data.width ? (this.$data.width - this.$data.width * 0.1) / 2 : (this.$data.height - this.$data.height * 0.1) / 2;
                let offset = this.$utils.chart.getOffset(title);

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

                const tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function(d) { return d; });
                svg.call(tip);

                let color = d3.scaleSequential(d3.interpolateRdBu);
                if (title) this.$utils.chart.addTitle(title, svg, this.$data.width);

                arc.enter()
                    .append('g')
                    .attr('transform', 'translate(' + this.$data.width / 2 + ',' + this.$data.height / 2 + ')')
                    .append('path')
                    .merge(arc)
                    .attr('class', 'arc')
                    .attr('d', path)
                    .attr('fill', function(d, i) {
                        return color(i * 0.1);
                    })
                    .on('mouseover',
                        function(d) {
                            tip.show(d.data['name'] + ": " + d.data[metric], this);
                        }
                    )
                    .on('mouseout', () => {
                        tip.hide();
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