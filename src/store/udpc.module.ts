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

            context.commit('SET_INITIAL_DATA', ['totalDatasets', aggregations]);
            context.commit('SET_FILTERED_DATA', ['totalDatasets', {
                labels: aggregations.organization.buckets.map(item => item.key),
                datasets: [{
                    data: aggregations.organization.buckets.map(item => item.doc_count)
                }]
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchTotalDatasetsRange: async (context) => {
            context.commit('SET_LOADING', true);

            // example
            const aggregations = await elastic.getRangeful('', '', '2019-01', '2019-12', 'datasets', 10, 'month');

            context.commit('SET_INITIAL_DATA', ['totalDatasetsRange', aggregations]);
            context.commit('SET_FILTERED_DATA', ['totalDatasetsRange', aggregations]);
            //TODO some aggregation here as well - as shown in the example above
/*
            context.commit('SET_FILTERED_DATA', ['totalDatasetsRange', {
                labels: aggregations.organization.buckets.map(item => item.###),
                datasets: [{
                    data: aggregations.organization.buckets.map(item => item.###)
                }]
            }]);
            */


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
