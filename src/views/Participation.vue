<template>
    <div class="container">
        <div class="row">
            top
        </div>
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
                <stats-card data-background-color="blue" class="chart-holder">
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
                </stats-card>
            </div>
            <div class="col-sm">
                <stats-card data-background-color="blue" class="chart-holder">
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
                        <!--                        <line-chart v-bind:ds="this.testData.osStats" v-bind:options="options" v-bind:origins="['anzahl_os']"-->
                        <!--                                    title="Distribution of operating systems"-->
                        <!--                                    metric="anzahl_os" descriptor="os"-->
                        <!--                                    selector="chart2" holder-element="chart-holder"/>-->
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
    import Component from "vue-class-component";
    import StatsCard from "../components/StatsCard.vue";
    import MultiSelect from "../components/MultiSelect.vue";
    import LineChart from "../components/charts/LineChart.vue";
    import BarChart from "../components/charts/chartjs/BarChart.vue";
    import partStore from '../store/participation.module';
    import AbstractDashboard from "@/views/AbstractDashboard.vue";
    import { messages } from '@/messages/messages.participation.module';

    @Component({
        components: {
            StatsCard,
            MultiSelect,
            BarChart,
            LineChart
        }
    })
    export default class Participation extends AbstractDashboard {
        chartData: { [key: string]: Chart.ChartData } = {
            participationDistrictCount: {}
        };
        chartOptions: { [key: string]: Chart.ChartOptions } = {
            participationDistrictCount: {
                title: {
                    text: 'Public participation procedures'
                },
                responsive: true
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
                            this.chartData.participationDistrictCount = mutation.payload[1];
                        }
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

    /*    h1, h2 {
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
        }*/

</style>
