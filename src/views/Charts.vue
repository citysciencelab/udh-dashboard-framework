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
                        <p class="category">Size of dataset</p>
                        <h3 class="title">{{ this.dashData.length }}</h3>
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
                        <range-slider id="range-id" v-bind:identity="this.dateRange"
                                      v-if="this.dateRangeValues['range-id']"
                                      v-bind:defaultValue="this.dateRangeValues['range-id']['defaultValue']"
                                      v-bind:step="this.dateRangeValues['range-id']['step']"
                                      v-bind:max="this.dateRangeValues['range-id']['max']"
                                      v-bind:min="this.dateRangeValues['range-id']['min']"
                                      v-bind:marks="this.dateRangeValues['range-id']['marks']"
                                      v-bind:isDateRange="true"
                                      @rangeChange="rangeForChartChanged"/>
                    </div>
                </div>
                <div class="row">
                    <div v-if="this.loading">LOADING ...</div>
                </div>
            </div>
            <div class="col-sm">
                <transition-group name="list" tag="p">
                    <span v-for="(didYou, index) in [this.didYouKnow[didYouKnowIndex]]"
                          v-bind:key="index"
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
                <bar-chart v-bind:ds="this.dashData" v-bind:options="options"
                           title="Bar Chart Example" metric="val" selector="chart1"/>
            </div>
            <div class="col-sm">
                <line-chart v-bind:ds="this.dashData" v-bind:options="options"
                            title="Line Chart Example" metric="val2" selector="chart2"
                            drawLinesBy="origin" v-bind:origins="['val1', 'val2']"/>
            </div>
        </div>
        <div class="row" style="height: 350px">
            <div class="col-sm">
                <pie-chart v-bind:ds="this.testData" v-bind:options="options" selector="chart3"
                           title="Distribution of operating systems" metric="anzahl_os" descriptor="os" />
            </div>
            <div class="col-sm">
                <scatter-plot v-bind:ds="this.dashData" v-bind:options="options"
                              title="Scatter Plot Example" metric="val2"  metric2="val" selector="chart4"/>
            </div>
        </div>
        <div class="row" style="height: 350px">
            <div class="col-sm">
                <h-bar-chart v-bind:ds="this.dashData" v-bind:options="options"
                             title="Hor Bar Chart Example" metric="val" selector="chart5"/>
            </div>
        </div>
        <div class="row">
            <div class="data-grid">
                <div v-for="(t, index) in this.dashData"
                     v-bind:key="index">
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
    import { mapActions, mapGetters } from 'vuex'
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
                dateRange: 'month',
                dateRangeValues: {
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
        async mounted() {
            // Lets set the initial dashboard data
            await this.fetchData();
            await this.fetchTestData({ month: 7, year: 2019, source: 'services_internet' });

            // Initialize the 'Did you know' interval
            this.didYouKnowInterval();

            // Set initial date range
            this.changeFilterRange('range-id', 'month');
        },
        computed: {
            ...mapGetters([
                'dashData',
                'testData',
                'loading',
            ])
        },
        methods: {
            ...mapActions([
                'fetchData', // map `this.fetchData()` to `this.$store.dispatch('fetchData')`
                'fetchTestData'
            ]),
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
            changeFilterRange: function (sliderId, silderRange) {
                let values = {};
                this.dateRange = silderRange;
                let today = new Date();

                if (silderRange === 'day') {
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
                } else if (silderRange === 'month') {
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
                } else if (silderRange === 'year') {
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

                this.dateRangeValues[sliderId] = values;
            },
            rangeForChartChanged: function (/*rangeValue*/) {
            //   console.log(rangeValue);
            },
            addDataPoint: function () {
                let dataElement = {'val': 50, 'name': 'Fuz', 'val2': 1800};
                this.$store.commit('ADD_DASH_ELEMENT', {dataElement: dataElement});
            },
            handleMouseOut() {
                let changedObject = this.dashData[this.dashData.length-1];
                Vue.set(this.dashData, this.dashData.length-1, changedObject);
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
