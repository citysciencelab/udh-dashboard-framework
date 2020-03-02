<template>
    <div>
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-end">
                    <md-menu md-direction="bottom-start">
                        <md-button md-menu-trigger>
                            <country-flag v-if="$i18n.locale === 'de'" @click="changeLanguage('de')"
                                          country="de" size="normal"/>
                            <country-flag v-if="$i18n.locale === 'en'" @click="changeLanguage('en')"
                                          country="gb" size="normal"/>
                        </md-button>
                        <md-menu-content>
                            <md-menu-item @click="changeLanguage('de')">
                                <country-flag country="de" size="normal"/>
                            </md-menu-item>
                            <md-menu-item @click="changeLanguage('en')">
                                <country-flag country="gb" size="normal"/>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </div>
            </div>
        </md-app-toolbar>

        <div class="container-fluid">
            <div class="row py-2">
                <div class="col-sm-4">
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
                <div class="col-sm-4">
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
                        <div class="col-sm-6">
                            <dashboard-tile data-background-color="blue" class="chart-card">
                                <template slot="header">
                                    <div class="info-icon-holder" @click="$refs['tooltip-sensors'].showMe()">
                                        <md-icon>help</md-icon>
                                    </div>
                                    <div class="card-header-text">{{ $t('udpc.sensors') }}</div>
                                </template>
                                <template slot="content" class="dashboard-kpi">
                                    <span>386</span>
                                </template>
                                <template slot="footer">
                                </template>
                            </dashboard-tile>
                        </div>
                        <div class="col-sm-6">
                            <dashboard-tile data-background-color="blue" class="chart-card">
                                <template slot="header">
                                    <div class="info-icon-holder" @click="$refs['tooltip-visitors-today'].showMe()">
                                        <md-icon>help</md-icon>
                                    </div>
                                    <div class="card-header-text">{{ $t('udpc.visitors') }}</div>
                                </template>
                                <template slot="content" class="dashboard-kpi">
                                    <span>893</span>
                                </template>
                                <template slot="footer">
                                </template>
                            </dashboard-tile>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row py-2">
                <div class="col-sm-4">
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
                            <tree-map-chart :chartData="chartData.dataSetsByTopic"
                                            :chartOptions="chartOptions.dataSetsByTopic"/>
                        </template>
                        <template slot="footer">
                            <div class="notice">
                                <md-switch v-model="countGroupedWithPlans" class="dashboard-switch">{{ $t('udpc.includeDevPlan') }}</md-switch>
                            </div>
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-4">
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
                <div class="col-sm-4">
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
            <div class="row py-2">
                <div class="col-sm-3">
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
                            <bar-chart-horizontal :chartData="chartData.dataSetsTopX"
                                                  :chartOptions="chartOptions.dataSetsTopX"/>
                        </template>
                        <template slot="footer">
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-3">
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
                <div class="col-sm-3">
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
                <div class="col-sm-3">
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
            <div class="row">
                <div class="col-sm-6">
                    <div class="element-holder links-bottom-left">
                        <a href="">Datenschutz</a>
                        <a href="">Impressum</a>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="element-holder images-bottom-right">
                        <a href="">IMAGE1</a>
                        <a href="">IMAGE2</a>
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

    // TODO: make this more generic
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
                        beginAtZero: true
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

.md-toolbar {
    padding: 0;
    border-bottom: none;

    .md-toolbar-row {
        background-color: $hamburg-blue-dark !important;
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
    font-size: 18px;
    font-weight: bold;
}

.dashboard-tabs {
    width: 100%;

    .md-button {
        border: 1px solid $hamburg-grey;
        height: 35px;
        font-size: 11px;

        .md-button-content {
            color: $hamburg-blue;
            font-weight: bold;
        }
    }

    .md-button.md-active {
        border: 1px solid $hamburg-grey-light;
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
    padding: 15px;
    margin: 0 !important;
    height: 100%;
    position: relative;

    .md-card-header {
        position: relative;
        padding: 0 !important;
        z-index: 2;

        .card-header-text {
            font-size: 15px;
            text-align: left;
            font-weight: bold;
        }

        .info-icon-holder .md-icon {
            float: right;
            font-size: 19px !important;
            width: 15px;
            height: 15px;
            min-width: 15px;
            color: $hamburg-blue;
        }
    }

    .md-card-content {
        padding: 15px 0 0 0;
    }

    .md-card-actions {
        .notice {
            width: 100%;
            text-align: left;
        }
    }
}

.udpc-bottom-bar {
    height: 120px;
    background-color: $hamburg-grey-background !important;
    position: relative;

    .row {
        width: 100%;
    }

    .element-holder {
        position: absolute;
        bottom: 15px;

        a {
            padding-left: 10px;
        }
    }

    .links-bottom-left {
        left: 35px;
    }

    .images-bottom-right {
        right: 35px;
    }
}

.tooltip-inner {
    height: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
