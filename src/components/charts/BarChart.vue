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
            selector: String
        },

        mounted: function () {
            const svg = $('#' + this.selector);
            const dimensions = this.$utils.chart.getDimensions(svg, this.title);
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
                let metric = this.metric;
                let title = this.title;
                let svg = d3.select('#' + this.selector);

                let vOffset = this.$utils.chart.getOffset(title) || 0;
                let hOffset = (this.$data.width - this.$data.width * (ds.length-1) / ds.length) / 2 || 0;

                let g = svg.selectAll('rect')
                    .data(ds);

                let maxVal = Math.max.apply(Math, ds.map(function (o) {
                    return o[metric];
                }));

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
                    .html(function(d) { return d; });

                svg.call(tip);
                svg.selectAll('g').remove();
                if (title) this.$utils.chart.addTitle(title, svg, this.$data.width);

                g.enter()
                    .append('rect')
                    .merge(g)
                    .attr('class', 'bar')
                    .attr('width', () => {
                        return this.$data.width / ds.length - 1 || 0;
                    })
                    .attr('height', d => {
                        return this.$data.height - yScale(d[metric]) || 0;
                    })
                    .attr('x', (d, i) => {
                        return i * (this.$data.width / ds.length) + this.horizontalOffset || 0;
                    })
                    .attr('y', d => {
                        return yScale(d[metric]) || 0;
                    })
                    .on('mouseover',
                        function(d) {
                            tip.show(d['name'] + ": " + d[metric], this);
                        }
                    )
                    .on('mouseout', () => {
                        tip.hide();
                    })
                    .attr('transform', 'translate(0,' + vOffset + ')');

                this.$utils.chart.drawAxis(this.$data.height, svg, xAxis, yAxis, vOffset, hOffset + this.horizontalOffset);
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