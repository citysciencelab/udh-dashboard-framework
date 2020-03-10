<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <span class="navbar-brand">Urban Data Platform</span>
        </nav>

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
                            <md-tabs class="dashboard-tabs" @md-changed="onSwitchTab">
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
                            <md-tabs class="dashboard-tabs" @md-changed="onSwitchTab">
                                <md-tab id="tab-datasets" :md-label="$t('udpc.tabDatasets')">&nbsp;</md-tab>
                                <md-tab id="tab-apps" :md-label="$t('udpc.tabApps')">&nbsp;</md-tab>
                                <md-tab id="tab-sensordatasets" :md-label="$t('udpc.tabSensors')">&nbsp;</md-tab>
                            </md-tabs>
                            <bar-chart :chartData="chartData.dataSetsByType"
                                       :chartOptions="chartOptions.dataSetsByType"/>
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
                            <md-tabs class="dashboard-tabs" @md-changed="onSwitchTab">
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
                            <md-tabs class="dashboard-tabs" @md-changed="onSwitchYearMonthTab">
                                <md-tab id="tab-downloads-year" :md-label="$t('udpc.tabYear')"></md-tab>
                                <md-tab id="tab-downloads-month" :md-label="$t('udpc.tabMonth')"></md-tab>
                            </md-tabs>
                            <bar-chart :chartData="chartData.totalDownloads"
                                       :chartOptions="chartOptions.totalDownloads"/>
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
                            <md-tabs class="dashboard-tabs" @md-changed="onSwitchYearMonthTab">
                                <md-tab id="tab-datasets-year" :md-label="$t('udpc.tabYear')"></md-tab>
                                <md-tab id="tab-datasets-month" :md-label="$t('udpc.tabMonth')"></md-tab>
                            </md-tabs>
                            <bar-chart :chartData="chartData.totalDatasets"
                                       :chartOptions="chartOptions.totalDatasets"/>
                        </template>
                        <template slot="footer">
                            <range-slider :options="sliderOptions.datasets"
                                          @rangeChange="rangeForChartChanged('datasets', $event)"/>
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
                            <md-tabs class="dashboard-tabs" @md-changed="onSwitchYearMonthTab">
                                <md-tab id="tab-apps-year" :md-label="$t('udpc.tabYear')"></md-tab>
                                <md-tab id="tab-apps-month" :md-label="$t('udpc.tabMonth')"></md-tab>
                            </md-tabs>
                            <bar-chart :chartData="chartData.totalApps"
                                       :chartOptions="chartOptions.totalApps"/>
                        </template>
                        <template slot="footer">
                            <range-slider :options="sliderOptions.apps"
                                          @rangeChange="rangeForChartChanged('apps', $event)"/>
                        </template>
                    </dashboard-tile>
                </div>
            </div>
        </div>

        <md-bottom-bar class="udpc-bottom-bar">
            <div class="container-fluid">
                <div class="row justify-content-between">
                    <div class="col-sm-6 py-2 align-self-end links-bottom-left">
                        <a href="">Datenschutz</a>
                        <a href="">Impressum</a>
                    </div>
                    <div class="col-sm-6 py-2 align-self-end images-bottom-right">
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
        DashboardTile,
        DidYouKnow,
        MultiSelect,
        RangeSlider,
        ConfirmDialog,
        InfoOverlay,
        BarChart,
        BarChartHorizontal,
        TreeMapChart
    }
})
export default class UDPC extends AbstractDashboard {
    countTotalWithPlans = false;
    countGroupedWithPlans = false;
    agreeDialogActive = false;

    sliderOptions: { [key: string]: DateRangeSliderOptions } = {};

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
        dataSetsTopX: {},
        dataSetsByType: {},
        totalDownloads: {},
        totalDatasets: {},
        totalApps: {}
    };

    barChartConfigDefaults = {
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
                    drawOnChartArea: false
                },
                ticks: {
                    display: true,
                    beginAtZero: true
                }
            }],
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }
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
        dataSetsByType: {
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
                        drawOnChartArea: false
                    },
                    ticks: {
                        display: true,
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
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
                        drawOnChartArea: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        totalDownloads: this.barChartConfigDefaults,
        totalDatasets: this.barChartConfigDefaults,
        totalApps: this.barChartConfigDefaults
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

            if (mutation.type ==='SET_FILTERED_DATA') {
                const mutationData = mutation.payload[1];

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
                    case 'totalDatasetsCount':
                        mutationData.datasets[0]['label'] = 'Anzahl';
                        mutationData.datasets[0]['backgroundColor'] = '#f87979';
                        this.chartData.dataSetsByType = mutationData;
                        break;
                    case 'totalDownloads':
                        mutationData.datasets[0].backgroundColor = '#7F97B0';
                        this.chartData.totalDownloads = mutationData;
                        break;
                    case 'totalDatasets':
                        mutationData.datasets[0].backgroundColor = '#196CB1';
                        this.chartData.totalDatasets = mutationData;
                        break;
                    case 'totalApps':
                        mutationData.datasets[0].backgroundColor = '#40648B';
                        this.chartData.totalApps = mutationData;
                }
            }
        });
    }

    onSwitchTab(tab: string) {
        switch (tab) {
            case 'tab-organisations':
                this.fetchTotalsByTopic('organization');
                break;
            case 'tab-topics':
                this.fetchTotalsByTopic('theme');
                break;
            case 'tab-datasets':
                this.fetchTotalsByType('datasets');
                break;
            case 'tab-apps':
                this.fetchTotalsByType('apps');
                break;
            case 'tab-sensordatasets':
                // this.fetchTotalsByType('sensors');
                break;
            case 'tab-top5-apps':
                this.fetchTops('apps');
                break;
            case 'tab-top5-downloads':
                this.fetchTops('downloads');
                break;
            case 'tab-top5-datasets':
                this.fetchTops('datasets');
                break;
        }
    }

    onSwitchYearMonthTab(tab: string) {
        const today = new Date();
        const currentYear = `${today.getFullYear()}`;
        const currentMonth = `${today.getFullYear()}-${today.getMonth() < 10 ? '0' : ''}${today.getMonth()}`;

        switch (tab) {
            case 'tab-downloads-year':
                this.sliderOptions.downloads = { min: '2014', max: currentYear, unit: 'year'};
                this.fetchDownloadsRange(this.sliderOptions.downloads);
                break;
            case 'tab-downloads-month':
                this.sliderOptions.downloads = { min: '2014-09', max: currentMonth, unit: 'month'};
                this.fetchDownloadsRange(this.sliderOptions.downloads);
                break;
            case 'tab-datasets-year':
                this.sliderOptions.datasets = { min: '2018', max: currentYear, unit: 'year'};
                this.fetchDatasetsRange(this.sliderOptions.datasets);
                break;
            case 'tab-datasets-month':
                this.sliderOptions.datasets = { min: '2018-11', max: currentMonth, unit: 'month'};
                this.fetchDatasetsRange(this.sliderOptions.datasets);
                break;
            case 'tab-apps-year':
                this.sliderOptions.apps = { min: '2019', max: currentYear, unit: 'year'};
                this.fetchAppsRange(this.sliderOptions.apps);
                break;
            case 'tab-apps-month':
                this.sliderOptions.apps = { min: '2019-01', max: currentMonth, unit: 'month'};
                this.fetchAppsRange(this.sliderOptions.apps);
        }
    }

    rangeForChartChanged(chartId: string, [min, max]: [string, string]) {
        const unit = this.sliderOptions[chartId].unit;

        switch (chartId) {
            case 'downloads':
                this.fetchDownloadsRange({ min, max, unit });
                break;
            case 'datasets':
                this.fetchDatasetsRange({ min, max, unit });
                break;
            case 'apps':
                this.fetchAppsRange({ min, max, unit });
        }
    }

    async fetchTotalsByTopic(topic: string) {
        await this.$store.dispatch('fetchTotalsByTopic', topic);
    }

    async fetchTotalsByType(type: string) {
        await this.$store.dispatch('fetchTotalsByType', type);
    }

    async fetchTops(topic: string ) {
        await this.$store.dispatch('fetchTops', topic);
    }

    async fetchDownloadsRange(params: { min: string, max: string, unit: string, category?: string, chartId?: string }) {
        params.chartId = 'totalDownloads';
        params.category = 'downloads';
        await this.$store.dispatch('fetchRangefulData', params);
    }

    async fetchDatasetsRange(params: { min: string, max: string, unit: string, category?: string, chartId?: string }) {
        params.chartId = 'totalDatasets';
        params.category = 'datasets';
        await this.$store.dispatch('fetchRangefulData', params);
    }

    async fetchAppsRange(params: { min: string, max: string, unit: string, category?: string, chartId?: string }) {
        params.chartId = 'totalApps';
        params.category = 'apps';
        await this.$store.dispatch('fetchRangefulData', params);
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

    dialogResult(isPositive: boolean) {
        this.agreeDialogActive = false;
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
        font-size: 16px;
        color: $hamburg-blue-dark;
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
        text-transform: none;

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
    .md-card-header {
        .info-icon-holder .md-icon {
            color: $hamburg-blue;
        }
    }
}

.udpc-bottom-bar {
    margin-top: 15px;
    background-color: $hamburg-grey-background !important;
    color: $hamburg-blue-dark;

    .row {
        flex-wrap: nowrap;
    }

    .links-bottom-left {
        text-align: left;

        a {
            padding-right: 10px;
            color: $hamburg-blue;
        }
    }

    .images-bottom-right {
        text-align: right;

        a {
            padding-left: 10px;
            color: $hamburg-blue;
        }
    }
}

.tooltip-inner {
    height: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
