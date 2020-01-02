<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script>
    import $ from 'jquery';
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "tree-map-chart",
        extends: AbstractChart,
        props: {
            options: Object,
            title: String,
            metric: String,
            descriptor: String,
            selector: String
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
                let metric = this.metric;
                let descriptor = this.descriptor;
                let title = this.title;
                let svg = d3.select('#' + this.selector);
                svg.html(null);

                let vOffset = this.$utils.chart.getOffset(title) || 0;
                let hOffset = (this.$data.width - this.$data.width * (ds.length - 1) / ds.length) / 2 || 0;

                // If no hierarchy exists - we need to artificially create one
                const parentName = 'parent';
                const parentValue = 'origin';
                let dsClone = [...ds];
                for (const element of dsClone) {
                    element[parentName] = parentValue
                }

                let originElement = {};
                originElement[descriptor] = parentValue;
                originElement[parentName] = null;
                originElement[metric] = null;
                dsClone.push(originElement);

                let root = d3.stratify()
                    .id(function (d) {
                        return d[descriptor];
                    })
                    .parentId(function (d) {
                        return d[parentName]
                    })
                    (dsClone);
                root.sum(function (d) {
                    return +d[metric]
                });


                d3.treemap()
                    .size([this.$data.width, this.$data.height])
                    .padding(4)
                    .round(true)
                    (root);

                svg
                    .selectAll("rect")
                    .data(root.leaves())
                    .enter()
                    .append("rect")
                    .attr('x', function (d) {
                        return d.x0;
                    })
                    .attr('y', function (d) {
                        return d.y0;
                    })
                    .attr('width', function (d) {
                        return d.x1 - d.x0;
                    })
                    .attr('height', function (d) {
                        return d.y1 - d.y0;
                    })
                    .style("stroke", "black")
                    .style("fill", "slateblue")
                    .attr('transform', 'translate(0,' + vOffset + ')');

                svg
                    .selectAll("text")
                    .data(root.leaves())
                    .enter()
                    .append("text")
                    .attr("x", function (d) {
                        return d.x0 + 5
                    })
                    .attr("y", function (d) {
                        return d.y0 + 20
                    })
                    .text(function (d) {
                        return d.data[descriptor]
                    })
                    .attr("font-size", "11px")
                    .attr("fill", "white")
                    .attr('transform', 'translate(0,' + vOffset + ')');

                if (title) {
                    //this.$utils.chart.addTitle(title, svg, this.$data.width);
                }
            }
        }
    }
</script>

<style scoped>
    .chart {
        padding: 20px;
    }

</style>