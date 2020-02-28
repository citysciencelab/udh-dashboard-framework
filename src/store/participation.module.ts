import { Module } from 'vuex';
import {countData} from '@/utils/utils';
import wfs from "@/utils/wfs";

const wfsUrl: string = 'HH_WFS_Beteiligungsverfahren';
const wfsTypename = 'beteiligungsverfahren';

const initialState: ParticipationState = {
    dashboardData: {
        participationData: []
    },
    filteredData: {
        participationDistrictCount: {}
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

            context.commit('SET_INITIAL_DATA', ['participationData', results.getProperties()]);
            context.commit('SET_FILTERED_DATA', ['participationData', results.getProperties()]);
            context.commit('SET_FILTERED_DATA', ['participationDistrictCount', countData(results.getProperties(), 'bezirk')]);

            context.dispatch('recalculateChartData', results.getProperties());
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
