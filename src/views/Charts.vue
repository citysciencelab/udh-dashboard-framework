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
                <multi-select v-bind:selectData="this.$store.getters.getPropertyData('name')" v-bind:label="$t('message.month')"
                              identifier="'mts-month'"/>
            </div>
            <div class="col-sm">
                <md-button type="submit" class="md-primary md-raised" @click="testSnackBar">
                    Open Snackbar
                    <md-tooltip md-direction="top" :md-active.sync="tooltipActive">Test tooltip: In einem solchen Tooltip werden alle Infos angezeigt</md-tooltip>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" @click="tooltipActive = !tooltipActive">Toggle Tooltip</md-button>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm-4">
                        <md-button type="submit" class="md-primary md-raised filter-button"
                                   v-bind:class="{'active' : dateRange === 'day'}"
                                   @click="changeFilterRange('dateRangeSlider', 'day')">
                            Tag
                        </md-button>
                    </div>
                    <div class="col-sm-4">
                        <md-button type="submit" class="md-primary md-raised filter-button"
                                   v-bind:class="{'active' : dateRange === 'month'}"
                                   @click="changeFilterRange('dateRangeSlider', 'month')">
                            Monat
                        </md-button>
                    </div>
                    <div class="col-sm-4">
                        <md-button type="submit" class="md-primary md-raised filter-button"
                                   v-bind:class="{'active' : dateRange === 'year'}"
                                   @click="changeFilterRange('dateRangeSlider', 'year')">
                            Jahr
                        </md-button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <range-slider id="dateRangeSlider" v-bind:identity="dateRange"
                                      v-bind:defaultValue="rangeMap['dateRangeSlider']['defaultValue']"
                                      v-bind:step="rangeMap['dateRangeSlider']['step']"
                                      v-bind:max="rangeMap['dateRangeSlider']['max']"
                                      v-bind:min="rangeMap['dateRangeSlider']['min']"
                                      v-bind:marks="rangeMap['dateRangeSlider']['marks']"
                                      @rangeChange="rangeForChartChanged" isDateRange="true"/>
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
                <p>{{ $t("message.hello") }}</p>
            </div>
        </div>
        <div class="row" style="height: 350px">
            <div class="col-sm">
                <bar-chart v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                           title="Bar Chart Example" metric="val" selector="chart1"/>
            </div>
            <div class="col-sm">
                <line-chart v-bind:ds="this.$store.getters.dashData" v-bind:options="options"
                            title="Line Chart Example" metric="val2" selector="chart2"
                            drawLinesBy="origin" v-bind:origins="['val1', 'val2']"/>
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

    import LineChart from "../components/charts/LineChart.vue";
    import PieChart from "../components/charts/PieChart.vue";
    import ScatterPlot from "../components/charts/ScatterPlot.vue";
    import BarChart from "../components/charts/BarChart.vue";
    import HBarChart from "../components/charts/HorBarChart.vue";

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
                tooltipActive: false,
                dataSet: [
                    {'val': 50,'val1': 1400, 'val2': 1900, 'name': 'Jan', 'date': new Date("2019-01")},
                    {'val': 60,'val1': 1900, 'val2': 1730, 'name': 'Feb', 'date': new Date("2019-02")},
                    {'val': 65,'val1': 1000, 'val2': 1800, 'name': 'Mar', 'date': new Date("2019-03")},
                    {'val': 80,'val1': 1250, 'val2': 1805, 'name': 'Apr', 'date': new Date("2019-04")},
                    {'val': 56,'val1': 1050, 'val2': 1750, 'name': 'May', 'date': new Date("2019-05")},
                    {'val': 78,'val1': 1090, 'val2': 1777, 'name': 'Jun', 'date': new Date("2019-06")},
                    {'val': 99,'val1': 1700, 'val2': 2100, 'name': 'Jul', 'date': new Date("2019-07")},
                    {'val': 95,'val1': 1400, 'val2': 2089, 'name': 'Aug', 'date': new Date("2019-08")},
                    {'val': 76,'val1': 1400, 'val2': 1640, 'name': 'Sept', 'date': new Date("2019-09")},
                    {'val': 40,'val1': 1100, 'val2': 1790, 'name': 'Oct', 'date': new Date("2019-10")},
                    {'val': 35,'val1': 1155, 'val2': 1500, 'name': 'Nov', 'date': new Date("2019-11")},
                    {'val': 42,'val1': 1333, 'val2': 1800, 'name': 'Dec', 'date': new Date("2019-12")},
                ],
                dateRange: 'month',
                rangeMap: {
                    dateRangeSlider: {
                        'defaultValue' : [],
                        'step' : null,
                        'max' : null,
                        'min' : null,
                        'marks' : {}
                    }
                },
                options: {
                    dim: 'name',
                    dim2: 'date'
                },
                didYouKnow: [
                    'Wussten Sie schon: Fact 1',
                    'Wussten Sie schon: Fact 2',
                    'Wussten Sie schon: Fact 3',
                    'Wussten Sie schon: Fact 4',
                    'Wussten Sie schon: Fact 5'
                ],
                didYouKnowIndex: 0
            }
        },
        mounted: function () {
            // Lets set the initial dashboard data
            this.$store.commit('SET_ORIGINAL_DATA', {originalData: this.dataSet});
            // Initialize the 'Did you know' interval
            this.didYouKnowInterval();
            // Set initial date range
            this.changeFilterRange('dateRangeSlider', this.dateRange);
        },
        methods: {
            testSnackBar: function () {
                let options = {
                    message: "Important bottom message",
                    position: "center",
                    duration: 10000,
                    showSnackbar: true
                };
                new Vue({
                    el: document.getElementById("snack").querySelector("div"),
                    render: h => h(SnackBar, { attrs: options })
                });
            },
            changeFilterRange: function (sliderId, sliderRange) {
                let values = {};
                this.dateRange = sliderRange;
                let today = new Date();

                if (sliderRange === 'day') {
                    today = today.getTime();
                    let startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - 1);
                    let oneMonthAgo = new Date();
                    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                    const marks =  {};
                    marks[startDate.getTime()] =  this.$utils.date.getDateStringFromDate(startDate);
                    marks[today] = this.$utils.date.getDateStringFromMillis(today);

                    values = {
                        'defaultValue' : [oneMonthAgo.getTime(), today],
                        'step' : 1 ,
                        'max' : today,
                        'min' : startDate.getTime(),
                        'marks' : marks
                    };
                } else if (sliderRange === 'month') {
                    let startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - 3);
                    let sixMonthAgo = new Date();
                    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
                    const marks =  {};
                    marks[startDate.getTime()] =  startDate.getMonth() + `.` + startDate.getFullYear();
                    marks[today.getTime()] = today.getMonth() + `.` + today.getFullYear();

                    values = {
                        'defaultValue' : [sixMonthAgo.getTime(), today.getTime()],
                        'step' : 1,
                        'max' : today.getTime(),
                        'min' : startDate.getTime(),
                        'marks' : marks
                    };
                } else if (sliderRange === 'year') {
                    let startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - 12);
                    let twoYearsAgo = new Date();
                    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

                    const marks =  {};
                    marks[startDate.getTime()] =  startDate.getFullYear();
                    marks[today.getTime()] = today.getFullYear();

                    values = {
                        'defaultValue' : [twoYearsAgo.getTime(), today.getTime()],
                        'step' : 1,
                        'max' : today.getTime(),
                        'min' : startDate.getTime(),
                        'marks' : marks
                    };
                }

                this.rangeMap[sliderId] = values;
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
