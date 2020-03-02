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
    mutations: {},
    actions: {
        fetchTotalsByTopic: async (context, totalsTopic) => {
            context.commit('SET_LOADING', true);

            let aggregations = context.getters.dashboardData.hasOwnProperty('totalTopicDatasets') ?
                context.getters.dashboardData['totalTopicDatasets'] : null;

            if (!aggregations) {
                //TODO: Datum muss noch gesetzt werden - wahrscheinlich nach aktuellem Monat
                aggregations = await elastic.getRangeless('', '', '2020-01', 'datasets');
                context.commit('SET_INITIAL_DATA', ['totalTopicDatasets', aggregations]);
            }

            context.commit('SET_FILTERED_DATA', ['totalTopicDatasets', {
                datasets: [{
                    tree: aggregations[totalsTopic].buckets
                }]
            }]);

            context.commit('SET_LOADING', false);
        },
        fetchTops: async (context, topTopic) => {
            context.commit('SET_LOADING', true);

            //TODO: Datum muss noch gesetzt werden - wahrscheinlich nach aktuellem Monat
            const aggregations = await elastic.getRangeful('', '', '2019-01', '2019-12', topTopic, 10, 'month');
            const topX = aggregations.top_x.buckets;

            context.commit('SET_INITIAL_DATA', ['totalDatasetsRangeTop', aggregations]);
            context.commit('SET_FILTERED_DATA', ['totalDatasetsRangeTop', {
                labels: topX.map((item: any) => item.key),
                datasets: [{
                    data: topX.map((item: any) => item.total_hits.value)
                }]
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchTotalsByType: async (context, totalsType) => {
            context.commit('SET_LOADING', true);

            //TODO: Datum muss noch gesetzt werden - wahrscheinlich nach aktuellem Monat
            let aggregations = await elastic.getRangeful('', '', '2000-01', '2020-01', totalsType, 100, 'year');
            context.commit('SET_INITIAL_DATA', ['totalDatasetsCount', aggregations]);

            context.commit('SET_FILTERED_DATA', ['totalDatasetsCount', {
                labels: aggregations['total_entities_and_hits'].buckets.map((item: any) => item.key_as_string),
                datasets: [{
                    data: aggregations['total_entities_and_hits'].buckets.map((item: any) => item.doc_count)
                }]
            }]);

            context.commit('SET_LOADING', false);
        },
        applyFilter: (context, [id, accessor]) => {
            const filterFunction = (item: Datum) => context.state.filters[id].indexOf(item[accessor]) > -1;
            const filteredData = context.state.dashboardData[id].filter(filterFunction);

            context.commit('SET_FILTERED_DATA', [id, filteredData]);
        }
    },
    getters: {}
};

export default udpcModule;
