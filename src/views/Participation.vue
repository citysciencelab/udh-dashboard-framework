<template>
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col-sm">
        <multi-select ref="districtSelect"
                      :select-data="getFilterOptions('participationData', 'bezirk')"
                      :label="$t('participation.district')"
                      identifier="bezirk"
                      @new_selection="filterChanged" />
      </div>
      <div class="col-sm">
        <multi-select ref="originatorSelect"
                      :select-data="getFilterOptions('participationData', 'absender')"
                      :label="$t('participation.sender')"
                      identifier="absender"
                      @new_selection="filterChanged" />
      </div>
      <div class="col-sm">
        <md-chip md-clickable
                 @click="resetFilters">
          {{ $t('participation.reset') }}
        </md-chip>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-sm">
        <dashboard-tile data-background-color="blue"
                        class="chart-holder">
          <template slot="header">
            <div class="info-icon-holder"
                 @click="openToolTip('tooltip-os-data')">
              <md-icon>info_outline</md-icon>
            </div>
            <div class="card-header-text">
              {{ $t('participation.chartHeader1') }}
            </div>
          </template>
          <template slot="content">
            <bar-chart :chart-data="chartData.participationDistrictCount"
                       :chart-options="chartOptions.participationDistrictCount" />
          </template>
          <template slot="footer">
            <div class="notice">
              {{ $t('participation.chartFooter1') }}
            </div>
          </template>
        </dashboard-tile>
      </div>
      <div class="col-sm">
        <dashboard-tile data-background-color="blue"
                        class="chart-holder">
          <template slot="header">
            <div class="info-icon-holder"
                 @click="openToolTip('tooltip-os-data')">
              <md-icon>info_outline</md-icon>
            </div>
            <div class="card-header-text">
              {{ $t('participation.chartHeader2') }}
            </div>
          </template>
          <template slot="content">
            <horizontal-bar-chart :chart-data="chartData.participationDistrictCount"
                                  :chart-options="chartOptions.participationDistrictCount" />
          </template>
          <template slot="footer">
            <div class="notice">
              {{ $t('participation.chartFooter2') }}
            </div>
          </template>
        </dashboard-tile>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-sm">
        <dashboard-tile data-background-color="blue"
                        class="chart-holder">
          <template slot="header">
            <div class="info-icon-holder"
                 @click="openToolTip('tooltip-os-data')">
              <md-icon>info_outline</md-icon>
            </div>
            <div class="card-header-text">
              {{ $t('participation.chartHeader3') }}
            </div>
          </template>
          <template slot="content">
            <tree-map-chart :chart-data="chartData.participationDistrictCountTree"
                            :chart-options="chartOptions.participationDistrictCountTree" />
          </template>
          <template slot="footer">
            <div class="notice">
              {{ $t('participation.chartFooter3') }}
            </div>
          </template>
        </dashboard-tile>
      </div>
      <div class="col-sm">
        <dashboard-tile data-background-color="blue"
                        class="chart-holder">
          <template slot="header">
            <div class="info-icon-holder"
                 @click="openToolTip('tooltip-os-data')">
              <md-icon>info_outline</md-icon>
            </div>
            <div class="card-header-text">
              {{ $t('participation.mapHeader') }}
            </div>
          </template>
          <template slot="content">
            <master-portal-map :services="services"
                               :portal="portal"
                               :feature-data="dataAsFeatures" />
          </template>
          <template slot="footer">
            <div class="notice">
              {{ $t('participation.mapFooter') }}
            </div>
          </template>
        </dashboard-tile>
      </div>
    </div>

    <!--Tooltips-->
    <b-tooltip ref="tooltip-os-data"
               target="tooltip-os-data"
               triggers="hover"
               custom-class="udpc-tooltip">
      I am tooltip component content!
    </b-tooltip>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import DashboardTile from '@/components/DashboardTile.vue';
import MultiSelect from '@/components/MultiSelect.vue';
import BarChart from '@/components/charts/chartjs/BarChart.vue';
import HorizontalBarChart from '@/components/charts/chartjs/BarChartHorizontal.vue';
import TreeMapChart from '@/components/charts/chartjs/TreeMap.vue';
import partStore from '@/store/participation.module';
import AbstractDashboard from '@/views/AbstractDashboard.vue';
import { messages } from '@/messages/messages.participation.module';
import MasterPortalMap from "@/components/MasterPortalMap.vue";
import portalConfig from "@/assets/map-config/portal.json";
import servicesConfig from "@/assets/map-config/services.json";
import { FeatureSet } from '@/connectors/wfs';

@Component({
    components: {
        DashboardTile,
        MultiSelect,
        BarChart,
        HorizontalBarChart,
        TreeMapChart,
        MasterPortalMap
    }
})
export default class Participation extends AbstractDashboard {
    chartData: { [key: string]: Chart.ChartData } = {
        participationDistrictCount: {},
        participationDistrictCountTree: {}
    };
    chartOptions: { [key: string]: Chart.ChartOptions } = {
        participationDistrictCount: {
            title: {
                text: 'Public participation procedures'
            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        },
        participationDistrictCountTree: {
            title: {
                display: false
            },
            legend: {
                display: false
            },
            maintainAspectRatio: false
        }
    };
    dataAsFeatures: FeatureSet = new FeatureSet();
    portal: object = portalConfig;
    services: object = servicesConfig;

    async mounted() {
        // fetch the initial dashboard data
        await this.fetchParticipationStats();
    }

    /**
    *  Life cycle hook that mounts the lazy loaded messages and vuex store
    *  Stars fetching data from the store and subscribe to its mutations.
    *  When the requests from the WFS are finished, these subscriptions will set the data for each chart
    */
    created() {
        this.$i18n.mergeLocaleMessage('en', messages.en);
        this.$i18n.mergeLocaleMessage('de', messages.de);
        this.$store.registerModule('participation', partStore);

        this.$store.subscribe((mutation) => {

            switch (mutation.type) {
                case 'SET_INITIAL_DATA':
                    if (mutation.payload[0] === 'participationMapData') {
                        this.dataAsFeatures = mutation.payload[1];
                    }
                    break;
                case 'SET_FILTERED_DATA':
                    if (mutation.payload[0] === 'participationDistrictCount') {
                        let chartCountData = mutation.payload[1];
                        chartCountData.datasets[0]['label'] = 'Verfahren';
                        chartCountData.datasets[0]['backgroundColor'] = '#f87979';
                        this.chartData.participationDistrictCount = chartCountData;
                    } else if (mutation.payload[0] === 'participationDistrictCountTree') {
                        let chartCountTree = mutation.payload[1];
                        chartCountTree.datasets[0]['key'] = 'count';
                        chartCountTree.datasets[0]['groups'] = ['bezirk'];
                        chartCountTree.datasets[0]['spacing'] = 2;
                        chartCountTree.datasets[0]['borderWidth'] =0.5;
                        chartCountTree.datasets[0]['fontColor'] = 'black';
                        this.chartData.participationDistrictCountTree = chartCountTree;
                    } else if (mutation.payload[0] === 'participationMapData') {
                        this.dataAsFeatures = mutation.payload[1];
                    }
                    break;
            }
        });
    }

    /*
      *   Retrieves the distinct filter values from the vuex store
      *   @param {string} dataId the name of the dataset to retrieve filters from
      *   @param {string} filterProperty name of the property in the dataset values to get distinct elements
       */
    getFilterOptions(dataId: string, filterProperty: string): any[] {
        return this.$store.getters.distinctPropertyValues(dataId, filterProperty);
    }

    fetchParticipationStats() {
        this.$store.dispatch('fetchParticipationStats');
    }

    /*
    *   Gets fired when a MultiSelect selection has changed.
    *   Vuex store ist set from the MultiSelect itself
    *   @param event the selected elements - not used in this dashboard

     */
    filterChanged(event: [string, string[]]) {
      this.$store.dispatch('setFilters', event);
      this.recalculate();
    }

    recalculate() {
        const data = this.$store.getters.dataWithAppliedFilters('participationData');
        this.$store.dispatch('recalculateChartData', data);
        this.$store.dispatch('recalculateMapData');
    }

    resetFilters() {
      this.$store.commit('SET_FILTERS_NONE');
      (this.$refs.districtSelect as MultiSelect).resetSelection();
      (this.$refs.originatorSelect as MultiSelect).resetSelection();
      this.recalculate();
    }
}
</script>

<style lang="scss">
.chart-holder {
    height: 100%;
    width: 100%;
    margin: 0;
    padding-left: 10px !important;
    padding-right: 10px !important;
    padding-bottom: 20px !important;
}
</style>
