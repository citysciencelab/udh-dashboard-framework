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
                        <h3 class="title">{{this.dashboardData.osStats ? this.dashboardData.osStats.length : 0}}</h3>
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
                <multi-select v-bind:selectData="this.getFilterOptions('osStats')"
                              v-bind:label="$t('message.udpc.os')" @new_selection="filterChanged"
                              identifier="osStats"/>
            </div>
            <div class="col-sm">
                <md-button type="submit" class="md-primary md-raised" @click="testSnackBar">
                    Open Snackbar
                </md-button>
                <br/>
                <md-button type="submit" class="md-primary md-raised" @click="agreeDialogActive = true">
                    Open Confirm Dialog
                </md-button>
                <confirm-dialog title="Some title" content="Some important question" confirmText="Agree" cancelText="No way"
                               @dialogResult="dialogResult" v-bind:active="this.agreeDialogActive"/>
                <br/>
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
                        <range-slider id="dateRangeSlider"
                                      v-bind:identity="dateRange"
                                      v-bind:defaultValue="rangeMap.dateRangeSlider.defaultValue"
                                      v-bind:step="rangeMap.dateRangeSlider.step"
                                      v-bind:max="rangeMap.dateRangeSlider.max"
                                      v-bind:min="rangeMap.dateRangeSlider.min"
                                      v-bind:marks="rangeMap.dateRangeSlider.marks"
                                      v-bind:isDateRange="true"
                                      @rangeChange="rangeForChartChanged"/>
                    </div>
                </div>
                <div class="row">
                    <div v-if="this.loading">LOADING ...</div>
                </div>
            </div>
            <div class="col-sm">
                <div class="facts-holder">
                    <transition-group name="list" tag="p">
                    <span v-for="(didYou, index) in [this.didYouKnow[didYouKnowIndex]]"
                          v-bind:key="index"
                          class="list-item">
                        {{didYou}}
                    </span>
                    </transition-group>
                </div>
            </div>
            <div class="col-sm">
                <p>{{ $t("message.hello") }}</p>
            </div>
        </div>
        <div class="row chart-row" style="height: 420px">
            <div class="col-sm">
                <stats-card data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('tooltip-os-data')">
                            OS Data
                        </div>
                        <md-icon class="info-icon" id="tooltip-os-data">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                        <bar-chart v-bind:ds="this.filteredData.osStats" v-bind:options="chartOptions.osStats"
                                   title="Distribution of operating systems"
                                   metric="anzahl_os" descriptor="os"
                                   selector="chart1" holder-element="chart-holder"/>
                    </template>

                    <template slot="footer">
                        <div class="notice">
                            this data is supported the JBe foundation
                        </div>
                    </template>
                </stats-card>
            </div>
            <div class="col-sm">
                <stats-card data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('')">
                            Other chart
                        </div>
                        <md-icon class="info-icon">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                        <line-chart v-bind:ds="this.filteredData.osStats" v-bind:options="chartOptions.osStats" v-bind:origins="['anzahl_os']"
                                    title="Distribution of operating systems"
                                    metric="anzahl_os" descriptor="os"
                                    selector="chart2" holder-element="chart-holder"/>
                    </template>

                    <template slot="footer">
                        <div class="notice">
                            this data is supported the JBe foundation
                        </div>
                    </template>
                </stats-card>
            </div>
        </div>
        <div class="row chart-row" style="height: 420px">
            <div class="col-sm">
                <stats-card data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('')">
                            Other chart
                        </div>
                        <md-icon class="info-icon">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                        <pie-chart v-bind:ds="this.filteredData.osStats" v-bind:options="chartOptions.osStats"
                                   title="Distribution of operating systems"
                                   metric="anzahl_os" descriptor="os"
                                   selector="chart3" holder-element="chart-holder"/>
                    </template>

                    <template slot="footer">
                        <div class="notice">
                            this data is supported the JBe foundation
                        </div>
                    </template>
                </stats-card>
            </div>
            <div class="col-sm">
                <stats-card data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('')">
                            Other chart
                        </div>
                        <md-icon class="info-icon">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                        <tree-map-chart v-bind:ds="this.filteredData.osStats" v-bind:options="chartOptions.osStats"
                                   title="Distribution of operating systems"
                                   metric="anzahl_os" descriptor="os"
                                   selector="chart4" holder-element="chart-holder"/>
                    </template>

                    <template slot="footer">
                        <div class="notice">
                            this data is supported the JBe foundation
                        </div>
                    </template>
                </stats-card>
            </div>
        </div>
        <div class="row chart-row" style="height: 420px">
            <div class="col-sm">
                <stats-card data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('')">
                            Other chart
                        </div>
                        <md-icon class="info-icon" id="">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                        <h-bar-chart v-bind:ds="this.filteredData.osStats" v-bind:options="chartOptions.osStats"
                                     title="Distribution of operating systems"
                                     metric="anzahl_os" descriptor="os"
                                     selector="chart5" holder-element="chart-holder"/>
                    </template>

                    <template slot="footer">
                        <div class="notice">
                            this data is supported the JBe foundation
                        </div>
                    </template>
                </stats-card>
            </div>
        </div>

        <!--Tooltips-->
        <b-tooltip target="tooltip-os-data" ref="tooltip-os-data" triggers="hover" custom-class="udpc-tooltip">
            I am tooltip <a href="javascript:void(0)"
                            onclick="window.open('http://www.swoosh.com')">component</a> content!
        </b-tooltip>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import StatsCard from '../components/StatsCard.vue';
import MultiSelect from '../components/MultiSelect.vue';
import SnackBar from '../components/SnackBar.vue';
import ConfirmDialog from '../components/ConfimDialog.vue';
import RangeSlider from '../components/RangeSlider.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import ScatterPlot from '../components/charts/ScatterPlot.vue';
import BarChart from '../components/charts/BarChart.vue';
import HBarChart from '../components/charts/HorBarChart.vue';
import TreeMapChart from '../components/charts/TreeMapChart.vue';
import udpcStore from '../store/udpc.module';

@Component({
    components: {
        StatsCard,
        MultiSelect,
        RangeSlider,
        BarChart,
        LineChart,
        PieChart,
        ScatterPlot,
        HBarChart,
        TreeMapChart,
        ConfirmDialog
    }
})
export default class UDPC extends Vue {
    tooltipActive = false;
    agreeDialogActive = false;
    dateRange = 'year';
    rangeMap: { [key: string]: DateRangeSlider } = {
        dateRangeSlider: {
            defaultValue: [],
            step: 0,
            max: 0,
            min: 0,
            marks: {}
        }
    };
    filteredData: { [key: string]: Dataset } = {
        osStats: []
    };
    chartOptions = {
        osStats: {
            dim: 'os'
        }
    };
    didYouKnow = [
        'Wussten Sie schon: Fact 1',
        'Wussten Sie schon: Fact 2',
        'Wussten Sie schon: Fact 3',
        'Wussten Sie schon: Fact 4',
        'Wussten Sie schon: Fact 5'
    ];
    didYouKnowIndex = 0;
    meta: { [key: string]: any } = {
        osStats: {
            title: 'Distribution of operating systems',
            dataSeries: {
                valueAccessor: 'anzahl_os',
                valueType: 'number',
                categoryAccessor: 'os',
                categoryType: 'string'
            }
        }
    };

    created() {
        this.$store.registerModule('udpc', udpcStore);

        this.$store.subscribe((mutation, state) => {
            if (!mutation.payload) {
                return;
            }
            const id = mutation.payload[0];
            const data = mutation.payload[1];

            if (mutation.type === 'SET_FILTERED_DATA' && data.length > 0) {
                this.filteredData[id] = data;
            }
        });
    }

    getFilterOptions(dataset: string) {
        if (!this.dashboardData[dataset]) {
            return [];
        }
        const accessor = this.meta[dataset].dataSeries.categoryAccessor;
        return this.dashboardData[dataset].map(value => value[accessor]);
    }

    async mounted() {
        // Lets set the initial dashboard data
        await this.setFilters(['SOURCE', 'services_internet']);
        await this.setFilters(['YEAR', [2017, 2019]]);
        await this.setFilters(['MONTH', [1, 12]]);

        // Lets fetch the initial dashboard data
        await this.fetchOsStats();

        // Initialize the 'Did you know' interval
        this.didYouKnowInterval();

        // Set initial date range
        this.changeFilterRange('dateRangeSlider', this.dateRange);
    }

    get dashboardData(): { [key: string]: Dataset } {
        return this.$store.getters.dashboardData;
    }

    get loading(): boolean {
        return this.$store.getters.loading;
    }

    setFilters(options: [string, string | number[]]) {
        this.$store.dispatch('setFilters', options);
    }

    fetchOsStats() {
        this.$store.dispatch('fetchOsStats');
    }

    filterOsStats() {
        this.$store.dispatch('applyFilter', ['osStats', this.meta.osStats.dataSeries.categoryAccessor]);
    }

    testSnackBar() {
        let options = {
            message: 'Important bottom message',
            position: 'center',
            duration: 10000,
            showSnackbar: true
        };

        const snack = document.getElementById('snack');
        if (!snack) {
            return;
        }
        new Vue({
            el: snack.querySelector('div') || undefined,
            render: h => h(SnackBar, { attrs: options })
        });
    }

    openToolTip(toolTipRef: string) {
        const component = <Vue>this.$refs[toolTipRef];
        if (!component) {
            return;
        }
        component.$emit('open');
    }

    changeFilterRange(sliderId: string, sliderRange: string) {
        this.dateRange = sliderRange;

        const today = new Date();
        let start = 0, end = 0;
        let values: DateRangeSlider = {
            defaultValue: [],
            step: 1,
            max: 0,
            min: 0,
            marks: {}
        };

        if (sliderRange === 'day') {
            start = 1;
            end = 31;
        } else if (sliderRange === 'month') {
            start = 1;
            end = 12;
        } else if (sliderRange === 'year') {
            start = today.getFullYear() - 2;
            end = today.getFullYear();
        }
        values.defaultValue = [start, end];
        values.max = end;
        values.min = start;

        for (start; start <= end; start++) {
            values.marks[start] = start;
        }

        this.rangeMap[sliderId] = values;
    }

    filterChanged() {
        // The new filters could be set here - so far the filter already does that itself
        // With the Listener (my watcher plugin) i was trying to avoid listening to the filter here, but doing it globally
        this.filterOsStats();
    }

    dialogResult(isPositive: boolean) {
        this.agreeDialogActive = false;
    }

    rangeForChartChanged([min, max]: [number, number]) {
        switch(this.dateRange) {
            case 'year':
                this.setFilters(['YEAR', [min, max]]);
                break;
            case 'month':
                this.setFilters(['MONTH', [min, max]]);
                break;
        }
        this.fetchOsStats();
    }

    addDataPoint() {
        let dataElement = {'val': 50, 'name': 'Fuz', 'val2': 1800};
        this.$store.commit('ADD_DASH_ELEMENT', {dataElement: dataElement});
    }

    didYouKnowInterval () {
        // setInterval(() => {
        this.didYouKnowIndex = setInterval(() => {
            if (this.didYouKnowIndex < this.didYouKnow.length-1) {
                this.didYouKnowIndex++;
            } else {
                this.didYouKnowIndex = 0;
            }
        }, 5000);
    }
}
</script>

<style scoped lang="scss">
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

    .facts-holder span {
        padding: 10px;
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
