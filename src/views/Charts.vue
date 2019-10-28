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
                <multi-select v-bind:selectData="this.$store.getters.getPropertyData('name')" v-bind:label="'Month'" v-bind:identity="'name'" />
            </div>
            <div class="col-sm">
                <md-button type="submit" class="md-primary md-raised" @click="testSnackBar">
                    Open Snackbar
                    <md-tooltip md-direction="right">Test tooltip</md-tooltip>
                </md-button>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <range-slider v-bind:defaultValue="[40,80]"
                              v-bind:step="5" v-bind:max="140" v-bind:min="10" />
            </div>
            <div class="col-sm">
                whaat
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <bar-chart v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                           title="Bar Chart Example" metric="val" selector="chart1"/>
            </div>
            <div class="col-sm">
                <line-chart v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                           title="Line Chart Example" metric="val2" selector="chart2"/>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <pie-chart v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                            title="Pie Chart Example" metric="val" selector="chart3"/>
            </div>
            <div class="col-sm">
                <scatter-plot v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                           title="Scatter Plot Example" metric="val2"  metric2="val" selector="chart4"/>
            </div>
        </div>
        <div class="row">
            <div class="data-grid">
                <div v-for="(t, index) in this.$store.getters.dashData">
                    <input v-model="t.name" @blur="handleMouseOut">
                    <input v-model.number="t.val" type="number" @blur="handleMouseOut">
                    <input v-model.number="t.val2" type="number" @blur="handleMouseOut">
                </div>
                <button @click="addDataPoint">
                    New Data Point
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import StatsCard from "../components/StatsCard";
    import MultiSelect from "../components/MultiSelect";
    import SnackBar from "../components/SnackBar";
    import RangeSlider from "../components/RangeSlider";

    import LineChart from "../charts/LineChart.vue";
    import PieChart from "../charts/PieChart.vue";
    import ScatterPlot from "../charts/ScatterPlot.vue";
    import BarChart from "../charts/BarChart.vue";

    export default {
        components: {
            StatsCard,
            MultiSelect,
            SnackBar,
            RangeSlider,

            BarChart,
            LineChart,
            PieChart,
            ScatterPlot
        },
        name: 'Charts',
        data() {
            return {
                dataSet: [
                    {'val': 50, 'val2': 1900, 'name': 'Jan', 'date': new Date(2019, 1)},
                    {'val': 60, 'val2': 1730, 'name': 'Feb', 'date': new Date(2019, 2)},
                    {'val': 65, 'val2': 1800, 'name': 'Mar', 'date': new Date(2019, 3)},
                    {'val': 80, 'val2': 1805, 'name': 'Apr', 'date': new Date(2019, 4)},
                    {'val': 56, 'val2': 1750, 'name': 'May', 'date': new Date(2019, 5)},
                    {'val': 78, 'val2': 1777, 'name': 'Jun', 'date': new Date(2019, 6)},
                    {'val': 99, 'val2': 2100, 'name': 'Jul', 'date': new Date(2019, 7)},
                    {'val': 95, 'val2': 2089, 'name': 'Aug', 'date': new Date(2019, 8)},
                    {'val': 76, 'val2': 1640, 'name': 'Sept', 'date': new Date(2019, 9)},
                    {'val': 40, 'val2': 1790, 'name': 'Oct', 'date': new Date(2019, 10)},
                    {'val': 35, 'val2': 1500, 'name': 'Nov', 'date': new Date(2019, 11)},
                    {'val': 42, 'val2': 1800, 'name': 'Dec', 'date': new Date(2019, 12)},
                ],
                options: {
                    dim: 'name',
                    dim2: 'date',
                    height: 200,
                    width: 250
                }
            }
        },
        mounted: function () {
            // Lets set the initial dashboard data
            this.$store.commit('SET_ORIGINAL_DATA', {originalData: this.dataSet});
        },
        methods: {
            testSnackBar: function () {
                let options = {
                    message: "Snack snack",
                    position: "center",
                    duration: 4000,
                    showSnackbar: true
                };
                new Vue({
                    el: document.getElementById("snack").querySelector("div"),
                    render: h => h(SnackBar, { attrs: options })
                });
            },
            addDataPoint: function () {
                let dataElement = {'val': 50, 'name': 'Fuz', 'val2': 1800};
                this.$store.commit('ADD_DASH_ELEMENT', {dataElement: dataElement});
            },
            handleMouseOut(evt) {
                let changedObject = this.dataSet[this.dataSet.length-1];
                Vue.set(this.dataSet, this.dataSet.length-1, changedObject);
            }
        }
    }
</script>

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
</style>
