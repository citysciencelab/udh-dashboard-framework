<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script>
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "tree-map-chart",
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
            createChart(d3, ds, options) {
                let metric = this.metric;
                let descriptor = this.descriptor;
                let title = this.title;
                let svg = d3.select('#' + this.selector);
                svg.html(null);

                let yOffset = this.$utils.chart.getYOffset(title) || 0;
                let xOffset = this.$utils.chart.getXOffset(this.getSVGElement(), this.holderElement);

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

                console.log(this.$data.width)

                d3.treemap()
                    .size([this.$data.width, this.$data.height])
                    .padding(4)
                    .round(true)
                    (root);

                svg
                    .selectAll('rect')
                    .data(root.leaves())
                    .enter()
                    .append('rect')
                    .attr('x', function (d) {
                        return d.x0;
                    })
                    .attr('y', function (d) {
                        return d.y0;
                    })
                    .attr('label', function (d) {
                        return d.id;
                    })
                    .attr('width', function (d) {
                        return d.x1 - d.x0;
                    })
                    .attr('height', function (d) {
                        return d.y1 - d.y0;
                    })
                    .style('stroke', 'black')
                    .style('fill', 'slateblue')
                    .attr('transform', 'translate(' + xOffset + ',' + yOffset + ')');

                const labelPaddingY = 17;

                svg.selectAll('rect').each(function () {
                    let content,
                        foreignObject,
                        element,
                        div;

                    element = d3.select(this);

                    // extract our desired content from the single text element
                    content =  element.attr('label');
                    // add foreign object and set dimensions, position, etc
                    foreignObject = svg.append('foreignObject');
                    foreignObject
                        .attr('class', 'treeMapLabel')
                        .attr('width', element.attr('width'))
                        .attr('height', element.attr('height'))
                        .attr('transform', 'translate('+xOffset+','+labelPaddingY+')')
                        .attr('x', element.attr('x'))
                        .attr('y', parseInt(element.attr('y')) + labelPaddingY);

                    // insert an HTML div
                    div = foreignObject
                        .append('xhtml:div');

                    // set div to same dimensions as foreign object
                    div
                        .style('height', element.attr('height'))
                        .style('width', element.attr('width'))
                        // insert text content
                        .html(content);
                    return div;
                });

                if (title) {
                    //this.$utils.chart.addTitle(title, svg, this.$data.width);
                }
            }
        }
    }
</script>

<style lang='scss'>
    .treeMapLabel {
        font-size: 11px;
        text-overflow: ellipsis;
        text-align: left;
        word-wrap: break-word;
        color: white;
        div {
            padding-left: 5px;
        }
    }
</style>