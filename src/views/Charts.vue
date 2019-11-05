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
                <div class="row">
                    <div class="col-sm-4">
                        <md-button type="submit" class="md-primary md-raised filter-button"
                                   @click="changeFilterRange('range-id', 'day')">
                            Tag
                        </md-button>
                    </div>
                    <div class="col-sm-4">
                        <md-button type="submit" class="md-primary md-raised filter-button"
                                   @click="changeFilterRange('range-id', 'month')">
                            Monat
                        </md-button>
                    </div>
                    <div class="col-sm-4">
                        <md-button type="submit" class="md-primary md-raised filter-button"
                                   @click="changeFilterRange('range-id', 'year')">
                            Jahr
                        </md-button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <range-slider id="range-id"
                                      v-bind:defaultValue="this.dateRangeValues['range-id']['defaultValue']"
                                      v-bind:step="this.dateRangeValues['range-id']['step']"
                                      v-bind:max="this.dateRangeValues['range-id']['max']"
                                      v-bind:min="this.dateRangeValues['range-id']['min']"
                                      v-bind:marks="this.dateRangeValues['range-id']['marks']"
                                      @rangeChange="rangeForChartChanged"/>
                    </div>
                </div>
            </div>
            <div class="col-sm">
                <transition-group name="list" tag="p">
                    <span v-for="(didYou, index) in this.didYouKnow"
                          v-bind:key="didYou"
                          v-if="index === didYouKnowIndex"
                          class="list-item">
                        {{didYou}}
                    </span>
                </transition-group>
            </div>
            <div class="col-sm">
                whaat: {{this.didYouKnowIndex}}
            </div>
        </div>
        <div class="row" style="height: 350px">
            <div class="col-sm">
                <bar-chart v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                           title="Bar Chart Example" metric="val" selector="chart1"/>
            </div>
            <div class="col-sm">
                <line-chart v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                           title="Line Chart Example" metric="val2" selector="chart2"/>
            </div>
        </div>
        <div class="row" style="height: 350px">
            <div class="col-sm">
                <pie-chart v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                            title="Pie Chart Example" metric="val" selector="chart3"/>
            </div>
            <div class="col-sm">
                <scatter-plot v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                           title="Scatter Plot Example" metric="val2"  metric2="val" selector="chart4"/>
            </div>
        </div>
        <div class="row" style="height: 350px">
            <div class="col-sm">
                <h-bar-chart v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                            title="Hor Bar Chart Example" metric="val" selector="chart5"/>
            </div>
            <div class="col-sm">
                hj
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
    import HBarChart from "../charts/HorBarChart.vue";

    export default {
        components: {
            StatsCard,
            MultiSelect,
            SnackBar,
            RangeSlider,

            BarChart,
            LineChart,
            PieChart,
            ScatterPlot,
            HBarChart
        },
        name: 'Charts',
        data() {
            return {
                dataSet: [
                    {'val': 50, 'val2': 1900, 'name': 'Jan', 'date': new Date("2019-01")},
                    {'val': 60, 'val2': 1730, 'name': 'Feb', 'date': new Date("2019-02")},
                    {'val': 65, 'val2': 1800, 'name': 'Mar', 'date': new Date("2019-03")},
                    {'val': 80, 'val2': 1805, 'name': 'Apr', 'date': new Date("2019-04")},
                    {'val': 56, 'val2': 1750, 'name': 'May', 'date': new Date("2019-05")},
                    {'val': 78, 'val2': 1777, 'name': 'Jun', 'date': new Date("2019-06")},
                    {'val': 99, 'val2': 2100, 'name': 'Jul', 'date': new Date("2019-07")},
                    {'val': 95, 'val2': 2089, 'name': 'Aug', 'date': new Date("2019-08")},
                    {'val': 76, 'val2': 1640, 'name': 'Sept', 'date': new Date("2019-09")},
                    {'val': 40, 'val2': 1790, 'name': 'Oct', 'date': new Date("2019-10")},
                    {'val': 35, 'val2': 1500, 'name': 'Nov', 'date': new Date("2019-11")},
                    {'val': 42, 'val2': 1800, 'name': 'Dec', 'date': new Date("2019-12")},
                ],
                dateRangeValues: {
                    'range-id' : {
                            'defaultValue' : [40,90],
                            'step' : 5,
                            'max' : 140,
                            'min' : 0,
                            'marks' : {0: 0, 140: 140}
                    }
                },
                options: {
                    dim: 'name',
                    dim2: 'date'
                },
                didYouKnow: [
                    'Wussten Sie schon -- <sdsdsdfvasdasdf',
                    'Wussten Sie schon -- <sdfsfjtjuzkgzkgkfghndghnfghdfgh',
                    'Wussten Sie schon -- <sdfgsdfholiopölui',
                    'Wussten Sie schon -- sdfbfgh',
                    'Wussten Sie schon -- 7825327hjkgjk8'
                ],
                didYouKnowIndex: 0
            }
        },
        mounted: function () {
            // Lets set the initial dashboard data
            this.$store.commit('SET_ORIGINAL_DATA', {originalData: this.dataSet});
            // Initialize the 'Did you know' interval
            this.didYouKnowInterval()
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
            changeFilterRange: function (sliderId, silderRange) {
                let values = {};
                if (silderRange === 'day') {
                    values = {
                        'defaultValue' : [40,90],
                        'step' : 5,
                        'max' : 140,
                        'min' : 0,
                        'marks' : {0: 0, 140: 140}
                    };
                } else if (silderRange === 'month') {
                    values = {
                        'defaultValue' : [1000,4000],
                        'step' : 100,
                        'max' : 5000,
                        'min' : 100,
                        'marks' : {100: 100, 5000: 5000}
                    };
                } else if (silderRange === 'year') {
                    values = {
                        'defaultValue' : [100,200],
                        'step' : 50,
                        'max' : 500,
                        'min' : 10,
                        'marks' : {10: 10, 500: 500}
                    };
                }

                this.dateRangeValues[sliderId] = values;
            },
            rangeForChartChanged: function (rangeValue) {
              console.log(rangeValue);
            },
            addDataPoint: function () {
                let dataElement = {'val': 50, 'name': 'Fuz', 'val2': 1800};
                this.$store.commit('ADD_DASH_ELEMENT', {dataElement: dataElement});
            },
            handleMouseOut() {
                let changedObject = this.dataSet[this.dataSet.length-1];
                Vue.set(this.dataSet, this.dataSet.length-1, changedObject);
            },
            didYouKnowInterval () {
                this.didYouKnowIndex = setInterval(() => {
                    if (this.didYouKnowIndex < this.didYouKnow.length-1) {
                        this.didYouKnowIndex++;
                    } else {
                        this.didYouKnowIndex = 0;
                    }
                }, 5000)
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

    .filter-button {
        background-color: transparent !important;
        color: black !important;
        height: 28px !important;
        min-width: 80px !important;
        padding-top: 4px !important;
    }


    /*
        Transition
    */

    .list {
        position: relative;
    }
    .list-item {
        position: absolute;
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: opacity .8s ease;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
    }
</style>
