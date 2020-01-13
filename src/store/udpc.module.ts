import { Module } from 'vuex';
import elastic from '../utils/elastic';
import { aggregateData } from '@/utils/utils';
import { RootState } from './store';
import {DashboardState} from "@/store/dashboard.module";

export interface UDPCState extends DashboardState {
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
        SET_LOADING: (state, loading: boolean) => {
            state.loading = loading;
        }
    },
    actions: {
        fetchAppStats: async (context) => {
            context.commit('SET_LOADING', true);

            const params = {
                ressourceType: 'apps',
                start_date: context.state.filters['YEAR'][0],
                end_date: context.state.filters['YEAR'][1],
                intervall: 'year'
            };

            const results = await elastic.getFromTemplate('dbquery', params);

            // Aggregating and sorting is expected to be done by the backend,
            // but for the sake of testing it is hardcoded here ...
            const aggregated = aggregateData(results, 'os', 'anzahl_os');
            const top10 = aggregated.sort((a, b) => b.anzahl_os - a.anzahl_os).slice(0, 10);

            context.commit('SET_INITIAL_DATA', ['apps', top10]);
            context.commit('SET_FILTERED_DATA', ['apps', top10]);
            context.commit('SET_LOADING', false);
        },
        fetchOsStats: async (context) => {
            context.commit('SET_LOADING', true);

            const params = {
                month:  context.getters.filters['MONTH'],
                year: context.getters.filters['YEAR'],
                quelle: context.getters.filters['SOURCE']
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
        loading: state => {
            return state.loading
        }
    }
};

export default udpcModule;
