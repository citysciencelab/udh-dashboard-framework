import { Module } from 'vuex';
import {countData} from '@/utils/utils';
import {FeatureSet} from "@/utils/wfs";
import wfs from "@/utils/wfs";

const wfsUrl: string = 'HH_WFS_Beteiligungsverfahren';
const wfsTypename = 'beteiligungsverfahren';

const initialState: ParticipationState = {
    dashboardData: {
        participationData: [],
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
        fetchParticipationStats: async (context) => {
            const results: any = await wfs.get(wfsUrl, wfsTypename, []);

            context.dispatch('recalculateChartData', results.getProperties());
            context.commit('SET_INITIAL_DATA', ['participationData', results]);
        },
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
        }
    },
    getters: {    }
};

export default participationModule;
