<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <img class="hh-logo"
           src="../assets/images/_HH_Logo_2016.svg"
           alt="Hamburg Logo">
      <img class="hh-bug"
           src="../assets/images/Hamburg_Bug_NEU_RGB.png"
           alt="Hamburg Bug">
      <span class="navbar-brand">Urban Data Platform Cockpit</span>
    </nav>

    <div class="container-fluid">
      <div class="row ">
        <div class="col-lg-4 col-md-6 py-2">
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-did-you-know'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.didYouKNow') }}
              </div>
            </template>
            <template slot="content">
              <did-you-know :data="didYouKnow"
                            :interval="5000" />
            </template>
            <template slot="footer" />
          </dashboard-tile>
        </div>
        <div class="col-lg-4 col-md-6 py-2">
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-latest-datasets'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.newDatassets') }}
              </div>
            </template>
            <template slot="content">
              <did-you-know :data="dataSets"
                            :interval="7500"
                            @show-in-map="showDataInMap" />
            </template>
            <template slot="footer" />
          </dashboard-tile>
        </div>
        <div class="col-lg-4 col-md-12">
          <div class="row">
            <div class="col-lg-6 col-6 py-2">
              <dashboard-tile data-background-color="blue"
                              class="chart-card">
                <template slot="header">
                  <div class="info-icon-holder"
                       @click="$refs['tooltip-sensors'].show()">
                    <md-icon>help</md-icon>
                  </div>
                  <div class="card-header-text">
                    {{ $t('udpc.sensors') }}
                  </div>
                </template>
                <template slot="content">
                  <span class="dashboard-kpi">
                    386
                  </span>
                </template>
                <template slot="footer" />
              </dashboard-tile>
            </div>
            <div class="col-lg-6 col-6 py-2">
              <dashboard-tile data-background-color="blue"
                              class="chart-card">
                <template slot="header">
                  <div class="info-icon-holder"
                       @click="$refs['tooltip-visitors-today'].show()">
                    <md-icon>help</md-icon>
                  </div>
                  <div class="card-header-text">
                    {{ $t('udpc.visitors') }}
                  </div>
                </template>
                <template slot="content">
                  <span class="dashboard-kpi">
                    893
                  </span>
                </template>
                <template slot="footer" />
              </dashboard-tile>
            </div>
          </div>
        </div>
      </div>
      <div class="row ">
        <div class="col-lg-4 col-md-6  py-2">
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-datasets-by'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.countBy') }}
              </div>
            </template>
            <template slot="content">
              <md-tabs class="dashboard-tabs"
                       @md-changed="onSwitchTab">
                <md-tab id="tab-theme"
                        :md-label="$t('udpc.tabTopics')" />
                <md-tab id="tab-organization"
                        :md-label="$t('udpc.tabOrganisations')" />
              </md-tabs>
              <div class="chart-holder">
                <tree-map-chart :chart-data="chartData.dataSetsByTopic"
                                :chart-options="chartOptions.dataSetsByTopic"
                                @click="onTopicSelect($event)" />
              </div>
            </template>
            <template slot="footer">
              <div class="notice">
                <md-switch v-model="countGroupedWithPlans"
                           class="dashboard-switch">
                  {{ $t('udpc.includeDevPlan') }}
                </md-switch>
              </div>
            </template>
          </dashboard-tile>
        </div>
        <div class="col-lg-4 col-md-6 py-2">
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-count-total'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.countTotal') }}
              </div>
            </template>
            <template slot="content">
              <md-tabs class="dashboard-tabs"
                       @md-changed="onSwitchTab">
                <md-tab id="tab-datasets"
                        :md-label="$t('udpc.tabDatasets')">
                  &nbsp;
                </md-tab>
                <md-tab id="tab-apps"
                        :md-label="$t('udpc.tabApps')">
                  &nbsp;
                </md-tab>
                <md-tab id="tab-sensordatasets"
                        :md-label="$t('udpc.tabSensors')">
                  &nbsp;
                </md-tab>
              </md-tabs>
              <div v-if="globalThemeFilter.isset" class="filter-notice">
                Zeige nur Werte für Daten aus dem Bereich "{{ globalThemeFilter.topic }}"
              </div>
              <div v-if="globalOrgFilter.isset" class="filter-notice">
                Zeige nur Werte für Daten von "{{ globalOrgFilter.topic }}"
              </div>
              <div class="chart-holder">
                <bar-chart :chart-data="chartData.dataSetsByType"
                           :chart-options="chartOptions.dataSetsByType" />
              </div>
            </template>
            <template slot="footer">
              <div class="notice">
                <md-switch v-model="countTotalWithPlans"
                           class="dashboard-switch">
                  {{ $t('udpc.includeDevPlan') }}
                </md-switch>
              </div>
            </template>
          </dashboard-tile>
        </div>
        <div class="col-lg-4 col-md-12 py-2">
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-map'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.map') }}
              </div>
            </template>
            <template slot="content">
              <master-portal-map :services="mapData.services"
                                 :portal="mapData.portal"
                                 :md_id="mapData.md_id" />
            </template>
            <template slot="footer" />
          </dashboard-tile>
        </div>
      </div>
      <div class="row ">
        <div class="col-lg-3 col-md-6 py-2">
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-top-x'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.top5') }}
              </div>
            </template>
            <template slot="content">
              <md-tabs class="dashboard-tabs"
                       @md-changed="onSwitchTab">
                <md-tab id="tab-top5-datasets"
                        :md-label="$t('udpc.tabDatasets')">
                  &nbsp;
                </md-tab>
                <md-tab id="tab-top5-apps"
                        :md-label="$t('udpc.tabApps')">
                  &nbsp;
                </md-tab>
                <md-tab id="tab-top5-downloads"
                        :md-label="$t('udpc.tabDownloads')">
                  &nbsp;
                </md-tab>
              </md-tabs>
              <div class="chart-holder">
                <bar-chart-horizontal :chart-data="chartData.dataSetsTopX"
                                      :chart-options="chartOptions.dataSetsTopX" />
              </div>
            </template>
            <template slot="footer" />
          </dashboard-tile>
        </div>
        <div class="col-lg-3 col-md-6 py-2">
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-downloads'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.download') }}
              </div>
            </template>
            <template slot="content">
              <md-tabs class="dashboard-tabs"
                       @md-changed="onSwitchYearMonthTab">
                <md-tab id="tab-downloads-year"
                        :md-label="$t('udpc.tabYear')" />
                <md-tab id="tab-downloads-month"
                        :md-label="$t('udpc.tabMonth')" />
              </md-tabs>
              <div v-if="globalThemeFilter.isset" class="filter-notice">
                Zeige nur Werte für Daten aus dem Bereich "{{ globalThemeFilter.topic }}"
              </div>
              <div v-if="globalOrgFilter.isset" class="filter-notice">
                Zeige nur Werte für Daten von "{{ globalOrgFilter.topic }}"
              </div>
              <div class="chart-holder">
                <bar-chart :chart-data="chartData.totalDownloads"
                           :chart-options="chartOptions.totalDownloads" />
              </div>
            </template>
            <template slot="footer">
              <span class="left">{{ $t('udpc.sliderEarlier') }}</span>
              <range-slider :options="sliderOptions.downloads"
                            @rangeChange="rangeForChartChanged('downloads', $event)" />
              <span class="right">{{ $t('udpc.sliderLater') }}</span>
            </template>
          </dashboard-tile>
        </div>
        <div class="col-lg-3 col-md-6 py-2">
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-access-data'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.accessTopicData') }}
              </div>
            </template>
            <template slot="content">
              <md-tabs class="dashboard-tabs"
                       @md-changed="onSwitchYearMonthTab">
                <md-tab id="tab-datasets-year"
                        :md-label="$t('udpc.tabYear')" />
                <md-tab id="tab-datasets-month"
                        :md-label="$t('udpc.tabMonth')" />
              </md-tabs>
              <div v-if="globalThemeFilter.isset" class="filter-notice">
                Zeige nur Werte für Daten aus dem Bereich "{{ globalThemeFilter.topic }}"
              </div>
              <div v-if="globalOrgFilter.isset" class="filter-notice">
                Zeige nur Werte für Daten von "{{ globalOrgFilter.topic }}"
              </div>
              <div class="chart-holder">
                <bar-chart :chart-data="chartData.totalDatasets"
                           :chart-options="chartOptions.totalDatasets" />
              </div>
            </template>
            <template slot="footer">
              <span class="left">{{ $t('udpc.sliderEarlier') }}</span>
              <range-slider :options="sliderOptions.datasets"
                            @rangeChange="rangeForChartChanged('datasets', $event)" />
              <span class="right">{{ $t('udpc.sliderLater') }}</span>
            </template>
          </dashboard-tile>
        </div>
        <div class="col-lg-3 col-md-6 py-2">
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-access-apps'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.accessApps') }}
              </div>
            </template>
            <template slot="content">
              <md-tabs class="dashboard-tabs"
                       @md-changed="onSwitchYearMonthTab">
                <md-tab id="tab-apps-year"
                        :md-label="$t('udpc.tabYear')" />
                <md-tab id="tab-apps-month"
                        :md-label="$t('udpc.tabMonth')" />
              </md-tabs>
              <div v-if="globalThemeFilter.isset" class="filter-notice">
                Zeige nur Werte für Daten aus dem Bereich "{{ globalThemeFilter.topic }}"
              </div>
              <div v-if="globalOrgFilter.isset" class="filter-notice">
                Zeige nur Werte für Daten von "{{ globalOrgFilter.topic }}"
              </div>
              <div class="chart-holder">
                <bar-chart :chart-data="chartData.totalApps"
                           :chart-options="chartOptions.totalApps" />
              </div>
            </template>
            <template slot="footer">
              <span class="left">{{ $t('udpc.sliderEarlier') }}</span>
              <range-slider :options="sliderOptions.apps"
                            @rangeChange="rangeForChartChanged('apps', $event)" />
              <span class="right">{{ $t('udpc.sliderLater') }}</span>
            </template>
          </dashboard-tile>
        </div>
      </div>
    </div>

    <md-bottom-bar class="udpc-bottom-bar">
      <div class="container-fluid">
        <div class="row">
          <div class="order-sm-0 order-12 col-lg-6 col-md-6 align-self-end links-bottom-left">
            <a href="">Datenschutz</a>
            <a href="">Impressum</a>
          </div>
          <div class="col-lg-6 col-md-6 align-self-center images-bottom-right">
            <div class="row">
              <div class="offset-lg-6 col-lg-3 col-6 image-col">
                <a href="#"
                   target="_blank">
                  <img src="../assets/images/nl-lgv-logo@2x.png"
                       alt="LGV">
                </a>
              </div>
              <div class="col-lg-3 col-6 image-col">
                <a href="http://www.urbandataplatform.hamburg/"
                   target="_blank">
                  <img src="../assets/images/UrbanDataPlatform_RGB@2x.png"
                       alt="UDP">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </md-bottom-bar>

    <info-overlay ref="tooltip-did-you-know"
                  :content="$t('udpc.tooltipDidYouKnow')"
                  :header="'Did your whaaaat'"
                  :footer="'Footer zeugs'" />
    <info-overlay ref="tooltip-latest-datasets"
                  :content="$t('udpc.tooltipLatestDataSets')" />
    <info-overlay ref="tooltip-sensors"
                  :content="$t('udpc.tooltipSensors')" />
    <info-overlay ref="tooltip-visitors-today"
                  :content="$t('udpc.tooltipVisitorsToday')" />
    <info-overlay ref="tooltip-datasets-by"
                  :content="$t('udpc.tooltipDatasetsBy')" />
    <info-overlay ref="tooltip-count-total"
                  :content="$t('udpc.tooltipCountTotal')" />
    <info-overlay ref="tooltip-map"
                  :content="$t('udpc.tooltipMap')" />
    <info-overlay ref="tooltip-top-x"
                  :content="$t('udpc.tooltipTopX')" />
    <info-overlay ref="tooltip-downloads"
                  :content="$t('udpc.tooltipDownloads')" />
    <info-overlay ref="tooltip-access-data"
                  :content="$t('udpc.tooltipAccessData')" />
    <info-overlay ref="tooltip-access-apps"
                  :content="$t('udpc.tooltipAccessApps')" />
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
import Color from "color";
import MasterPortalMap from '../components/MasterPortalMap.vue'
import portalConfig from "@/assets/map-config/portal.json";
import servicesConfig from "@/assets/map-config/services.json";

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
        TreeMapChart,
        MasterPortalMap
    }
})
export default class UDPC extends AbstractDashboard {
    countTotalWithPlans = false;
    countGroupedWithPlans = false;
    agreeDialogActive = false;

    mapData: MapData = {
        services: servicesConfig,
        portal: portalConfig,
        md_id: ''
    };

    sliderOptions: { [key: string]: DateRangeSliderOptions } = {};

    didYouKnow: DidYouKnowData = {
        items: [
            { label: 'Fact 1', link: '' },
            { label: 'Fact 2', link: '' },
            { label: 'Fact 3', link: '' },
            { label: 'Fact 4', link: '' },
            { label: 'Fact 5', link: '' },
        ],
        action: null
    };
    dataSets: DidYouKnowData = {
        items: [],
        action: 'map'
    };

    chartData: { [key: string]: Chart.ChartData } = {
        dataSetsByTopic: {},
        dataSetsTopX: {},
        dataSetsByType: {},
        totalDownloads: {},
        totalDatasets: {},
        totalApps: {}
    };

    activeTabs: { [key: string]: string } = {
        dataSetsByTopic: '',
        dataSetsByType: '',
        totalDownloads: '',
        totalDatasets: '',
        totalApps: ''
    };

    globalThemeFilter: { isset: boolean, topic?: string } = { isset: false };
    globalOrgFilter: { isset: boolean, topic?: string } = { isset: false };

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
                        beginAtZero: true,
                        fontColor: '#707070'
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

        this.$store.subscribe((mutation) => {
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
                        mutationData.datasets[0]['fontColor'] = 'white';
                        mutationData.datasets[0]['fontSize'] = 11;
                        mutationData.datasets[0]['backgroundColor'] = function(ctx: CTX) {
                            let colorMap = [
                                "#003063",  "#9FB1C4", "#40648B",
                                "#7F97B0", "#7FADD4", "#BFD6E9",
                                "#2B88D8", "#005CA9", "#BFD6E9",
                                "#FFF4CE", "#DFF6DD",
                            ];

                            let index:number = ctx.dataIndex ? ctx.dataIndex : 0;
                            if (index > colorMap.length - 1) {
                                let colorIdx = index % colorMap.length;
                                let quotient = Math.floor(index/colorMap.length);
                                if (quotient > 9) quotient = 9;
                                return Color(colorMap[colorIdx]).alpha(1 - (0.1 * quotient));
                            } else {
                                return colorMap[index];
                            }
                        };
                        this.chartData.dataSetsByTopic = mutationData;
                        break;
                    case 'totalDatasetsRangeTop':
                        mutationData.datasets[0]['label'] = 'Zugriffe';
                        mutationData.datasets[0]['backgroundColor'] = '#196CB1';
                        this.chartData.dataSetsTopX = mutationData;
                        this.dataSets = {
                            items: mutationData.labels
                                .map((datum: any, i: number) => ({ label: datum, link: mutationData.datasets[0].md_id[i]}))
                                .filter((d: any, i: number) => i > 4 && i < 9), // demo: filter for sensible sets
                            action: 'map'
                        }
                        break;
                    case 'totalDatasetsCount':
                        mutationData.datasets[0]['label'] = 'Anzahl';
                        mutationData.datasets[0]['backgroundColor'] = '#003063';
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
            case 'tab-theme':
                this.activeTabs.dataSetsByTopic = tab;
                this.globalOrgFilter.isset = false;
                this.fetchTotalsByTopic('theme');
                break;
            case 'tab-organization':
                this.activeTabs.dataSetsByTopic = tab;
                this.globalThemeFilter.isset = false;
                this.fetchTotalsByTopic('organization');
                break;
            case 'tab-datasets':
                this.activeTabs.dataSetsByType = tab;
                this.fetchTotalsByType('datasets');
                break;
            case 'tab-apps':
                this.activeTabs.dataSetsByType = tab;
                this.fetchTotalsByType('apps');
                break;
            case 'tab-sensordatasets':
                this.activeTabs.dataSetsByType = tab;
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
                this.activeTabs.totalDownloads = tab;
                this.sliderOptions.downloads = { min: '2014', max: currentYear, unit: 'year', isShowMarks: false};
                this.fetchDownloadsRange();
                break;
            case 'tab-downloads-month':
                this.activeTabs.totalDownloads = tab;
                this.sliderOptions.downloads = { min: '2014-09', max: currentMonth, unit: 'month', isShowMarks: false};
                this.fetchDownloadsRange();
                break;
            case 'tab-datasets-year':
                this.activeTabs.totalDatasets = tab;
                this.sliderOptions.datasets = { min: '2018', max: currentYear, unit: 'year', isShowMarks: false};
                this.fetchDatasetsRange();
                break;
            case 'tab-datasets-month':
                this.activeTabs.totalDatasets = tab;
                this.sliderOptions.datasets = { min: '2018-11', max: currentMonth, unit: 'month', isShowMarks: false};
                this.fetchDatasetsRange();
                break;
            case 'tab-apps-year':
                this.activeTabs.totalApps = tab;
                this.sliderOptions.apps = { min: '2019', max: currentYear, unit: 'year', isShowMarks: false};
                this.fetchAppsRange();
                break;
            case 'tab-apps-month':
                this.activeTabs.totalApps = tab;
                this.sliderOptions.apps = { min: '2019-01', max: currentMonth, unit: 'month', isShowMarks: false};
                this.fetchAppsRange();
        }
    }

    rangeForChartChanged(chartId: string, [min, max]: [string, string]) {
        this.sliderOptions[chartId].min = min;
        this.sliderOptions[chartId].max = max;

        switch (chartId) {
            case 'downloads':
                this.fetchDownloadsRange();
                break;
            case 'datasets':
                this.fetchDatasetsRange();
                break;
            case 'apps':
                this.fetchAppsRange();
        }
    }

    async fetchTotalsByTopic(topic: string) {
        await this.$store.dispatch('fetchTotalsByTopic', topic);
    }

    async fetchTotalsByType(type: string, theme?: string, org?: string) {
        await this.$store.dispatch('fetchTotalsByType', { totalsType: type, theme, org });
    }

    async fetchTops(topic: string ) {
        await this.$store.dispatch('fetchTops', topic);
    }

    async fetchDownloadsRange(theme?: string, org?: string) {
        const params = {
            chartId: 'totalDownloads',
            category: 'downloads',
            min: this.sliderOptions.downloads.min,
            max: this.sliderOptions.downloads.max,
            unit: this.sliderOptions.downloads.unit,
            theme: theme,
            org: org
        };
        await this.$store.dispatch('fetchRangefulData', params);
    }

    async fetchDatasetsRange(theme?: string, org?: string) {
        const params = {
            chartId: 'totalDatasets',
            category: 'datasets',
            min: this.sliderOptions.datasets.min,
            max: this.sliderOptions.datasets.max,
            unit: this.sliderOptions.datasets.unit,
            theme: theme,
            org: org
        };
        await this.$store.dispatch('fetchRangefulData', params);
    }

    async fetchAppsRange(theme?: string, org?: string) {
        const params = {
            chartId: 'totalApps',
            category: 'apps',
            min: this.sliderOptions.apps.min,
            max: this.sliderOptions.apps.max,
            unit: this.sliderOptions.apps.unit,
            theme: theme,
            org: org
        };
        await this.$store.dispatch('fetchRangefulData', params);
    }

    onTopicSelect(event: { _datasetIndex: number, _index: number }[]) {
      if (event.length && this.chartData.dataSetsByTopic.datasets) {
        const dataset = this.chartData.dataSetsByTopic.datasets[event[0]._datasetIndex] as any;
        const datum = dataset.tree[event[0]._index];

        // Set the filter value
        let filter = this.activeTabs.dataSetsByTopic === 'tab-theme' ? this.globalThemeFilter : this.globalOrgFilter;
        const unset = filter.isset && filter.topic === datum.key;
        filter.isset = !unset;
        filter.topic = datum.key;

        // Let the filter take effect on other charts
        const totalsType = this.activeTabs.dataSetsByType === 'tab-datasets' ? 'datasets' :
          this.activeTabs.dataSetsByType === 'tab-apps' ? 'apps' : 'sensordatasets';
        const theme = this.globalThemeFilter.isset ? this.globalThemeFilter.topic : '';
        const org = this.globalOrgFilter.isset ? this.globalOrgFilter.topic: '';

        this.fetchTotalsByType(totalsType, theme, org);
        this.fetchDownloadsRange(theme, org);
        this.fetchDatasetsRange(theme, org);
        this.fetchAppsRange(theme, org);
      }
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

    dialogResult() {
        this.agreeDialogActive = false;
    }

    changeLanguage(lang: string) {
        this.$i18n.locale = lang
    }

    showDataInMap(md_id: string) {
        this.mapData.md_id = md_id;
    }
}
</script>

<style lang="scss">
@import '../assets/scss/udpc-dashboard/_fonts_colors.scss';

* {
    font-family: 'Roboto';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

i {
    font-family: 'Material Icons';
}

.navbar {
    height: 120px;
    border-bottom: 48px solid $hamburg-blue-dark;
    margin-bottom: 35px;

    background-color: white;

    .navbar-brand {
        font-size: 26px;
        font-weight: 300;
        color: $hamburg-blue-dark;
        padding-left: 5px;
        padding-top: 8px;

        @media (max-width: 380px) {
            font-size: 20px;
        }
    }

    .hh-bug {
        height: 18px;
        position: absolute;
        left: -105px;
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
        height: 44px;
        font-size: 11px;
        text-transform: none;
        text-align: left;
        width: 50%;
        max-width: none;

        .md-ripple {
            padding: 0 10px;
        }

        .md-button-content {
            width: 100%;
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

    .md-card-actions {
        .range-display {
            color: $hamburg-chart !important;
        }
        span {
            width: 80px;
            margin: 17px 15px 0 15px;
            font-size: 14px;
            color: $hamburg-chart;
            white-space: nowrap;
        }
    }

    .filter-notice {
        margin: 10px 0;
        font-size: 16px;
    }
}

.ant-slider {
    width: auto;
    margin: 0;

    .ant-slider-rail, .ant-slider-track {
        width: calc(100% + 20px);
        margin-left: -10px;
        background-color: #707070 !important;
    }

    .ant-slider-handle {
        border-radius: 0 !important;
        width: 2px !important;
        border-color: $hamburg-red !important;
        background-color: $hamburg-red !important;
        margin-left: -3px !important;
    }

    .ant-slider-handle:focus {
        box-shadow: none !important;
    }
}

.udpc-bottom-bar {
    margin-top: 40px;
    background-color: $hamburg-grey-background !important;
    color: $hamburg-blue-dark;
    box-shadow: 0px -3px 6px #00000029;

    .row {
        min-height: 122px;
    }

    .links-bottom-left {
        text-align: left;
        padding-bottom: 22px;

        > a {
            padding-right: 30px !important;
        }

        a {
            font-size: 16px;
            padding-right: 10px;
            color: $hamburg-blue;
        }
    }

    .images-bottom-right {
        @media (min-width: 459px) {
            .image-col {
                padding-bottom: 22px;
                align-self: flex-end;
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
            color: $hamburg-blue;

            img {
                max-height: 62px;
            }
        }
    }
}

.tooltip-inner {
    height: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}

#tree-map {
    cursor: pointer;
}
</style>
