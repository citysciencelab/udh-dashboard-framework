import { Module } from 'vuex';
import {countData} from '@/utils/utils';
import wfs from "@/utils/wfs";

const wfsUrl: string = 'HH_WFS_Beteiligungsverfahren';
const wfsTypename = 'beteiligungsverfahren';
const dataPropertyNames = ['ebene', 'absender', 'bezirk', 'bezeichnung', 'zustaendigkeit', 'gebiet', 'planverfahren', 'beteiligungsformate', 'status', 'start',
    'ende', 'online___zahl_der_beitraege', 'link', 'kontaktpersonen'];
const prefix = 'de.hh.up';
const baseNodes = ['wfs:FeatureCollection', 'gml:featureMember'];

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
    mutations: {
        SET_LOADING: (state, loading: boolean) => {
            state.loading = loading;
        }
    },
    actions: {
        fetchParticipationStats: async (context) => {
            const results = await wfs.get(wfsUrl, wfsTypename, []);
            const resultExtract = wfs.getDataFromWFSJson(results as Object[], wfsTypename, dataPropertyNames, prefix, baseNodes);

            context.commit('SET_INITIAL_DATA', ['participationData', resultExtract]);

            context.dispatch('recalculateChartData', resultExtract);
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
    getters: {
        loading: state => {
            return state.loading
        }
    }
};

export default participationModule;
