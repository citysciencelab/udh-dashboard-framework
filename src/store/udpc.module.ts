// @ts-nocheck
// TODO: adapt module for chart.js

import { Module } from 'vuex';
import elastic from '../utils/elastic';

const initialState: UDPCState = {
    dashboardData: {},
    filteredData: {},
    filters: {},
    loading: false
};

const udpcModule: Module<UDPCState, RootState> = {
    state: initialState,
    mutations: {
        SET_LOADING: (state, loading: boolean) => {
            state.loading = loading;
        }
    },
    actions: {
        fetchTotalDatasets: async (context) => {
            context.commit('SET_LOADING', true);

            // example
            const aggregations = await elastic.getRangeless('', '', '2020-01', 'datasets');
            console.log(aggregations)

            context.commit('SET_INITIAL_DATA', ['totalDatasets', aggregations]);
            context.commit('SET_FILTERED_DATA', ['totalDatasets', {
                datasets: [{
                    tree: aggregations.theme.buckets
                }]
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchTotalDatasetsRange: async (context) => {
            context.commit('SET_LOADING', true);

            // example
            const aggregations = await elastic.getRangeful('', '', '2019-01', '2019-12', 'datasets', 10, 'month');
            const topX = aggregations.top_x.buckets;

            context.commit('SET_INITIAL_DATA', ['totalDatasetsRangeTop', aggregations]);

            context.commit('SET_FILTERED_DATA', ['totalDatasetsRangeTop', {
                labels: topX.map(item => item.key),
                datasets: [{
                    data: topX.map(item => item.total_hits.value)
                }]
            }]);

            // console.log(aggregations)
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
