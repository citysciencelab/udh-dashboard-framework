<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script>
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
                let title = this.title;
                let svg = d3.select('#' + this.selector);

                let vOffset = this.$utils.chart.getOffset(title);
                let hOffset = (this.$data.width - (this.$data.width * (ds.length-1) / ds.length)) / 2;

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
                    .attr('width', (d, i) => {
                        return (this.$data.width / ds.length) - 1
                    })
                    .attr('height', d => {
                        return this.$data.height - yScale(d[metric])
                    })
                    .attr('x', (d, i) => {
                        return (i * (this.$data.width / ds.length)) + this.horizontalOffset;
                    })
                    .attr('y', d => {
                        return yScale(d[metric]);
                    })
                    .on('mouseover',
                        function(d) {
                            tip.show(d['name'] + ": " + d[metric], this);
                        }
                    )
                    .on('mouseout', d => {
                        tip.hide();
                    })
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