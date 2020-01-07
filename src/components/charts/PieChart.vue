<template>
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script>
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "pie-chart",
        extends: AbstractChart,
        props: {
            descriptor: String
        },
        mounted() {
            this.redraw();
            window.addEventListener("resize", this.redraw);
        },
        methods: {
            redraw: function () {
                this.redrawOnDimensionsChange(this.getSVGElement());
            },
            createChart(d3, ds) {
                let metric = this.metric;
                let descriptor = this.descriptor;
                let title = this.title;
                let svg = d3.select('#' + this.selector);
                svg.html(null);

                let radius = this.$data.height > this.$data.width ? this.$data.width / 2 : this.$data.height / 2;
                let offset = this.$utils.chart.getYOffset(title);
                let pie = d3.pie().value((ds) => ds[metric]);
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
                    .html(d => d);

                svg.call(tip);

                let color = d3.scaleSequential(d3.interpolateRdBu);

                if (title) {
                    this.$utils.chart.addTitle(title, svg, this.$data.width);
                }

                arc.enter()
                    .append('g')
                    .attr('transform', 'translate(' + this.$data.width / 2 + ',' + this.$data.height / 2 + ')')
                    .append('path')
                    .merge(arc)
                    .attr('class', 'arc')
                    .attr('d', path)
                    .attr('fill', (d, i) => color(i * 0.1))
                    .on('mouseover', function(d) {
                        tip.show(d.data[descriptor] + ": " + d.data[metric], this);
                    })
                    .on('mouseout', tip.hide)
                    .attr('transform', 'translate(0,' + offset + ')');

                arc.exit().remove();
            }
        }
    }
</script>

<style scoped>
</style>