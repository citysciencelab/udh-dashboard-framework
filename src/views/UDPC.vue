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

            <div class="row chart-row" style="height: 150px">
                <div class="col-sm-4">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="tool-tip-header" @click="openToolTip('tooltip-os-data')">
                                {{ $t('udpc.didYouKNow') }}
                            </div>
                            <md-icon class="info-icon" id="tooltip-os-data">help</md-icon>
                        </template>

                        <template slot="content">
                            <div class="card-content-container">
                                <did-you-know v-bind:items="didYouKnow" v-bind:interval="5000"></did-you-know>
                            </div>
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
            <div class="row chart-row" style="height: 420px">
                <div class="col-sm-4">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="tool-tip-header" @click="openToolTip('')">
                                {{ $t('udpc.countBy') }}
                            </div>
                            <md-icon class="info-icon">help</md-icon>
                        </template>

                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-topics" :md-label="$t('udpc.tabTopics')">
                                    Treechart1
                                </md-tab>
                                <md-tab id="tab-organisations" :md-label="$t('udpc.tabOrganisations')">
                                    Treechart2
                                </md-tab>
                            </md-tabs>
                        </template>

                        <template slot="footer">
                            <div class="notice">
                                <md-switch class="dashboard-switch">
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
                                {{ $t('udpc.includeDevPlan') }}
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
                            <master-portal-map v-bind:services="services" v-bind:portal="portal" />
                        </template>

                        <template slot="footer">
                        </template>
                    </dashboard-tile>
                </div>
            </div>
            <div class="row chart-row" style="height: 420px">
                <div class="col-sm-3">
                    <dashboard-tile data-background-color="blue" class="chart-card">
                        <template slot="header">
                            <div class="tool-tip-header" @click="openToolTip('top5')">
                                {{ $t('udpc.top5') }}
                            </div>
                            <md-icon class="info-icon" id="top5">help</md-icon>
                        </template>

                        <template slot="content">
                            <md-tabs class="dashboard-tabs">
                                <md-tab id="tab-top5-datasets" :md-label="$t('udpc.tabDatasets')">
                                    chart1
                                </md-tab>
                                <md-tab id="tab-top5-apps" :md-label="$t('udpc.tabApps')">
                                    chart2
                                </md-tab>
                                <md-tab id="tab-top5-downloads" :md-label="$t('udpc.tabDownloads')">
                                    chart3
                                </md-tab>
                            </md-tabs>
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
                                <md-tab id="tab-downloads-year" :md-label="$t('udpc.tabYear')">
                                    chart1
                                </md-tab>
                                <md-tab id="tab-downloads-month" :md-label="$t('udpc.tabMonth')">
                                    chart2
                                </md-tab>
                                <md-tab id="tab-downloads-day" :md-label="$t('udpc.tabDay')">
                                    chart3
                                </md-tab>
                            </md-tabs>
                        </template>

                        <template slot="footer">
                            <div class="notice">placeholder range slider</div>
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
                                <md-tab id="tab-access-topic-year" :md-label="$t('udpc.tabYear')">
                                    chart1
                                </md-tab>
                                <md-tab id="tab-access-topic-month" :md-label="$t('udpc.tabMonth')">
                                    chart2
                                </md-tab>
                                <md-tab id="tab-access-topic-day" :md-label="$t('udpc.tabDay')">
                                    chart3
                                </md-tab>
                            </md-tabs>
                        </template>

                        <template slot="footer">
                            <div class="notice">placeholder range slider</div>
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
                                        @click="changeFilterRange('dateRangeSlider', 'year')">
                                    chart1
                                </md-tab>
                                <md-tab id="tab-access-apps-month" :md-label="$t('udpc.tabMonth')"
                                        @click="changeFilterRange('dateRangeSlider', 'month')">
                                    chart2
                                </md-tab>
                                <md-tab id="tab-access-apps-day" :md-label="$t('udpc.tabDay')"
                                        @click="changeFilterRange('dateRangeSlider', 'day')">
                                    chart3
                                </md-tab>
                            </md-tabs>
                        </template>

                        <template slot="footer">
                            <div class="notice">
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
                        </template>
                    </dashboard-tile>
                </div>
            </div>



            <!--
                The two rows below can be deleted later
            -->
            <div class="row" style="margin: 100px">
                <div class="col-sm">
                    <md-button type="submit" class="md-primary md-raised" @click="testSnackBar">Open Snackbar</md-button>

                    <md-button type="submit" class="md-primary md-raised" @click="agreeDialogActive = true">Open Confirm Dialog</md-button>
                    <confirm-dialog title="Some title" content="Some important question" confirmText="Agree" cancelText="No way"
                                    @dialogResult="dialogResult" v-bind:active="this.agreeDialogActive"/>
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
            I am tooltip <a href="javascript:void(0)"
                            onclick="window.open('http://www.swoosh.com')">component</a> content!
        </b-tooltip>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DashboardTile from '../components/DashboardTile.vue';
import DidYouKnow from '../components/DidYouKnow.vue';
import MultiSelect from '../components/MultiSelect.vue';
import SnackBar from '../components/SnackBar.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import RangeSlider from '../components/RangeSlider.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import ScatterPlot from '../components/charts/ScatterPlot.vue';
import BarChart from '../components/charts/BarChart.vue';
import HBarChart from '../components/charts/HBarChart.vue';
import TreeMapChart from '../components/charts/TreeMapChart.vue';
import MasterPortalMap from '../components/MasterPortalMap.vue'
import udpcStore from '../store/udpc.module';
import AbstractDashboard from "@/views/AbstractDashboard.vue";
import { messages } from '@/messages/messages.udpc.module';

import portalConfig from "@/assets/map-config/portal.json";
import servicesConfig from "@/assets/map-config/services.json";

@Component({
    components: {
        DashboardTile,
        DidYouKnow,
        MultiSelect,
        RangeSlider,
        BarChart,
        LineChart,
        PieChart,
        ScatterPlot,
        HBarChart,
        TreeMapChart,
        ConfirmDialog,
        MasterPortalMap
    }
})
export default class UDPC extends AbstractDashboard {
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
    services: object = servicesConfig;
    portal: object = portalConfig;
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
        this.$i18n.mergeLocaleMessage('en', messages.en);
        this.$i18n.mergeLocaleMessage('de', messages.de);
        this.$store.registerModule('udpc', udpcStore);

        this.$store.subscribe((mutation, state) => {
            if (!mutation.payload) {
                return;
            }
            const id: string = mutation.payload[0];
            const data: Dataset = mutation.payload[1];

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
        // Fetch initial dashboard data
        await this.$store.dispatch('fetchTotalDatasets');
        await this.$store.dispatch('fetchTotalDatasetsRange');

        console.log(this.dashboardData);

        // Set initial filters
        await this.setFilters(['SOURCE', 'services_internet']);
        await this.setFilters(['YEAR', [2017, 2019]]);
        await this.setFilters(['MONTH', [1, 12]]);

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
        this.$store.commit('SET_FILTERS', options);
    }

    filter(chartID: string) {
        this.$store.dispatch('applyFilter', [chartID, this.meta[chartID].dataSeries.categoryAccessor]);
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
        this.filter('osStats');
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
        font-family: 'HamburgSans-Regular';
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

    .card-content-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    .md-card .md-card-header .info-icon {
        color: $hamburg-blue;
    }

    .dashboard-kpi {
        font-family: 'HamburgSans-Bold';
        font-size: 18px;
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

        .md-tabs-indicator {
            background-color: white !important;
        }
    }

    .dashboard-switch {
        margin: 0;
        .md-switch-container {
            background-color: white !important;
            border: 1px solid black;
            width: 45px;
            height: 23px;
        }
        .md-switch-thumb {
            background-color: black !important;
            width: 17px;
            height: 17px;
        }
        .md-switch-label {
            margin-top: 7px;
        }
    }

    .md-card {
        .md-card-header {
            .tool-tip-header {
                font-family: 'HamburgSans-Bold';
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
        }
        .md-card-actions {
            .notice {
                width: 100%;
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
