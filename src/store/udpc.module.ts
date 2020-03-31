import { Module } from 'vuex';
import elastic from '../utils/elastic';
import Utils from '@/utils/utils'
import Axios from "axios";

const initialState: UDPCState = {
    dashboardData: {},
    filteredData: {},
    filters: {},
    loading: false,
    hmdkUrl: 'https://metaver.de/trefferanzeige?docuuid='
};

const udpcModule: Module<UDPCState, RootState> = {
    state: initialState,
    mutations: {},
    actions: {
        fetchRecentDataset: async (context) => {
            context.commit('SET_LOADING', true);

            let aggregations = await elastic.getRangeless('', '', '', 'datasets', 10, 'change_date');
            context.commit('SET_FILTERED_DATA', ['recentDatasets', {
                items: aggregations.hits.hits
                 .map((item: any) => ({ label: item._source.name, link: item._source.md_id})),
                action: 'md_id'
            }]);

            context.commit('SET_LOADING', false);
        },
        fetchTotalsByTopic: async (context, totalsTopic) => {
            context.commit('SET_LOADING', true);

            let aggregations = Object.prototype.hasOwnProperty.call(context.getters.dashboardData, 'totalTopicDatasets') ?
                context.getters.dashboardData['totalTopicDatasets'] : null;

            if (!aggregations) {
                const month = new Utils().date.getLastMonth();
                aggregations = await elastic.getRangeless('', '', month, 'datasets');
                aggregations = aggregations['aggregations'];
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

            const month = new Utils().date.getLastMonth();
            const aggregations = await elastic.getRangeful('', '', month, month, topTopic, 10, 'month', 'basemap');
            const topX = aggregations.top_x.buckets;

            context.commit('SET_INITIAL_DATA', ['totalDatasetsRangeTop', aggregations]);
            context.commit('SET_FILTERED_DATA', ['totalDatasetsRangeTop', {
                labels: topX.map((item: any) => item.key),
                datasets: [{
                    data: topX.map((item: any) => item.total_hits.value),
                    md_id: topX.map((item: any) => item.md_id.buckets[0].key)
                }]
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchTotalsByType: async (context, totalsType) => {
            context.commit('SET_LOADING', true);

            let currentMonth = new Utils().date.getCurrentMonth();
            let aggregations = await elastic.getRangeful('', '', '2000-01', currentMonth, totalsType, 100, 'year');

            context.commit('SET_INITIAL_DATA', ['totalDatasetsCount', aggregations]);
            context.commit('SET_FILTERED_DATA', ['totalDatasetsCount', {
                labels: aggregations['total_entities_and_hits'].buckets.map((item: any) =>
                    item.key_as_string.substr(0, item.key_as_string.indexOf('-'))),
                datasets: [{
                    data: aggregations['total_entities_and_hits'].buckets.map((item: any) => item.doc_count)
                }]
            }]);

            context.commit('SET_LOADING', false);
        },
        fetchRangefulData: async (context, params: { min: string, max: string, unit: string, category: string, chartId: string, tag_not?: string }) => {
            sanitizeRangefulParams(params);

            const aggregations = await elastic.getRangeful('', '', params.min, params.max, params.category, undefined, params.unit, params.tag_not);

            context.commit('SET_FILTERED_DATA', [params.chartId, {
                labels: aggregations.total_entities_and_hits.buckets.map((item: any) => {
                    return params.unit === 'year' ? item.key_as_string.substring(0, 4) : item.key_as_string;
                }),
                datasets: [{
                    data: aggregations.total_entities_and_hits.buckets.map((item: any) => item.total_hits.value)
                }]
            }]);
        },
        fetchVisitorsKPI: async (context) => {
            const month = new Utils().date.getLastMonth();
            const aggregations = await elastic.getRangeful('', '', month, month, 'visitors', undefined, 'month', undefined);
            context.commit('SET_FILTERED_DATA', ['visitorsKPI', aggregations.total_entities_and_hits.buckets[0].total_hits.value]);
        },
        fetchSensorsKPI: async (context) => {
            const response = await Axios.get('https://iot.hamburg.de/v1.0/Datastreams?$filter=not%20substringof(%27E-Roller%27,description)&$count=true');
            context.commit('SET_FILTERED_DATA', ['sensorsKPI', response.data['@iot.count']]);
        },
        fetchBaseMapKPI: async (context) => {
            const month = new Utils().date.getLastMonth();
            const aggregations = await elastic.getRangeful('', '', month, month, '', undefined, 'month', undefined, 'basemap');
            context.commit('SET_FILTERED_DATA', ['baseMapKPI', aggregations.total_entities_and_hits.buckets[0].total_hits.value]);
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

function sanitizeRangefulParams(params: { min: string, max: string, unit: string }) {
    // API requires 'YYYY-MM' format
    if (params.unit === 'year') {
        if (params.min.length === 4) {
            params.min += '-01';
        }
        if (params.max.length === 4) {
            params.max += '-01';
        }
    }
}
