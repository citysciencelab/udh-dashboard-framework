<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script>
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "bar-chart",
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
                let barAreaWidth = this.$data.width - xOffset - this.barAxisSpace;

                let g = svg.selectAll('rect')
                    .data(ds);

                // Draw the X-Axis - but just for calculation
                let xScale = this.$utils.chart.initOrdinalScale(d3, ds, options.dim, barAreaWidth);
                let xAxis = d3.axisBottom()
                    .scale(xScale);
                let maxHeightAxis = this.$utils.chart.drawAxisMeasureExtend(svg, xAxis, 'xAxis');
                let barAreaHeight = this.$data.height - yOffset - maxHeightAxis;
                // Remove the axis
                svg.selectAll('xAxis').remove();

                // Now drawing the yAxis
                let maxVal = Math.max.apply(Math, ds.map((o) => o[metric]));
                let yScale = d3.scaleLinear()
                    .domain([0, maxVal])
                    .range([barAreaHeight, 0]);
                let yAxis = d3.axisLeft()
                    .scale(yScale);

                // Calculate the axis size and take it into account
                let maxWidthAxis = this.$utils.chart.drawAxisMeasureExtend(svg, yAxis, 'yAxis');
                xOffset = maxWidthAxis + xOffset;

                // Now we can recalculate the actual chart area
                barAreaWidth = this.$data.width - xOffset - this.barAxisSpace;

                svg.selectAll('.yAxis')
                    .attr('transform', 'translate('+ xOffset +',' + yOffset + ')');

                const tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(d => d);
                svg.call(tip);

                if (title) {
                    this.$utils.chart.addTitle(title, svg, this.$data.width);
                }

                let barWidth = barAreaWidth / ds.length - 1;

                g.enter()
                    .append('rect')
                    .merge(g)
                    .attr('class', 'bar')
                    .attr('width', () => barWidth)
                    .attr('height', d => barAreaHeight - yScale(d[metric]))
                    .attr('x', (d, i) => i * barAreaWidth / ds.length + xOffset + this.barAxisSpace)
                    .attr('y', d => yScale(d[metric]))
                    .on('mouseover', function(d) {
                        tip.show(d[descriptor] + ": " + d[metric], this);
                    })
                    .on('mouseout', tip.hide)
                    .attr('transform', 'translate(0,' + yOffset + ')');

                // Now that we have the real barAreaWidth, we can finally draw the xAxis
                xScale = this.$utils.chart.initOrdinalScale(d3, ds, options.dim, barAreaWidth);
                xAxis = d3.axisBottom()
                    .scale(xScale);

                this.$utils.chart.drawXAxis(svg, xAxis, (xOffset + this.barAxisSpace + barWidth/2), (barAreaHeight + yOffset + this.barAxisSpace) );
                g.exit().remove();
            }
        }
    }
</script>

<style scoped>
</style>
