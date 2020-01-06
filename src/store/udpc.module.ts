import { Module } from 'vuex';
import elastic from '../utils/elastic';
import { aggregateData } from '../utils/utils';
import { RootState } from './store';

export interface UDPCState {
    testData: { [key: string]: Dataset };
    loading: boolean;
}

const initialState: UDPCState = {
    testData: {
        osStats: []
    },
    loading: false
};

const udpcModule: Module<UDPCState, RootState> = {
    state: { ...initialState },
    mutations: {
        SET_OS_STATS: (state, data) => {
            state.testData.osStats = data;
        },
        SET_LOADING: (state, loading) => {
            state.loading = loading;
        }
    },
    actions: {
        fetchOsStats: async (context) => {
            context.commit('SET_LOADING', true);

            const params = {
                month: context.rootState.charts.filters['MONTH'],
                year: context.rootState.charts.filters['YEAR'],
                quelle: context.rootState.charts.filters['SOURCE']
            };
            // Convert range filters
            params.year = `[${params.year[0]} TO ${params.year[1] || params.year[0]}]`;
            params.month = `[${params.month[0]} TO ${params.month[1] || params.month[0]}]`;

            const results = await elastic.get(params);

            // Aggregating and sorting is expected to be done by the backend,
            // but for the sake of testing it is hardcoded here ...
            const aggregated = aggregateData(results, 'os', 'anzahl_os');
            const top10 = aggregated.sort((a, b) => b.anzahl_os - a.anzahl_os).slice(0, 10);

            context.commit('SET_OS_STATS', top10);
            context.commit('SET_LOADING', false);
        },
        filterOsStats(context) {
            context.commit('SET_LOADING', true);

            // Static - we could just get all possible filters here - no hard coded names
            const osFilter = context.rootGetters.filters['os'];
            // EXAMPLE setting of filters for a datasource that is complete with first request (Partizipations-Dashboard)
            const newOsData = context.rootGetters.getDataByFilters(context.getters.getOsStats, 'os', osFilter);

            // We obviously need a concept of original data and filtered data (dashData)
            // BUT - is this generally a concept that we can work with?
            context.commit('SET_OS_STATS', newOsData);
            context.commit('SET_LOADING', false);
        }
    },
    getters: {
        getOsStats: state => {
            return state.testData.osStats
        },
        testData: state => {
            return state.testData
        },
        loading: state => {
            return state.loading
        }
    }
};

export default udpcModule;
