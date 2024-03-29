import { Module } from 'vuex';
import {countData} from '@/utils/utils';
import {FeatureSet} from "@/connectors/wfs";
import wfs from "@/connectors/wfs";

const wfsUrl: string = 'HH_WFS_Beteiligungsverfahren';
const wfsTypename = 'beteiligungsverfahren';

const initialState: ParticipationState = {
    dashboardData: {
        participationData: [],
        participationMapData: [],
    },
    filteredData: {
        participationDistrictCount: {},
        participationDistrictCountTree: {}
    },
    filters: {},
    loading: false
};

const participationModule: Module<ParticipationState, RootState> = {
    state: { ...initialState },
    mutations: {    },
    actions: {
        /*
            Fetches data from a given wfs by url
         */
        fetchParticipationStats: async (context) => {
            const results: FeatureSet = await wfs.get(wfsUrl, wfsTypename, {}) as FeatureSet;

            context.dispatch('recalculateChartData', results.getProperties());
            context.commit('SET_INITIAL_DATA', ['participationData', results.getProperties()]);
            context.commit('SET_INITIAL_DATA', ['participationMapData', results]);
        },
        /*
            Recalculates a given dataset and creates a count by 'bezirk'
         */
        recalculateChartData: (context, filteredData) => {
            if (!filteredData) {
                return;
            }
            const countdata = countData(filteredData, 'bezirk');
            context.commit('SET_FILTERED_DATA', ['participationDistrictCount', {
                labels: countdata.map(item => item.bezirk),
                datasets: [{
                    data: countdata.map(item => item.count)
                }]
            }]);
            context.commit('SET_FILTERED_DATA', ['participationDistrictCountTree', {
                datasets: [{
                    tree: countdata
                }]
            }]);
        },
        /*
            Applies given filters to the data to be displayed in the masterportal map component
         */
        recalculateMapData: (context) => {
            const filters = context.getters.filters(),
             initialData = context.getters.dashboardData()['participationMapData'];

            if (Object.keys(filters).length !== 0) {
                let newFilteredData: object[] = initialData;
                for (const filterId of Object.keys(filters)) {
                    const filterFunction = (item: Datum) => filters[filterId].indexOf(item.values_[filterId]) > -1;
                    newFilteredData = newFilteredData.filter(filterFunction);
                }
                context.commit('SET_FILTERED_DATA', ['participationMapData', newFilteredData]);
            } else {
                context.commit('SET_FILTERED_DATA', ['participationMapData', initialData]);
            }
        }
    },
    getters: {    }
};

export default participationModule;
