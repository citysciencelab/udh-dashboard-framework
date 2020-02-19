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
        participationDistrictCount: []
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
            const results: any = await wfs.get(wfsUrl, wfsTypename, []);
            const resultExtract = wfs.getDataFromWFSJson(results as any[], wfsTypename, dataPropertyNames, prefix, baseNodes);

            context.commit('SET_INITIAL_DATA', ['participationData', resultExtract]);
            context.commit('SET_FILTERED_DATA', ['participationData', resultExtract]);
            context.commit('SET_FILTERED_DATA', ['participationDistrictCount', countData(resultExtract, 'bezirk')]);
        },
        recalculateWithFilters: (context) => {
            const filteredData = context.getters.dataWithAppliedFilters('participationData');
            context.commit('SET_FILTERED_DATA', ['participationDistrictCount', countData(filteredData, 'bezirk')]);
            // This would set all filter - but the resulting limitation seems wrong
            context.commit('SET_FILTERED_DATA', ['participationData', filteredData]);
        }
    },
    getters: {
        loading: state => {
            return state.loading
        }
    }
};

export default participationModule;
