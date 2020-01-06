import { Module } from 'vuex';
import elastic from '../utils/elastic';
import { aggregateData } from '../utils/utils';
import { RootState } from './store';

export interface UDPCState {
    dashboardData: { [key: string]: Dataset };
    filteredData: { [key: string]: Dataset };
    filters: { [key: string]: any };
    loading: boolean;
}

const initialState: UDPCState = {
    dashboardData: {
        osStats: []
    },
    filteredData: {
        osStats: []
    },
    filters: {},
    loading: false
};

const udpcModule: Module<UDPCState, RootState> = {
    state: { ...initialState },
    mutations: {
        SET_INITIAL_DATA: (state, [id, data]: [string, Dataset]) => {
            state.dashboardData[id] = data;
        },
        SET_FILTERED_DATA: (state, [id, data]: [string, Dataset]) => {
            state.filteredData[id] = data;
        },
        SET_FILTERS: (state, [id, values]) => {
            state.filters[id] = values;
        },
        SET_LOADING: (state, loading: boolean) => {
            state.loading = loading;
        }
    },
    actions: {
        setFilters: (context, [id, values]) => {
            context.commit('SET_FILTERS', [id, values]);
        },
        fetchOsStats: async (context) => {
            context.commit('SET_LOADING', true);

            const params = {
                month: context.state.filters['MONTH'],
                year: context.state.filters['YEAR'],
                quelle: context.state.filters['SOURCE']
            };
            // Convert range filters
            params.year = `[${params.year[0]} TO ${params.year[1] || params.year[0]}]`;
            params.month = `[${params.month[0]} TO ${params.month[1] || params.month[0]}]`;

            const results = await elastic.get(params);

            // Aggregating and sorting is expected to be done by the backend,
            // but for the sake of testing it is hardcoded here ...
            const aggregated = aggregateData(results, 'os', 'anzahl_os');
            const top10 = aggregated.sort((a, b) => b.anzahl_os - a.anzahl_os).slice(0, 10);

            context.commit('SET_INITIAL_DATA', ['osStats', top10]);
            context.commit('SET_FILTERED_DATA', ['osStats', top10]);
            context.commit('SET_LOADING', false);
        },
        applyFilter: (context, [id, accessor]) => {
            const filterFunction = (item: Datum) => context.state.filters[id].indexOf(item[accessor]) > -1;
            const filteredData = context.state.dashboardData[id].filter(filterFunction);

            context.commit('SET_FILTERED_DATA', [id, filteredData]);
        }
    },
    getters: {
        dashboardData: state => {
            return state.dashboardData
        },
        filteredData: state => {
            return state.filteredData
        },
        filters: state => {
            return state.filters
        },
        loading: state => {
            return state.loading
        }
    }
};

export default udpcModule;
