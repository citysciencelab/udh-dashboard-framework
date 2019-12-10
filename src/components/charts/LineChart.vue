<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script>
    import $ from 'jquery';
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "line-chart",
        extends: AbstractChart,
        props: {
            options: Object,
            title: String,
            metric: String,
            selector: String,
            origins: {},
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
                let origins = this.origins;
                let title = this.title;
                let svg = d3.select('#' + this.selector);

                let vOffset = this.$utils.chart.getOffset(title) || 0;
                let hOffset = this.horizontalOffset || 0;

                let maxVal = Math.max.apply(Math, ds.map(function (o) {
                    let values = [];
                    for (let origin of origins) {
                        values.push(o[origin]);
                    }
                    return Math.max.apply(Math, values);
                }));

                let minVal = Math.min.apply(Math, ds.map(function (o) {
                    let values = [];
                    for (let origin of origins) {
                        values.push(o[origin]);
                    }
                    return Math.min.apply(Math, values);
                }));

                let y = d3.scaleLinear()
                    .domain([minVal, maxVal])
                    .range([this.$data.height, 0]);

                let yAxis = d3.axisLeft()
                    .scale(y);

                let x = this.$utils.chart.initTimeScale(d3, ds, options.dim2, this.$data.width);
                // FIXME: breaks when d.date is undefined
                let xAxis = d3.axisBottom(x)
                    .tickFormat(d3.timeFormat("%y-%b")).tickValues(ds.map(d => d.date));

                svg.selectAll('path').remove();
                svg.selectAll('g').remove();

                if (title) {
                    this.$utils.chart.addTitle(title, svg, this.$data.width);
                }

                let color = d3.scaleSequential(d3.interpolateRdBu);

                let index = 0;
                for (let origin of origins) {
                    let lineFunction = d3.line()
                        .x(function (d) {
                            return x(d[options.dim2]) + hOffset || 0;
                        })
                        .y(function (d) {
                            return y(d[origin]) || 0;
                        });

                    svg.append('path')
                        .datum(ds)
                        .attr('fill', 'none')
                        .attr('stroke', color(index))
                        .attr('stroke-width', 3)
                        .attr('d', lineFunction)
                        .attr('transform', 'translate(0,' + vOffset + ')')
                        .on('mouseover', d => {
                            let data = d;
                            let mouse = d3.mouse(d3.event.currentTarget)[0];
                            const bisect = d3.bisector(d => d.date).left;
                            const date = x.invert(mouse);
                            const index = bisect(data, date, 1);
                            const a = data[index - 1];
                            const b = data[index];
                            let info = {};
                            if (b) {
                                info = date - a.date > b.date - date ? b : a;
                            } else {
                                info = a;
                            }
                            //TODO: Tooltip position - also trigger on close areas
                            this.$utils.chart.addTooltip(info, svg,
                                x(info['date']), y(info['val2']), origin)
                        })
                        .on('mouseout', () => {
                            this.$utils.chart.removeTooltip(svg);
                        });
                    index++;
                }

                this.$utils.chart.drawAxis(this.$data.height, svg, xAxis, yAxis, vOffset, hOffset, null);
                svg.exit().remove();
            }
        }
    }
</script>

<style scoped>

</style>