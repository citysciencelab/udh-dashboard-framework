import { Module } from 'vuex';
import { RootState } from './store';
import {DashboardState} from "@/store/dashboard.module";
import {countData} from '@/utils/utils';
import wfs from "@/utils/wfs";

const wfsUrl: string = 'HH_WFS_Beteiligungsverfahren';
const wfsTypename = 'beteiligungsverfahren';
const dataPropertyNames = ['ebene', 'absender', 'bezirk', 'bezeichnung', 'zustaendigkeit', 'gebiet', 'planverfahren', 'beteiligungsformate', 'status', 'start',
    'ende', 'online___zahl_der_beitraege', 'link', 'kontaktpersonen'];
const prefix = 'de.hh.up';
const baseNodes = ['wfs:FeatureCollection', 'gml:featureMember'];

export interface ParticipationState extends DashboardState {
    loading: boolean;
}

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
            const results = await wfs.get(wfsUrl, wfsTypename, dataPropertyNames);
            const resultExtract = wfs.getDataFromWFSJson(results as Object[], wfsTypename, dataPropertyNames, prefix, baseNodes);
            console.log("EXTRAKT!!!", resultExtract);
            context.commit('SET_INITIAL_DATA', ['participationData', resultExtract]);
            context.commit('SET_FILTERED_DATA', ['participationDistrictCount', countData(resultExtract, 'bezirk')]);
        },
        applyFilter: (context, [id, accessor]) => {
            /*const results = await wfs.get();
            console.log("ddd", results)
            context.commit('SET_PARTICIPATION_STATS', results);*/
        }
    },
    getters: {
        loading: state => {
            return state.loading
        }
    }
};

export default participationModule;
