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
      <div class="row">
        <div class="col-lg-12 py-2">
          <!-- Filter -->
          <dashboard-tile class="filter-card">
            <template slot="content">
              <div class="container-fluid">
                <div class="row">
                  <multi-select ref="themeSelect"
                                identifier="theme"
                                :select-data="getThemeFilterOptions()"
                                :label="$t('udpc.themeFilter')"
                                class="multiselect"
                                @new_selection="applyFilters" />
                  <multi-select ref="organizationSelect"
                                identifier="org"
                                :select-data="getOrgFilterOptions()"
                                :label="$t('udpc.orgFilter')"
                                class="multiselect"
                                @new_selection="applyFilters" />
                  <div class="filter-icon-container">
                    <a v-if="filters.theme && filters.theme.length || filters.org && filters.org.length"
                       class="material-icons"
                       :title="$t('udpc.clearFilter')"
                       @click="clearFilters()">delete</a>
                  </div>
                </div>
              </div>
            </template>
          </dashboard-tile>
        </div>
      </div>
      <div class="row facts-row">
        <div class="col-lg-4 col-md-12">
          <div class="row kpi-row">
            <div class="col-md-4 col-xs-12 py-2">
              <!-- KPI Sensoren -->
              <dashboard-tile data-background-color="blue"
                              class="kpi-tile">
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
                  <p v-b-tooltip.hover class="dashboard-kpi" :title="kpiData.sensorCount">
                    {{ kpiData.sensorCount }}
                  </p>
                </template>
                <template slot="footer" />
              </dashboard-tile>
            </div>
            <div class="col-md-4 col-xs-12 py-2">
              <!-- KPI Besucher -->
              <dashboard-tile data-background-color="blue"
                              class="kpi-tile">
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
                  <p v-b-tooltip.hover class="dashboard-kpi" :title="kpiData.visitorsMonth">
                    {{ kpiData.visitorsMonthAbbreviated }}
                  </p>
                </template>
                <template slot="footer" />
              </dashboard-tile>
            </div>
            <div class="col-md-4 col-xs-12 py-2">
              <!-- KPI Karte -->
              <dashboard-tile data-background-color="blue"
                              class="kpi-tile">
                <template slot="header">
                  <div class="info-icon-holder"
                       @click="$refs['tooltip-background-access'].show()">
                    <md-icon>help</md-icon>
                  </div>
                  <div class="card-header-text">
                    {{ $t('udpc.access') }}
                  </div>
                </template>
                <template slot="content">
                  <p v-b-tooltip.hover class="dashboard-kpi" :title="kpiData.mapAccess">
                    {{ kpiData.mapAccessAbbreviated }}
                  </p>
                </template>
                <template slot="footer" />
              </dashboard-tile>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 py-2">
          <!-- Wussten Sie schon? -->
          <dashboard-tile data-background-color="blue"
                          class="chart-card">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-did-you-know'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.didYouKnow') }}
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
          <!-- Neueste Datensätze -->
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
              <did-you-know :data="recentDataSets"
                            :interval="7500"
                            :store-id="'udpc'"
                            @show-in-map="showDataInMap" />
            </template>
            <template slot="footer" />
          </dashboard-tile>
        </div>
      </div>
      <div class="row ">
        <div class="col-lg-4 col-md-6 py-2">
          <!-- Anzahl nach -->
          <dashboard-tile data-background-color="blue">
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
                <tree-map-chart-d3 :ds="chartData.dataSetsByTopic"
                                   holder-element="chart-holder" metric="doc_count"
                                   descriptor="key" selector="chart-tree-d3"
                                   @click="onFilterSelectFromTreeMap($event)" />
              </div>
            </template>
            <template slot="footer">
              <div class="notice">
                <md-switch v-model="chartSwitches.countGroupedWithPlans"
                           class="dashboard-switch"
                           @change="fetchTotalsByTopic()">
                  {{ $t('udpc.includeDevPlan') }}
                </md-switch>
              </div>
            </template>
          </dashboard-tile>
        </div>
        <div class="col-lg-4 col-md-6 py-2">
          <!-- Anzahl total -->
          <dashboard-tile data-background-color="blue">
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
              <md-tabs ref="count-total-tabs"
                       class="dashboard-tabs"
                       @md-changed="onSwitchTab">
                <md-tab id="tab-datasets"
                        :md-label="$t('udpc.tabDatasets')" />
                <md-tab id="tab-apps"
                        :md-label="$t('udpc.tabApps')" />
                <md-tab id="tab-sensordatasets"
                        :md-label="$t('udpc.tabSensors')" />
              </md-tabs>
              <div class="chart-holder">
                <bar-chart :chart-data="chartData.dataSetsByType"
                           :chart-options="chartOptions.dataSetsByType"
                           :is-standard-tooltips="true" />
              </div>
            </template>
            <template slot="footer">
              <div v-if="this.$refs['count-total-tabs'] && this.$refs['count-total-tabs'].activeTab === 'tab-datasets'"
                   class="notice">
                <md-switch v-model="chartSwitches.countTotalWithPlans"
                           class="dashboard-switch"
                           @change="fetchTotalsByType()">
                  {{ $t('udpc.includeDevPlan') }}
                </md-switch>
              </div>
            </template>
          </dashboard-tile>
        </div>
        <div class="col-lg-4 col-md-12 py-2">
          <!-- Karte -->
          <dashboard-tile data-background-color="blue">
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
              <master-portal-map ref="masterPortalMap"
                                 :services="mapData.services"
                                 :portal="mapData.portal"
                                 :md_id="mapData.md_id"
                                 :overlay="mapData.overlay"
                                 :store-id="'udpc'"
                                 @fullscreenMap="toggleRecentDatasetInterval" />
            </template>
            <template slot="footer" />
          </dashboard-tile>
        </div>
      </div>
      <div class="row ">
        <div class="col-lg-3 col-md-6 py-2">
          <!-- Top 10 des Monats -->
          <dashboard-tile data-background-color="blue">
            <template slot="header">
              <div class="info-icon-holder"
                   @click="$refs['tooltip-top-x'].show()">
                <md-icon>help</md-icon>
              </div>
              <div class="card-header-text">
                {{ $t('udpc.top10') }}
              </div>
            </template>
            <template slot="content">
              <md-tabs class="dashboard-tabs"
                       @md-changed="onSwitchTab">
                <md-tab id="tab-top10-datasets"
                        :md-label="$t('udpc.tabDatasets')" />
                <md-tab id="tab-top10-apps"
                        :md-label="$t('udpc.tabApps')" />
                <md-tab id="tab-top10-downloads"
                        :md-label="$t('udpc.tabDownloads')" />
              </md-tabs>
              <div class="chart-holder">
                <bar-chart-horizontal :chart-data="chartData.dataSetsTopX"
                                      :chart-options="chartOptions.dataSetsTopX"
                                      :is-standard-tooltips="true" />
              </div>
            </template>
            <template slot="footer" />
          </dashboard-tile>
        </div>
        <div class="col-lg-3 col-md-6 py-2">
          <!-- Downloads -->
          <dashboard-tile data-background-color="blue">
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
              <div class="chart-holder">
                <bar-chart :chart-data="chartData.totalDownloads"
                           :chart-options="chartOptions.totalDownloads"
                           :is-standard-tooltips="true" />
              </div>
            </template>
            <template slot="footer">
              <div class="slider-holder">
                <span class="left">{{ $t('udpc.sliderEarlier') }}</span>
                <range-slider class="slider"
                              :options="sliderOptions.downloads"
                              @rangeChange="rangeForChartChanged('downloads', $event)" />
                <span class="right">{{ $t('udpc.sliderLater') }}</span>
              </div>
            </template>
          </dashboard-tile>
        </div>
        <div class="col-lg-3 col-md-6 py-2">
          <!-- Zugriffe Fachdaten -->
          <dashboard-tile data-background-color="blue">
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
              <div class="chart-holder">
                <bar-chart :chart-data="chartData.totalDatasets"
                           :chart-options="chartOptions.totalDatasets"
                           :is-standard-tooltips="true" />
              </div>
            </template>
            <template slot="footer">
              <div class="slider-holder">
                <span class="left">{{ $t('udpc.sliderEarlier') }}</span>
                <range-slider class="slider"
                              :options="sliderOptions.datasets"
                              @rangeChange="rangeForChartChanged('datasets', $event)" />
                <span class="right">{{ $t('udpc.sliderLater') }}</span>
              </div>
              <div class="notice" style="width: 100%; display: flex">
                <md-switch
                  v-model="chartSwitches.accessWithBackgroundMaps"
                  class="dashboard-switch"
                  @change="onSwitchIncludeMaps('datasets')">
                  {{ $t('udpc.includeMapHits') }}
                </md-switch>
              </div>
            </template>
          </dashboard-tile>
        </div>
        <div class="col-lg-3 col-md-6 py-2">
          <!-- Zugriffe Apps -->
          <dashboard-tile data-background-color="blue">
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
              <div class="chart-holder">
                <bar-chart :chart-data="chartData.totalApps"
                           :chart-options="chartOptions.totalApps"
                           :is-standard-tooltips="true" />
              </div>
            </template>
            <template slot="footer">
              <div class="slider-holder">
                <span class="left">{{ $t('udpc.sliderEarlier') }}</span>
                <range-slider class="slider"
                              :options="sliderOptions.apps"
                              @rangeChange="rangeForChartChanged('apps', $event)" />
                <span class="right">{{ $t('udpc.sliderLater') }}</span>
              </div>
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
                  :header="$t('udpc.didYouKnow')"
                  :html="didYouKnowDataToHtml(didYouKnow, $t('udpc.tooltipDidYouKnow'))" />
    <info-overlay ref="tooltip-latest-datasets"
                  :header="$t('udpc.newDatassets')"
                  :html="didYouKnowDataToHtml(recentDataSets, $t('udpc.tooltipLatestDataSets'))" />
    <info-overlay ref="tooltip-sensors"
                  :header="$t('udpc.sensors')"
                  :text="$t('udpc.tooltipSensors')" />
    <info-overlay ref="tooltip-visitors-today"
                  :header="$t('udpc.access_overlay_head')"
                  :text="$t('udpc.visitors')" />
    <info-overlay ref="tooltip-background-access"
                  :header="$t('udpc.tooltipVisitorsToday')"
                  :html="didYouKnowDataToHtml(overlayDataMapKpi, $t('udpc.tooltipBackgroundAccess'))" />
    <info-overlay ref="tooltip-datasets-by"
                  :header="$t('udpc.countBy')"
                  :text="$t('udpc.tooltipDatasetsBy')" />
    <info-overlay ref="tooltip-count-total"
                  :header="$t('udpc.countTotal')"
                  :text="$t('udpc.tooltipCountTotal')" />
    <info-overlay ref="tooltip-map"
                  :header="$t('udpc.map')"
                  :text="$t('udpc.tooltipMap')" />
    <info-overlay ref="tooltip-top-x"
                  :header="$t('udpc.top10')"
                  :html="didYouKnowDataToHtml(overlayDataTopX, $t('udpc.tooltipTopX'))" />
    <info-overlay ref="tooltip-downloads"
                  :header="$t('udpc.download')"
                  :text="$t('udpc.tooltipDownloads')" />
    <info-overlay ref="tooltip-access-data"
                  :header="$t('udpc.accessTopicData')"
                  :text="$t('udpc.tooltipAccessData')" />
    <info-overlay ref="tooltip-access-apps"
                  :header="$t('udpc.accessApps')"
                  :text="$t('udpc.tooltipAccessApps')" />
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
import DidYouKnowDataList from '../components/DidYouKnowDataList.vue';
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
import Utils from "@/utils/utils";
import TreeMapChartD3 from "@/components/charts/d3/TreeMapChartD3.vue";

@Component({
    components: {
      TreeMapChartD3,
        DashboardTile,
        DidYouKnow,
        DidYouKnowDataList,
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
    agreeDialogActive = false;
    updateMapOnInterval = true;

    mapData: MapData = {
        services: servicesConfig,
        portal: portalConfig,
        md_id: '',
        overlay: undefined
    };

    sliderOptions: { [key: string]: DateRangeSliderOptions } = {};

    overlayDataTopX: DidYouKnowData = {
        items: [],
        action: null
    };

    overlayDataMapKpi: DidYouKnowData = {
        items: [],
        action: null
    };

    didYouKnow: DidYouKnowData = {
        items: [],
        action: null
    };

    recentDataSets: DidYouKnowData = {
        items: [],
        action: 'md_id'
    };

    kpiData: { [key: string]: string } = {
      sensorCount: '',
      sensorCountAbbreviated: '',
      visitorsMonth: '',
      visitorsMonthAbbreviated: '',
      mapAccess: '',
      mapAccessAbbreviated: ''
    };

    chartSwitches: { [key: string]: boolean } = {
      accessWithBackgroundMaps: true,
      countGroupedWithPlans: false,
      countTotalWithPlans: false
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
        totalApps: '',
        tops: ''
    };

    barChartConfigDefaults = {
        maintainAspectRatio: false,
        title: {
            display: false
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
                    beginAtZero: true,
                    callback: function(value: number) {
                      return new Utils().number.getAbbreviatedNumber(value);
                    }
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

    chartOptions: { [key: string]: Chart.ChartOptions } = {
        dataSetsByTopic: {
            maintainAspectRatio: false,
            title: {
                display: false
            },
            legend: {
                display: false
            }
        },
        dataSetsByType: {
            maintainAspectRatio: false,
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
                        beginAtZero: true,
                        callback: function(value: number) {
                          return new Utils().number.getAbbreviatedNumber(value);
                        }
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
            maintainAspectRatio: false,
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
                        mirror: true,
                        display: false,
                        beginAtZero: true,
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function(value: number) {
                          return new Utils().number.getAbbreviatedNumber(value);
                        }
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

        this.fetchFacts();
        this.fetchBaseMapKPI();
        this.fetchVisitorsKPI();
        this.fetchSensorsKPI();
        this.fetchRecentDatasets();

        this.$store.subscribe((mutation) => {
            if (!mutation.payload) {
                return;
            }

            if (mutation.type ==='SET_FILTERED_DATA') {
                const mutationData = mutation.payload[1];

                switch (mutation.payload[0]) {
                    case 'totalTopicDatasets': {
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

                      const colorMap = [
                        "#003063", "#9FB1C4", "#40648B",
                        "#7F97B0", "#7FADD4", "#BFD6E9",
                        "#2B88D8", "#005CA9", "#BFD6E9",
                        "#FFF4CE", "#DFF6DD",
                      ];

                      let index:number = 0;
                      for (const dataElement of mutationData.datasets[0].tree) {
                        let color = null;
                        if (index > colorMap.length - 1) {
                          let colorIdx = index % colorMap.length;
                          let quotient = Math.floor(index/colorMap.length);
                          if (quotient > 9) quotient = 9;
                          color = Color(colorMap[colorIdx]).alpha(1 - (0.1 * quotient)).hex();
                        } else {
                          color = colorMap[index];
                        }
                        dataElement['color'] = color;
                        index++;
                      }
                      this.chartData.dataSetsByTopic = mutationData;
                      break;
                    }
                    case 'totalDatasetsRangeTop': {
                      mutationData.datasets[0]['label'] = 'Zugriffe';
                      mutationData.datasets[0]['backgroundColor'] = '#196CB1';
                      this.chartData.dataSetsTopX = mutationData;
                      break;
                    }
                    case 'totalDatasetsRangeTop-overlay-details': {
                      this.overlayDataTopX = mutationData;
                      break;
                    }
                    case 'totalDatasetsCount': {
                      mutationData.datasets[0]['backgroundColor'] = '#003063';
                      this.chartData.dataSetsByType = mutationData;
                      break;
                    }
                    case 'totalDownloads': {
                      mutationData.datasets[0].backgroundColor = '#7F97B0';
                      this.chartData.totalDownloads = mutationData;
                      break;
                    }
                    case 'totalDatasets': {mutationData.datasets[0].backgroundColor = '#196CB1';
                      this.chartData.totalDatasets = mutationData;
                      break;
                    }
                    case 'totalApps': {mutationData.datasets[0].backgroundColor = '#40648B';
                      this.chartData.totalApps = mutationData;
                      break;
                    }
                    case 'visitorsKPI': {
                      this.kpiData.visitorsMonth = new Utils().number.getDecimalSeparatedNumber(mutationData);
                      this.kpiData.visitorsMonthAbbreviated = new Utils().number.getAbbreviatedNumber(mutationData);
                      break;
                    }
                    case 'didYouKnowFacts': {
                      this.didYouKnow.items = mutationData;
                      break;
                    }
                    case 'sensorsKPI': {
                      this.kpiData.sensorCount = new Utils().number.getDecimalSeparatedNumber(mutationData);
                      this.kpiData.sensorCountAbbreviated = new Utils().number.getAbbreviatedNumber(mutationData);
                      break;
                    }
                    case 'baseMapKPI': {
                      this.kpiData.mapAccess = new Utils().number.getDecimalSeparatedNumber(mutationData);
                      this.kpiData.mapAccessAbbreviated = new Utils().number.getAbbreviatedNumber(mutationData);
                      break;
                    }
                    case 'baseMapKPI-overlay-details': {
                      this.overlayDataMapKpi = mutationData;
                      break;
                    }
                    case 'recentDatasets': {
                        this.recentDataSets = mutationData;
                    }
                }
            }
        });
    }

    onSwitchTab(tab: string) {
        switch (tab) {
            case 'tab-theme':
                this.activeTabs.dataSetsByTopic = 'theme';
                this.fetchTotalsByTopic();
                break;
            case 'tab-organization':
                this.activeTabs.dataSetsByTopic = 'organization';
                this.fetchTotalsByTopic();
                break;
            case 'tab-datasets':
                this.activeTabs.dataSetsByType = 'datasets';
                this.fetchTotalsByType();
                break;
            case 'tab-apps':
                this.activeTabs.dataSetsByType = 'apps';
                this.fetchTotalsByType();
                break;
            case 'tab-sensordatasets':
                this.activeTabs.dataSetsByType = 'sensordatasets';
                // this.fetchTotalsByType();  // not yet implemented in backend
                break;
            case 'tab-top10-datasets':
                this.activeTabs.tops = 'datasets';
                this.fetchTops();
                break;
            case 'tab-top10-apps':
                this.activeTabs.tops = 'apps';
                this.fetchTops();
                break;
            case 'tab-top10-downloads':
                this.activeTabs.tops = 'downloads';
                this.fetchTops();
                break;
        }
    }

    onSwitchYearMonthTab(tab: string) {
        const today = new Date();
        const currentYear = `${today.getFullYear()}`;
        const currentMonth = new Utils().date.getLastMonth();

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
                this.sliderOptions.apps = { min: '2016', max: currentYear, unit: 'year', isShowMarks: false};
                this.fetchAppsRange();
                break;
            case 'tab-apps-month':
                this.activeTabs.totalApps = tab;
                this.sliderOptions.apps = { min: '2016-03', max: currentMonth, unit: 'month', isShowMarks: false};
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

    onSwitchIncludeMaps() {
      this.fetchDatasetsRange();
    }

    async fetchFacts() {
        await this.$store.dispatch('fetchFacts');
    }

    async fetchBaseMapKPI() {
        await this.$store.dispatch('fetchBaseMapKPI');
    }

    async fetchVisitorsKPI() {
        await this.$store.dispatch('fetchVisitorsKPI');
    }

    async fetchSensorsKPI() {
        await this.$store.dispatch('fetchSensorsKPI');
    }

    async fetchRecentDatasets() {
        await this.$store.dispatch('fetchRecentDatasets');
    }

    async fetchTotalsByTopic() {
        const totalsTopic = this.activeTabs.dataSetsByTopic;
        const theme = this.filters.theme;
        const org = this.filters.org;
        const isIncludeBuildPlans = this.chartSwitches.countGroupedWithPlans;

        await this.$store.dispatch('fetchTotalsByTopic', { totalsTopic, theme, org, isIncludeBuildPlans });
    }

    async fetchTotalsByType() {
        const totalsType = this.activeTabs.dataSetsByType;
        const theme = this.filters.theme;
        const org = this.filters.org;
        const isIncludeBuildPlans = totalsType === 'datasets' ? this.chartSwitches.countTotalWithPlans : false;

        await this.$store.dispatch('fetchTotalsByType', { totalsType, theme, org, isIncludeBuildPlans });
    }

    async fetchTops() {
        const topTopic = this.activeTabs.tops;
        const theme = this.filters.theme;
        const org = this.filters.org;

        if (topTopic === 'datasets') {
            await this.$store.dispatch('fetchTops', { topTopic, theme, org });
        } else {
            await this.$store.dispatch('fetchTops', { topTopic });
        }
    }

    async fetchDownloadsRange() {
        const params = {
            chartId: 'totalDownloads',
            category: 'downloads',
            min: this.sliderOptions.downloads.min,
            max: this.sliderOptions.downloads.max,
            unit: this.sliderOptions.downloads.unit
        };
        await this.$store.dispatch('fetchRangefulData', params);
    }

    async fetchDatasetsRange() {
        const params = {
            chartId: 'totalDatasets',
            category: 'datasets',
            min: this.sliderOptions.datasets.min,
            max: this.sliderOptions.datasets.max,
            unit: this.sliderOptions.datasets.unit,
            tag_not: this.chartSwitches.accessWithBackgroundMaps ? [''] : ['basemap'],
            theme: this.filters.theme,
            org: this.filters.org
        };
        await this.$store.dispatch('fetchRangefulData', params);
    }

    async fetchAppsRange() {
        const params = {
            chartId: 'totalApps',
            category: 'apps',
            min: this.sliderOptions.apps.min,
            max: this.sliderOptions.apps.max,
            unit: this.sliderOptions.apps.unit,
            theme: this.filters.theme,
            org: this.filters.org
        };
        await this.$store.dispatch('fetchRangefulData', params);
    }

    getThemeFilterOptions() {
        return this.$store.getters.distinctPropertyValues('totalTopicDatasets', 'theme');
    }

    getOrgFilterOptions() {
        return this.$store.getters.distinctPropertyValues('totalTopicDatasets', 'organization');
    }

    get filters() {
        return this.$store.getters.filters();
    }

    set filters(filters: { [key: string]: string[] }) {
        for (const [k, v] of Object.entries(filters)) {
            this.$store.dispatch('setFilters', [k, v]);
        }
    }

    applyFilters(event: [string, string[]] ) {
        this.$store.dispatch('setFilters', event);
        this.fetchAllFiltered();
    }

    clearFilters() {
        this.filters = { theme: [], org: [] };
        this.fetchAllFiltered();

        // synchronize multiselects
        for (const select of [this.$refs.themeSelect, this.$refs.organizationSelect] as MultiSelect[]) {
            select.selectedData = [];
            select.closed(true);
        }
    }

    fetchAllFiltered() {
        this.fetchTotalsByTopic();
        this.fetchTotalsByType();
        this.fetchTops();
        this.fetchDatasetsRange();
    }

    onFilterSelectFromTreeMap(event: Datum) {
        if (!event.id) {
            return;
        }

        const topics = [event.id] as string[];

        // Synchronize MultiSelects (updating them will trigger 'applyFilters')
        switch (this.activeTabs.dataSetsByTopic) {
            case 'theme': {
                const select = (this.$refs.themeSelect as MultiSelect);
                select.selectedData = topics;
                select.closed(true);
                break;
            }
            case 'organization': {
                const select = (this.$refs.organizationSelect as MultiSelect);
                select.selectedData = topics;
                select.closed(true);
            }
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

    showDataInMap(dataset: {label: string, link: string}) {
      if (this.updateMapOnInterval) {
        this.mapData.md_id = dataset.link;
        this.mapData.overlay = dataset.label;
      }
    }

    didYouKnowDataToHtml(inputData: DidYouKnowData, wrapper?: string): Element {
      const instance = new DidYouKnowDataList({
        propsData: {
          inputData,
          linkPrefix: this.$store.state.udpc.hmdkUrl
        }
      });
      instance.$mount();

      if (wrapper) {
        const el = document.createElement('div');
        el.innerHTML = wrapper.replace('PLATZHALTER', instance.$el.outerHTML);

        return el;
      }

      return instance.$el;
    }

    toggleRecentDatasetInterval(state: boolean) {
      this.updateMapOnInterval = !state;
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

        @media (max-width: 489px) {
          position: absolute;
          left: 105px;
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

.kpi-tile.md-card  {
  .md-card-header {
    .card-header-text {
      @media (max-width: 768px) {
        font-size: 24px !important;
      }
      @media (min-width: 769px) {
        font-size: 16px !important;
      }
    }
  }
}

.facts-row {
  min-height: 155px;
}

.kpi-row {
  height: 100%;
}

.dashboard-kpi {
    font-size: 35px;
    font-weight: bold;
    color: $hamburg-blue;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 0 !important;
    margin-top: 15px;
    line-height: 1;

    @media (max-width: 767px) {
      text-align: center;
    }
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
        overflow: hidden;

        > span {
            position: relative;
            top: 10px;
        }

        .chart-holder {
          margin-top: 15px;
        }

        .chart-holder, .chart-holder >div {
            height: 292px;
            width: 100%;
        }
    }

    .md-card-actions {
        flex-wrap: wrap;

        > div {
          display: flex;
          flex-basis: 100%;
        }

        .slider-holder {
          justify-content: center;
          padding-bottom: 10px;
        }

        .range-display {
            color: $hamburg-chart !important;
        }

        span {
            flex-basis: 10%;
            width: 80px;
            margin: 17px 15px 0 15px;
            font-size: 14px;
            color: $hamburg-chart;
            white-space: nowrap;
        }

        .left {
          order: 1;
          display: none;
        }

        .slider {
          order: 2;
          flex-basis: 90%;
        }

        .right {
          order: 3;
          display: none;
        }
    }

    &.filter-card {
      padding: 0 15px;

      .md-card-content,
      .md-card-actions {
        padding: 0;
      }

      .multiselect {
        padding-right: 40px;
      }

      .filter-icon-container {
        margin-left: -10px;
        padding: 22px 0;
      }
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
    overflow: hidden;
    text-overflow: ellipsis;
}

#tree-map {
    cursor: pointer;
}

.overlay {
  position: absolute;
  z-index: 100;
  padding: 10px 15px;
  left: 0;
  top: 0;

  &.left {
      left: 0;
      right: initial;
  }
  &.right {
      right: 0;
      left: initial;
  }
  &.top {
      top: 15px;
      bottom: initial;
  }
  &.bottom {
      bottom: 0;
      top: initial;
  }
  &.banner {
    background: rgba(255, 255, 255 , 0.8);
  }
  > i {
      color: $hamburg-blue !important;
      font-size: 2em !important;
      cursor: pointer;
  }
}
</style>
