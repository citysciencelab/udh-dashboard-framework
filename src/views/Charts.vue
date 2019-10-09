<template>
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <stats-card data-background-color="green">
                    <template slot="header">
                        <md-icon>store</md-icon>
                    </template>

                    <template slot="content">
                        <p class="category">Revenue</p>
                        <h3 class="title">$34,245</h3>
                    </template>

                    <template slot="footer">
                        <div class="stats">
                            <md-icon>date_range</md-icon>
                            Last 24 Hours
                        </div>
                    </template>
                </stats-card>
            </div>
            <div class="col-sm">
                <stats-card data-background-color="orange">
                    <template slot="header">
                        <md-icon>file_copy</md-icon>
                    </template>

                    <template slot="content">
                        <p class="category">Used Space</p>
                        <h3 class="title">
                            49/50
                            <small>GB</small>
                        </h3>
                    </template>

                    <template slot="footer">
                        <div class="stats">
                            <md-icon class="text-danger">warning</md-icon>
                            <a href="#pablo">Get More Space...</a>
                        </div>
                    </template>
                </stats-card>
            </div>
            <div class="col-sm">
                <stats-card data-background-color="red">
                    <template slot="header">
                        <md-icon>info_outline</md-icon>
                    </template>

                    <template slot="content">
                        <p class="category">Fixed Issues</p>
                        <h3 class="title">75</h3>
                    </template>

                    <template slot="footer">
                        <div class="stats">
                            <md-icon>local_offer</md-icon>
                            Tracked from Github
                        </div>
                    </template>
                </stats-card>
            </div>
            <div class="col-sm">
                <stats-card data-background-color="blue">
                    <template slot="header">
                        <md-icon>cake</md-icon>
                    </template>

                    <template slot="content">
                        <p class="category">Folowers</p>
                        <h3 class="title">+245</h3>
                    </template>

                    <template slot="footer">
                        <div class="stats">
                            <md-icon>update</md-icon>
                            Just Updated
                        </div>
                    </template>
                </stats-card>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <svg class="chart" id="chart" width="500" height="300"></svg>
            </div>
            <div class="col-sm">
                <svg class="chart" id="chart2" width="500" height="300"></svg>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <svg class="chart" id="chart3" width="500" height="300"></svg>
            </div>
            <div class="col-sm">
                <svg class="chart" id="chart4" width="500" height="300"></svg>
            </div>
        </div>
        <div class="row">
            <div class="data-grid">
                <div v-for="(t, index) in dataSet">
                    <input v-model="t.name">
                    <input v-model.number="t.val" type="number">
                    <input v-model.number="t.val2" type="number">
                </div>
                <button @click="addDataPoint">
                    New Data Point
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import StatsCard from "../components/StatsCard";

    export default {
        components: {
            StatsCard
        },
        name: 'BarChart',
        data() {
            return {
                dataSet: [
                    {'val': 50, 'val2': 1900, 'name': 'Jan'},
                    {'val': 60, 'val2': 1730, 'name': 'Feb'},
                    {'val': 65, 'val2': 1800, 'name': 'Mar'},
                    {'val': 80, 'val2': 1805, 'name': 'Apr'},
                    {'val': 56, 'val2': 1750, 'name': 'May'},
                    {'val': 78, 'val2': 1777, 'name': 'Jun'},
                    {'val': 99, 'val2': 2100, 'name': 'Jul'},
                    {'val': 95, 'val2': 2089, 'name': 'Aug'},
                    {'val': 76, 'val2': 1640, 'name': 'Sept'},
                    {'val': 40, 'val2': 1790, 'name': 'Oct'},
                    {'val': 35, 'val2': 1500, 'name': 'Nov'},
                    {'val': 42, 'val2': 1800, 'name': 'Dec'}
                ],
                options: {
                    dim: 'name',
                    height: 200,
                    width: 250
                }
            }
        },
        mounted: function () {
            this.renderCharts();
        },
        beforeUpdate: function () {
            this.renderCharts();
        },
        methods: {
            addDataPoint: function () {
                this.dataSet.push({'val': 0, 'name': '', 'val2': 0});
            },
            renderCharts: function () {
                this.options.selector = '#chart',
                    this.options.metric = 'val',
                    this.options.title = "Example Bar Chart";
                this.$helpers.chart.barChart(this.$d3, this.dataSet, this.options);

                this.options.selector = '#chart2',
                    this.options.metric = 'val2',
                    this.options.title = "Example Line Chart";
                this.$helpers.chart.lineChart(this.$d3, this.dataSet, this.options);

                this.options.selector = '#chart3',
                    this.options.metric = 'val',
                    this.options.title = "Example Pie Chart";
                this.$helpers.chart.pieChart(this.$d3, this.dataSet, this.options);

                this.options.selector = '#chart4',
                    this.options.metric = 'val2',
                    this.options.metric2 = 'val',
                    this.options.title = "Example Scatter Plot";
                this.$helpers.chart.scatterPlot(this.$d3, this.dataSet, this.options);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    
    .chart {
        padding: 20px;
    }
</style>
