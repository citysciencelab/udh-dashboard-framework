<template class="chart-container">
    <svg class="chart" v-bind:id="selector"></svg>
</template>

<script>
    import AbstractChart from './AbstractChart.vue';

    export default {
        name: "h-bar-chart",
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
                // let barAreaWidth = this.$data.width - xOffset - this.barAxisSpace;
                let barAreaHeight = this.$data.height - yOffset - this.barAxisSpace;

                let g = svg.selectAll('rect')
                    .data(ds);

                // Draw the Y-Axis - but just for calculation
                // let yScale = this.$utils.chart.initOrdinalScale(d3, ds, options.dim, barAreaWidth);
                let yScale = this.$utils.chart.initOrdinalScale(d3, ds, options.dim, barAreaHeight);
                let yAxis = d3.axisLeft()
                    .scale(yScale);

                let maxWidthAxis = this.$utils.chart.drawAxisMeasureExtend(svg, yAxis, 'yAxis');
                let barAreaWidth = this.$data.width - xOffset - maxWidthAxis;
                // Remove the axis
                svg.selectAll('.yAxis').remove();

                // Now drawing the xAxis
                let maxVal = Math.max.apply(Math, ds.map((o) => o[metric]));
                let xScale = d3.scaleLinear()
                    .domain([0, maxVal])
                    .range([0, barAreaWidth]);
                let xAxis = d3.axisBottom()
                    .scale(xScale);

                // Calculate the axis size and take it into account
                let maxHeightAxis = this.$utils.chart.drawAxisMeasureExtend(svg, xAxis, 'xAxis');
                yOffset = maxHeightAxis + yOffset;

                // Now we can recalculate the actual chart area
                barAreaHeight = this.$data.height - yOffset;

                svg.selectAll('.xAxis')
                    .attr('transform', 'translate('+ (xOffset + maxWidthAxis + this.barAxisSpace) +',' + (yOffset + barAreaHeight + this.barAxisSpace) + ')');

                const tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(d => d);
                svg.call(tip);

                if (title) {
                    this.$utils.chart.addTitle(title, svg, this.$data.width);
                }

                let barHeight = barAreaHeight / ds.length - 1;

                g.enter()
                    .append('rect')
                    .merge(g)
                    .attr('class', 'bar')
                    .attr('width', d => xScale(d[metric]))
                    .attr('height', () => barHeight)
                    .attr('y', (d, i) => i * barAreaHeight / ds.length + yOffset)
                    .attr('x', d => xOffset + maxWidthAxis)
                    .on('mouseover', function(d) {
                        tip.show(d[descriptor] + ": " + d[metric], this);
                    })
                    .on('mouseout', tip.hide)
                    .attr('transform', 'translate(' + xOffset + ', 0)');

                // Now that we have the real barAreaWidth, we can finally draw the xAxis
                yScale = this.$utils.chart.initOrdinalScale(d3, ds, options.dim, barAreaHeight);
                yAxis = d3.axisLeft()
                    .scale(yScale);

                // this.$utils.chart.drawYAxis(svg, yAxis, (barAreaHeight + yOffset + this.barAxisSpace), (xOffset + this.barAxisSpace + barWidth/2) );
                this.$utils.chart.drawYAxis(svg, yAxis, (xOffset + maxWidthAxis) ,  (yOffset + this.barAxisSpace));
                g.exit().remove();
            }
        }
    }
</script>

<style scoped>
</style>
