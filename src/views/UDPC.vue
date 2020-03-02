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

        <div class="container">
            <div class="row main-row" style="height: 150px">
                <div class="col-sm-4">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="tool-tip-header" @click="openToolTip('tooltip-os-data')">
                                {{ $t('udpc.didYouKNow') }}
                            </div>
                            <md-icon class="info-icon" id="tooltip-os-data">help</md-icon>
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
                            <div class="tool-tip-header" @click="openToolTip('')">
                                {{ $t('udpc.newDatassets') }}
                            </div>
                            <md-icon class="info-icon">help</md-icon>
                        </template>

                        <template slot="content">
                            <did-you-know v-bind:items="dataSets" v-bind:interval="5000"></did-you-know>
                        </template>

                        <template slot="footer">
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-4">
                    <div class="row" style="padding: 0 !important; height: 100%;">
                        <div class="col-sm-6">
                            <dashboard-tile data-background-color="blue" class="chart-card">
                                <template slot="header">
                                    <div class="tool-tip-header" @click="openToolTip('')">
                                        {{ $t('udpc.sensors') }}
                                    </div>
                                    <md-icon class="info-icon">help</md-icon>
                                </template>

                                <template slot="content" class="dashboard-kpi">
                                    386
                                </template>

                                <template slot="footer">
                                </template>
                            </dashboard-tile>
                        </div>
                        <div class="col-sm-6">
                            <dashboard-tile data-background-color="blue" class="chart-card">
                                <template slot="header">
                                    <div class="tool-tip-header" @click="openToolTip('')">
                                        {{ $t('udpc.visitors') }}
                                    </div>
                                    <md-icon class="info-icon">help</md-icon>
                                </template>

                                <template slot="content" class="dashboard-kpi">
                                    893
                                </template>

                                <template slot="footer">
                                </template>
                            </dashboard-tile>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row main-row" style="height: 420px">
                <div class="col-sm-4">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="tool-tip-header" @click="openToolTip('')">
                                {{ $t('udpc.countBy') }}
                            </div>
                            <md-icon class="info-icon">help</md-icon>
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
                                <md-switch v-model="countGroupedWithPlans" class="dashboard-switch">
                                    {{ $t('udpc.includeDevPlan') }}
                                </md-switch>
                            </div>
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-4">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="tool-tip-header" @click="openToolTip('')">
                                {{ $t('udpc.countTotal') }}
                            </div>
                            <md-icon class="info-icon">help</md-icon>
                        </template>

                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-datasets" :md-label="$t('udpc.tabDatasets')">
                                    chart1
                                </md-tab>
                                <md-tab id="tab-apps" :md-label="$t('udpc.tabApps')">
                                    chart2
                                </md-tab>
                                <md-tab id="tab-sensordatasets" :md-label="$t('udpc.tabSensors')">
                                    chart3
                                </md-tab>
                            </md-tabs>
                        </template>

                        <template slot="footer">
                            <div class="notice">
                                <md-switch v-model="countTotalWithPlans" class="dashboard-switch">
                                    {{ $t('udpc.includeDevPlan') }}
                                </md-switch>
                            </div>
                        </template>
                    </dashboard-tile>
                </div>
                <div class="col-sm-4">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="tool-tip-header" @click="openToolTip('')">
                                {{ $t('udpc.map') }}
                            </div>
                            <md-icon class="info-icon">help</md-icon>
                        </template>

                        <template slot="content">
                            MasterportalAPI
                        </template>

                        <template slot="footer">
                        </template>
                    </dashboard-tile>
                </div>
            </div>
            <div class="row main-row" style="height: 420px">
                <div class="col-sm-3">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="tool-tip-header" @click="openToolTip('top5')">
                                {{ $t('udpc.top5') }}
                            </div>
                            <md-icon class="info-icon" id="top5">help</md-icon>
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
                            <div class="tool-tip-header" @click="openToolTip('download')">
                                {{ $t('udpc.download') }}
                            </div>
                            <md-icon class="info-icon" id="download">help</md-icon>
                        </template>

                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-downloads-year" :md-label="$t('udpc.tabYear')"
                                        @click="changeFilterRange('downloads', 'year')">
                                    chart1
                                </md-tab>
                                <md-tab id="tab-downloads-month" :md-label="$t('udpc.tabMonth')"
                                        @click="changeFilterRange('downloads', 'month')">
                                    chart2
                                </md-tab>
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
                            <div class="tool-tip-header" @click="openToolTip('access_topicdata')">
                                {{ $t('udpc.accessTopicData') }}
                            </div>
                            <md-icon class="info-icon" id="access_topicdata">help</md-icon>
                        </template>

                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-access-topic-year" :md-label="$t('udpc.tabYear')"
                                        @click="changeFilterRange('access', 'year')">
                                    chart1
                                </md-tab>
                                <md-tab id="tab-access-topic-month" :md-label="$t('udpc.tabMonth')"
                                        @click="changeFilterRange('access', 'month')">
                                    chart2
                                </md-tab>
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
                            <div class="tool-tip-header" @click="openToolTip('access_apps')">
                                {{ $t('udpc.accessApps') }}
                            </div>
                            <md-icon class="info-icon" id="access_apps">help</md-icon>
                        </template>

                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-access-apps-year" :md-label="$t('udpc.tabYear')"
                                        @click="changeFilterRange('access-apps', 'year')">
                                    chart1
                                </md-tab>
                                <md-tab id="tab-access-apps-month" :md-label="$t('udpc.tabMonth')"
                                        @click="changeFilterRange('access-apps', 'month')">
                                    chart2
                                </md-tab>
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

        <!--Tooltips-->
        <b-tooltip target="tooltip-os-data" ref="tooltip-os-data" triggers="hover" custom-class="udpc-tooltip">
            I am tooltip component content!
        </b-tooltip>
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

    #page {
        font-family: 'HamburgSans';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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

    .md-card .md-card-header .info-icon {
        color: $hamburg-blue;
    }

    .dashboard-kpi {
        font-family: 'HamburgSans';
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

    .md-tooltip, .md-snackbar {
        font-family: 'HamburgSans' !important;
    }

    .md-card {
        .md-card-header {
            .tool-tip-header {
                font-family: 'HamburgSans';
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                font-weight: bold;
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
</style>
