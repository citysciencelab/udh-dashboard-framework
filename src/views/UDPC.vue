<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <img class="hh-logo" src="../assets/images/_HH_Logo_2016.svg" alt="Hamburg Logo">
            <img class="hh-bug" src="../assets/images/Hamburg_Bug_NEU_RGB.png" alt="Hamburg Bug">
            <span class="navbar-brand">Urban Data Platform</span>
        </nav>

        <div class="container-fluid">
            <div class="row ">
                <div class="col-sm-4 py-2">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="info-icon-holder" @click="$refs['tooltip-did-you-know'].showMe()">
                                <md-icon>help</md-icon>
                            </div>
                            <div class="card-header-text">{{ $t('udpc.didYouKNow') }}</div>
                        </template>
                        <template slot="content">
                            <did-you-know v-bind:items="didYouKnow" v-bind:interval="5000"></did-you-know>
                        </template>
                        <template slot="footer">
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-4 py-2">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="info-icon-holder" @click="$refs['tooltip-latest-datasets'].showMe()">
                                <md-icon>help</md-icon>
                            </div>
                            <div class="card-header-text">{{ $t('udpc.newDatassets') }}</div>
                        </template>
                        <template slot="content">
                            <did-you-know v-bind:items="dataSets" v-bind:interval="5000"></did-you-know>
                        </template>
                        <template slot="footer">
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-4">
                    <div class="row">
                        <div class="col-sm-6 col-6 py-2">
                            <dashboard-tile data-background-color="blue" class="chart-card">
                                <template slot="header">
                                    <div class="info-icon-holder" @click="$refs['tooltip-sensors'].showMe()">
                                        <md-icon>help</md-icon>
                                    </div>
                                    <div class="card-header-text">{{ $t('udpc.sensors') }}</div>
                                </template>
                                <template slot="content">
                                    <span class="dashboard-kpi">
                                        386
                                    </span>
                                </template>
                                <template slot="footer">
                                </template>
                            </dashboard-tile>
                        </div>
                        <div class="col-sm-6 col-6 py-2">
                            <dashboard-tile data-background-color="blue" class="chart-card">
                                <template slot="header">
                                    <div class="info-icon-holder" @click="$refs['tooltip-visitors-today'].showMe()">
                                        <md-icon>help</md-icon>
                                    </div>
                                    <div class="card-header-text">{{ $t('udpc.visitors') }}</div>
                                </template>
                                <template slot="content">
                                    <span class="dashboard-kpi">
                                        893
                                    </span>
                                </template>
                                <template slot="footer">
                                </template>
                            </dashboard-tile>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row ">
                <div class="col-sm-4 py-2">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="info-icon-holder" @click="$refs['tooltip-datasets-by'].showMe()">
                                <md-icon>help</md-icon>
                            </div>
                            <div class="card-header-text">{{ $t('udpc.countBy') }}</div>
                        </template>
                        <template slot="content">
                            <md-tabs class="dashboard-tabs" @md-changed="fetchTotalsByTopic">
                                <md-tab id="tab-topics" :md-label="$t('udpc.tabTopics')">&nbsp;</md-tab>
                                <md-tab id="tab-organisations" :md-label="$t('udpc.tabOrganisations')">&nbsp;</md-tab>
                            </md-tabs>
                            <div class="chart-holder">
                                <tree-map-chart :chartData="chartData.dataSetsByTopic"
                                                :chartOptions="chartOptions.dataSetsByTopic"/>
                            </div>
                        </template>
                        <template slot="footer">
                            <div class="notice">
                                <md-switch v-model="countGroupedWithPlans" class="dashboard-switch">{{ $t('udpc.includeDevPlan') }}</md-switch>
                            </div>
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-4 py-2">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="info-icon-holder" @click="$refs['tooltip-count-total'].showMe()">
                                <md-icon>help</md-icon>
                            </div>
                            <div class="card-header-text">{{ $t('udpc.countTotal') }}</div>
                        </template>
                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-datasets" :md-label="$t('udpc.tabDatasets')">chart1</md-tab>
                                <md-tab id="tab-apps" :md-label="$t('udpc.tabApps')">chart2</md-tab>
                                <md-tab id="tab-sensordatasets" :md-label="$t('udpc.tabSensors')">chart3</md-tab>
                            </md-tabs>
                        </template>
                        <template slot="footer">
                            <div class="notice">
                                <md-switch v-model="countTotalWithPlans" class="dashboard-switch">{{ $t('udpc.includeDevPlan') }}</md-switch>
                            </div>
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-4 py-2">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="info-icon-holder" @click="$refs['tooltip-map'].showMe()">
                                <md-icon>help</md-icon>
                            </div>
                            <div class="card-header-text">{{ $t('udpc.map') }}</div>
                        </template>
                        <template slot="content">
                            <span>MasterportalAPI</span>
                        </template>
                        <template slot="footer">
                        </template>
                    </dashboard-tile>
                </div>
            </div>
            <div class="row ">
                <div class="col-sm-3 py-2">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="info-icon-holder" @click="$refs['tooltip-top-x'].showMe()">
                                <md-icon>help</md-icon>
                            </div>
                            <div class="card-header-text">{{ $t('udpc.top5') }}</div>
                        </template>
                        <template slot="content">
                            <md-tabs class="dashboard-tabs" @md-changed="fetchTops">
                                <md-tab id="tab-top5-datasets" :md-label="$t('udpc.tabDatasets')">&nbsp;</md-tab>
                                <md-tab id="tab-top5-apps" :md-label="$t('udpc.tabApps')">&nbsp;</md-tab>
                                <md-tab id="tab-top5-downloads" :md-label="$t('udpc.tabDownloads')">&nbsp;</md-tab>
                            </md-tabs>
                            <div class="chart-holder">
                                <bar-chart-horizontal :chartData="chartData.dataSetsTopX"
                                                      :chartOptions="chartOptions.dataSetsTopX"/>
                            </div>
                        </template>
                        <template slot="footer">
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-3 py-2">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="info-icon-holder" @click="$refs['tooltip-downloads'].showMe()">
                                <md-icon>help</md-icon>
                            </div>
                            <div class="card-header-text">{{ $t('udpc.download') }}</div>
                        </template>
                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-downloads-year" :md-label="$t('udpc.tabYear')"
                                        @click="changeFilterRange('downloads', 'year')">chart1</md-tab>
                                <md-tab id="tab-downloads-month" :md-label="$t('udpc.tabMonth')"
                                        @click="changeFilterRange('downloads', 'month')">chart2</md-tab>
                            </md-tabs>
                        </template>
                        <template slot="footer">
                            <range-slider :options="sliderOptions.downloads"
                                          @rangeChange="rangeForChartChanged('downloads', $event)"/>
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-3 py-2">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="info-icon-holder" @click="$refs['tooltip-access-data'].showMe()">
                                <md-icon>help</md-icon>
                            </div>
                            <div class="card-header-text">{{ $t('udpc.accessTopicData') }}</div>
                        </template>
                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-access-topic-year" :md-label="$t('udpc.tabYear')"
                                        @click="changeFilterRange('access', 'year')">chart1</md-tab>
                                <md-tab id="tab-access-topic-month" :md-label="$t('udpc.tabMonth')"
                                        @click="changeFilterRange('access', 'month')">chart2</md-tab>
                            </md-tabs>
                        </template>
                        <template slot="footer">
                            <range-slider :options="sliderOptions.access"
                                          @rangeChange="rangeForChartChanged('access', $event)"/>
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-3 py-2">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="info-icon-holder" @click="$refs['tooltip-access-apps'].showMe()">
                                <md-icon>help</md-icon>
                            </div>
                            <div class="card-header-text">{{ $t('udpc.accessApps') }}</div>
                        </template>
                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-access-apps-year" :md-label="$t('udpc.tabYear')"
                                        @click="changeFilterRange('access-apps', 'year')">chart1</md-tab>
                                <md-tab id="tab-access-apps-month" :md-label="$t('udpc.tabMonth')"
                                        @click="changeFilterRange('access-apps', 'month')">chart2</md-tab>
                            </md-tabs>
                        </template>
                        <template slot="footer">
                            <range-slider :options="sliderOptions['access-apps']"
                                          @rangeChange="rangeForChartChanged('access-apps', $event)"/>
                        </template>
                    </dashboard-tile>
                </div>
            </div>
        </div>

        <md-bottom-bar class="udpc-bottom-bar">
            <div class="container-fluid">
                <div class="row">
                    <div class="order-sm-0 order-12 col-sm-6 align-self-end links-bottom-left">
                        <a href="">Datenschutz</a>
                        <a href="">Impressum</a>
                    </div>
                    <div class="col-sm-6 align-self-center images-bottom-right">
                        <div class="row">
                            <div class="offset-sm-4 col-sm-4 col-6 image-col">
                                <a href="#" target="_blank">
                                    <img src="../assets/images/nl-lgv-logo@2x.png" alt="LGV">
                                </a>
                            </div>
                            <div class="col-sm-4 col-6 image-col">
                                <a href="#" target="_blank" onclick="window.open('http://www.urbandataplatform.hamburg/', '_blank').focus();">
                                    <img src="../assets/images/UrbanDataPlatform_RGB@2x.png" alt="UDP">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-bottom-bar>

        <info-overlay v-bind:content="$t('udpc.tooltipDidYouKnow')" ref="tooltip-did-you-know"/>
        <info-overlay v-bind:content="$t('udpc.tooltipLatestDataSets')" ref="tooltip-latest-datasets"/>
        <info-overlay v-bind:content="$t('udpc.tooltipSensors')" ref="tooltip-sensors"/>
        <info-overlay v-bind:content="$t('udpc.tooltipVisitorsToday')" ref="tooltip-visitors-today"/>
        <info-overlay v-bind:content="$t('udpc.tooltipDatasetsBy')" ref="tooltip-datasets-by"/>
        <info-overlay v-bind:content="$t('udpc.tooltipCountTotal')" ref="tooltip-count-total"/>
        <info-overlay v-bind:content="$t('udpc.tooltipMap')" ref="tooltip-map"/>
        <info-overlay v-bind:content="$t('udpc.tooltipTopX')" ref="tooltip-top-x"/>
        <info-overlay v-bind:content="$t('udpc.tooltipDownloads')" ref="tooltip-downloads"/>
        <info-overlay v-bind:content="$t('udpc.tooltipAccessData')" ref="tooltip-access-data"/>
        <info-overlay v-bind:content="$t('udpc.tooltipAccessApps')" ref="tooltip-access-apps"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import udpcStore from '../store/udpc.module';
import { messages } from '@/messages/messages.udpc.module';
import AbstractDashboard from "@/views/AbstractDashboard.vue";
import DashboardTile from '../components/DashboardTile.vue';
import DidYouKnow from '../components/DidYouKnow.vue';
import MultiSelect from '../components/MultiSelect.vue';
import SnackBar from '../components/SnackBar.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import InfoOverlay from '../components/InfoOverlay.vue';
import RangeSlider from '../components/RangeSlider.vue';
import BarChart from "@/components/charts/chartjs/BarChart.vue";
import BarChartHorizontal from "@/components/charts/chartjs/BarChartHorizontal.vue";
import TreeMapChart from "../components/charts/chartjs/TreeMap.vue";

@Component({
    components: {
        BarChartHorizontal,
        DashboardTile,
        DidYouKnow,
        MultiSelect,
        RangeSlider,
        ConfirmDialog,
        InfoOverlay,
        BarChart,
        TreeMapChart
    }
})
export default class UDPC extends AbstractDashboard {
    countTotalWithPlans = false;
    countGroupedWithPlans = false;
    agreeDialogActive = false;

    sliderOptions: { [key: string]: DateRangeSliderOptions } = {
        downloads: {
            unit: 'year',
            min: '2019',
            max: `${new Date().getFullYear()}`
        },
        access: {
            unit: 'year',
            min: '2019',
            max: `${new Date().getFullYear()}`
        },
        'access-apps': {
            unit: 'year',
            min: '2019',
            max: `${new Date().getFullYear()}`
        }
    };

    didYouKnow = [
        'Fact 1',
        'Fact 2',
        'Fact 3',
        'Fact 4',
        'Fact 5'
    ];
    dataSets = [
        'New Dataset 1',
        'New Dataset 2',
        'New Dataset 3',
        'New Dataset 4',
        'New Dataset 5'
    ];

    chartData: { [key: string]: Chart.ChartData } = {
        dataSetsByTopic: {},
        dataSetsTopX: {}
    };

    // TODO: 1. make this more generic - 2. font-color und border-color direkt aus der scss laden?
    // TODO: Alle grid lines auch color: '#707070'
    chartOptions: { [key: string]: Chart.ChartOptions } = {
        dataSetsByTopic: {
            maintainAspectRatio: true,
            title: {
                display: false
            },
            legend: {
                display: false
            }
        },
        dataSetsTopX: {
            title: {
                display: false,
            },
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true,
                        fontColor: '#707070'
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    created() {
        this.$i18n.locale = 'de';
        this.$i18n.mergeLocaleMessage('en', messages.en);
        this.$i18n.mergeLocaleMessage('de', messages.de);
        this.$store.registerModule('udpc', udpcStore);

        this.$store.subscribe((mutation, state) => {
            if (!mutation.payload) {
                return;
            }
            const mutationData = mutation.payload[1];

            switch (mutation.type) {
                case 'SET_INITIAL_DATA':
                    break;
                case 'SET_FILTERED_DATA':
                    switch (mutation.payload[0]) {
                        case 'totalTopicDatasets':
                            mutationData.datasets[0]['key'] = 'doc_count';
                            mutationData.datasets[0]['groups'] = ['key'];
                            mutationData.datasets[0]['spacing'] = 2;
                            mutationData.datasets[0]['borderWidth'] = 0.5;
                            mutationData.datasets[0]['fontColor'] = 'black';
                            mutationData.datasets[0]['fontSize'] = 11;
                            this.chartData.dataSetsByTopic = mutationData;
                            break;
                        case 'totalDatasetsRangeTop':
                            mutationData.datasets[0]['label'] = 'Zugriffe';
                            mutationData.datasets[0]['backgroundColor'] = '#f87979';
                            this.chartData.dataSetsTopX = mutationData;
                            break;
                    }
                    break;
            }
        });
    }

    async mounted() {
        // Fetch initial dashboard data
        // await this.$store.dispatch('fetchTotalDatasets');
        // this.fetchTops('tab-top5-datasets');

        // Set initial filters
        await this.setFilters(['SOURCE', 'services_internet']);
        await this.setFilters(['YEAR', [2017, 2019]]);
        await this.setFilters(['MONTH', [1, 12]]);
    }

    async fetchTotalsByTopic(totalsTopic?: string) {
        switch (totalsTopic) {
            case 'tab-organisations':
                totalsTopic ='organization';
                break;
            case 'tab-topics':
                totalsTopic ='theme';
                break;
        }
        if (totalsTopic) {
            await this.$store.dispatch('fetchTotalsByTopic', totalsTopic);
        }
    }

    async fetchTops(topTopic?: string) {
        switch (topTopic) {
            case 'tab-top5-apps':
                topTopic ='apps';
                break;
            case 'tab-top5-downloads':
                topTopic ='downloads';
                break;
            case 'tab-top5-datasets':
                topTopic ='datasets';
                break;
        }
        if (topTopic) {
            await this.$store.dispatch('fetchTops', topTopic);
        }
    }

    getFilterOptions(dataset: string) {
        if (!this.dashboardData[dataset]) {
            return [];
        }
        // const accessor = this.meta[dataset].dataSeries.categoryAccessor;
        // return this.dashboardData[dataset].map(value => value[accessor]);
    }

    get dashboardData(): { [key: string]: Dataset } {
        return this.$store.getters.dashboardData;
    }

    get loading(): boolean {
        return this.$store.getters.loading;
    }

    setFilters(options: [string, any]) {
        this.$store.commit('SET_FILTERS', options);
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
            render: h => h(SnackBar, { props: options })
        });
    }

    changeFilterRange(sliderId: string, unit: 'year' | 'month') {
        const today = new Date();

        if (unit === 'month') {
            this.sliderOptions[sliderId] = {
                unit: 'month',
                min: '2019-07',
                max: `${today.getFullYear()}-${today.getMonth()}`
            };
        } else {
            this.sliderOptions[sliderId] = {
                unit: 'year',
                min: '2019',
                max: `${today.getFullYear()}`
            };
        }

        this.rangeForChartChanged(
            sliderId,
            [this.sliderOptions[sliderId].min, this.sliderOptions[sliderId].max]
        );
    }

    dialogResult(isPositive: boolean) {
        this.agreeDialogActive = false;
    }

    rangeForChartChanged(chartId: string, [min, max]: [string, string]) {
        const unit = this.sliderOptions[chartId].unit;
        console.log(`date ranged changed for ${chartId}:`, min, max);

        switch (unit) {
            case 'year':
                this.setFilters(['YEAR', [min, max]]);
                break;
            case 'month':
                this.setFilters(['MONTH', [min, max]]);
                break;
        }
    }

    addDataPoint() {
        let dataElement = {'val': 50, 'name': 'Fuz', 'val2': 1800};
        this.$store.commit('ADD_DASH_ELEMENT', {dataElement: dataElement});
    }

    changeLanguage(lang: string) {
        this.$i18n.locale = lang
    }
}
</script>

<style lang="scss">
@import '../assets/scss/udpc-dashboard/_fonts_colors.scss';

* {
    font-family: 'HamburgSans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

i {
    font-family: 'Material Icons';
}

.navbar {
    height: 90px;
    border-bottom: 30px solid $hamburg-blue-dark;
    margin-bottom: 10px;
    background-color: white;

    .navbar-brand {
        font-size: 26px;
        color: $hamburg-blue-dark;
        padding-left: 5px;
        padding-top: 8px;
    }

    .hh-bug {
        height: 18px;
        position: absolute;
        left: -120px;
        bottom: -8px;
    }

    .hh-logo {
        height: 43px;
    }
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

.dashboard-kpi {
    font-size: 30px;
    font-weight: bold;
    color: $hamburg-blue;
}

.dashboard-tabs {
    width: 100%;

    .md-button {
        border-top: 1px solid $hamburg-grey-inactive;
        border-right: 1px solid $hamburg-grey-inactive;
        border-bottom: 1px solid $hamburg-blue-dark50;
        height: 35px;
        font-size: 11px;
        text-transform: none;

        .md-button-content {
            font-size: 16px;
            color: $hamburg-blue;
            font-weight: bold;
        }
    }

    .md-button.md-active {
        border: 1px solid $hamburg-blue-dark50 !important;
        border-bottom: none !important;

        .md-button-content {
            color: $hamburg-red;
        }
    }

    .md-tab {
        padding: 5px 0;
    }

    .md-tabs-indicator {
        background-color: white !important;
    }
}

.dashboard-switch {
    margin: 0;

    .md-switch-container {
        background-color: white !important;
        border: 1px solid black;
        width: 36px;
        height: 19px;
        padding-left: 2px;
    }

    .md-switch-thumb {
        background-color: black !important;
        width: 15px;
        height: 15px;
    }

    .md-switch-label {
        font-size: 16px;
        margin-top: 3px;
        padding-left: 10px;
    }
}

.dashboard-switch.md-checked {
    .md-switch-container {
        background-color: $hamburg-blue !important;
        border: 1px solid $hamburg-blue;
    }

    .md-switch-thumb {
        background-color: white !important;
    }
}

.md-card {
    box-shadow: none !important;
    border: 1px solid $hamburg-blue-dark25;
    .md-card-header {
        .card-header-text {
            font-size: 24px !important;
        }
        .info-icon-holder .md-icon {
            color: $hamburg-blue;
        }
    }
    .md-card-content {
        font-size: 18px;
        text-align: left;

        span {
            position: relative;
            top: 10px;
        }

        .chart-holder {
            padding-top: 15px;
        }
    }
}

.udpc-bottom-bar {
    margin-top: 15px;
    background-color: $hamburg-grey-background !important;
    color: $hamburg-blue-dark;

    .row {
        min-height: 116px;
    }

    .links-bottom-left {
        text-align: left;
        padding-bottom: 10px;

        a {
            font-size: 16px;
            padding-right: 10px;
            color: $hamburg-blue;
        }
    }

    .images-bottom-right {
        //text-align: right;

        @media (min-width: 459px) {
            .image-col {
                padding-top: 24px;
                text-align: right;
            }
        }
        @media (max-width: 458px) {
            .image-col {
                text-align: center;
            }
            img {
                width: 180px;
                padding-top: 20px;
            }
        }



        a {
            padding-left: 10px;
            color: $hamburg-blue;

            img {
                max-height: 70px;
            }
        }

    }
}

.tooltip-inner {
    height: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
