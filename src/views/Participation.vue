<template>
    <div class="container">
        <div class="row align-items-center" style="background-color: white">
            <div class="col-sm">
                <multi-select :selectData="getFilterOptions('participationData', 'bezirk')"
                              :label="$t('participation.district')"
                              @new_selection="filterChanged"
                              identifier="bezirk" ref="districtSelect"/>
            </div>
            <div class="col-sm">
                <multi-select :selectData="getFilterOptions('participationData', 'absender')"
                              :label="$t('participation.sender')"
                              @new_selection="filterChanged"
                              identifier="absender" ref="originatorSelect"/>
            </div>
            <div class="col-sm">
                <md-chip md-clickable @click="resetFilters">{{$t('participation.reset')}}</md-chip>
            </div>
        </div>
        <div class="row chart-row" style="height: 420px">
            <div class="col-sm">
                <dashboard-tile data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('tooltip-os-data')">
                            Participation Data
                        </div>
                        <md-icon class="info-icon" id="tooltip-os-data">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                        <bar-chart :chartData="chartData.participationDistrictCount"
                                   :chartOptions="chartOptions.participationDistrictCount"/>
                    </template>

                    <template slot="footer">
                        <div class="notice">
                            this data is supported the JBe foundation
                        </div>
                    </template>
                </dashboard-tile>
            </div>
            <div class="col-sm">
                <dashboard-tile data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('')">
                            Other chart
                        </div>
                        <!--                        <md-icon class="info-icon" id="">-->
                        <md-icon class="info-icon">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                            <horizontal-bar-chart   :chartData="chartData.participationDistrictCount"
                                                    :chartOptions="chartOptions.participationDistrictCount"/>
                    </template>

                    <template slot="footer">
                        <div class="notice">
                            this data is supported the JBe foundation
                        </div>
                    </template>
                </dashboard-tile>
            </div>
        </div>
        <div class="row chart-row" style="height: 420px">
            <div class="col-sm">
                <dashboard-tile data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('tooltip-os-data-3')">
                            Participation Data
                        </div>
                        <md-icon class="info-icon" id="tooltip-os-data-3">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                        <tree-map-chart :chartData="chartData.participationDistrictCountTree"
                                   :chartOptions="chartOptions.participationDistrictCountTree"/>
                    </template>

                    <template slot="footer">
                        <div class="notice">
                            this data is supported the JBe foundation
                        </div>
                    </template>
                </dashboard-tile>
            </div>
            <div class="col-sm">
                <dashboard-tile data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('')">
                            Other chart
                        </div>
                        <!--                        <md-icon class="info-icon" id="">-->
                        <md-icon class="info-icon">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                        <template slot="content">
<!--                            <horizontal-bar-chart   :chartData="chartData.participationDistrictCount"-->
<!--                                                    :chartOptions="chartOptions.participationDistrictCount"/>-->
                        </template>
                    </template>

                    <template slot="footer">
                        <div class="notice">
                            this data is supported the JBe foundation
                        </div>
                    </template>
                </dashboard-tile>
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
    import Component from "vue-class-component";
    import DashboardTile from "../components/DashboardTile.vue";
    import MultiSelect from "../components/MultiSelect.vue";

    import BarChart from "../components/charts/chartjs/BarChart.vue";
    import HorizontalBarChart from "../components/charts/chartjs/BarChartHorizontal.vue";
    import TreeMapChart from "../components/charts/chartjs/TreeMap.vue";

    import partStore from '../store/participation.module';
    import AbstractDashboard from "@/views/AbstractDashboard.vue";
    import { messages } from '@/messages/messages.participation.module';

    @Component({
        components: {
            DashboardTile,
            MultiSelect,
            BarChart,
            HorizontalBarChart,
            TreeMapChart
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
                responsive: true
            },
            participationDistrictCountTree: {
                maintainAspectRatio: true,
                title: {
                    display: false
                },
                legend: {
                    display: false
                }
            }
        };


        async mounted() {
            // fetch the initial dashboard data
            await this.fetchParticipationStats();
        }

        created() {
            this.$i18n.mergeLocaleMessage('en', messages.en);
            this.$i18n.mergeLocaleMessage('de', messages.de);

            this.$store.registerModule('participation', partStore);
            this.$store.subscribe((mutation, state) => {

                const mutationData = mutation.payload[1].datasets[0];

                switch (mutation.type) {
                    case 'SET_INITIAL_DATA':
                        if (mutation.payload[0] === 'participationData') {
                            if (this.$refs['districtSelect']) {
                                (this.$refs['districtSelect'] as any).updateComponent();
                            }
                            if (this.$refs['originatorSelect']) {
                                (this.$refs['originatorSelect'] as any).updateComponent();
                            }
                        }
                        break;
                    case 'SET_FILTERED_DATA':
                        if (mutation.payload[0] === 'participationDistrictCount') {
                            let chartCountData = mutation.payload[1];
                            chartCountData.datasets[0]['label'] = "Verfahren";
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
                        }
                        break;
                }
            });
        }

        getFilterOptions(dataId: string, filterProperty: string): any[] {
            return this.$store.getters.distinctPropertyValues(dataId, filterProperty);
        }

        fetchParticipationStats() {
            this.$store.dispatch('fetchParticipationStats');
        }

        /*
        *   Gets fired when a MultiSelect selection has changed.
        *   Vuex store ist set from the MultiSelect itself
        *   @param the selected elements - not used in this dashboard
        */
        filterChanged(eventData: string[]) {
            this.recalculate();
        }

        resetFilters() {
            this.$store.commit('SET_FILTERS_NONE');
            if (this.$refs['districtSelect']) {
                (this.$refs['districtSelect'] as any).resetComponent();
            }
            if (this.$refs['originatorSelect']) {
                (this.$refs['originatorSelect'] as any).resetComponent();
            }
            this.recalculate();
        }

        recalculate() {
            const data = this.$store.getters.dataWithAppliedFilters('participationData');
            this.$store.dispatch('recalculateChartData', data);
        }
    }
</script>


<style scoped lang="scss">

</style>
