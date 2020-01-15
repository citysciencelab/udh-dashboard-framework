<template>
    <div class="container">
        <div class="row">
            top
        </div>
        <div class="row" style="background-color: white">
            <div class="col-sm">
                <multi-select v-bind:selectData="this.getFilterOptions('participationData','bezirk')"
                              v-bind:label="$t('message.district')" @new_selection="filterChanged"
                              identifier="bezirk" ref="districtSelect"/>
            </div>
            <div class="col-sm">
                jghj
            </div>
        </div>
        <div class="row chart-row" style="height: 420px">
            <div class="col-sm">
                <stats-card data-background-color="blue" class="chart-holder">
                    <template slot="header">
                        <div class="tool-tip-header" @click="openToolTip('tooltip-os-data')">
                            OS Data
                        </div>
                        <md-icon class="info-icon" id="tooltip-os-data">
                            info_outline
                        </md-icon>
                    </template>

                    <template slot="content">
                        <bar-chart v-bind:ds="this.filteredData.participationDistrictCount"
                                   v-bind:options="chartOptions.countStats"
                                   v-bind:metric="chartOptions.countStats.metric"
                                   v-bind:descriptor="chartOptions.countStats.metric"
                                   title="Distribution of operating systems"
                                   selector="chart1" holder-element="chart-holder"/>
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
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";
    import StatsCard from "../components/StatsCard.vue";
    import MultiSelect from "../components/MultiSelect.vue";
    import LineChart from "../components/charts/LineChart.vue";
    import BarChart from "../components/charts/BarChart.vue";
    import partStore from '../store/participation.module';

    @Component({
        components: {
            StatsCard,
            MultiSelect,
            BarChart,
            LineChart
        }
    })
    export default class Participation extends Vue {
        filteredData = {
            participationDistrictCount: []
        };
        chartOptions = {
            countStats: {
                dim: 'bezirk',
                metric: 'count'
            }
        };

        created() {
            this.$store.registerModule('participation', partStore);
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'SET_FILTERED_DATA' && mutation.payload[1].length > 0) {

                    if (mutation.payload[0] === 'participationDistrictCount') {
                        this.filteredData.participationDistrictCount = mutation.payload[1];
                    } else if (mutation.payload[0] === 'participationData') {
                        this.$refs.districtSelect.updateComponent();
                    }

                }
            });
        }

        getFilterOptions(dataId: string, filterProperty: string) {
            if (!this.$store.getters.filteredDataById(dataId)) {
                return [];
            }
            return this.$store.getters.getDistinctPropertyValues(dataId, filterProperty);
        }

        async mounted() {
            // Lets fetch the initial dashboard data
            await this.fetchParticipationStats();
        }

        fetchParticipationStats() {
            this.$store.dispatch('fetchParticipationStats');
        }

        filterChanged() {
            // The new filters could be set here - so far the filter already does that itself
            // With the Listener (my watcher plugin) i was trying to avoid listening to the filter here, but doing it globally
            // this.filterOsStats();
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