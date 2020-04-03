import { Module } from 'vuex';
import elastic from '../utils/elastic';
import Utils from '@/utils/utils'
import Axios from "axios";

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
        fetchRecentDataset: async (context) => {
            context.commit('SET_LOADING', true);

            // geht noch nicht mit top
           const aggregations = await elastic.getRangeful('', '', '', '', 'datasets', undefined, '', '', '', 'change_date', 10);
            // let aggregations = await elastic.getRangeless('', '', '', 'datasets', 10, 'change_date');
            context.commit('SET_FILTERED_DATA', ['recentDatasets', {
                items: aggregations.hits.hits
                 .map((item: any) => ({ label: item._source.name, link: item._source.md_id})),
                action: 'map'
            }]);

            context.commit('SET_LOADING', false);
        },
        fetchTotalsByTopic: async (context, params: { totalsTopic: string, theme: string, org: string, isIncludeBuildPlans: boolean }) => {
            context.commit('SET_LOADING', true);

            const tagNot = params.isIncludeBuildPlans ? '' : 'bplan';
            const month = new Utils().date.getLastMonth();

            const elasticResponse = await elastic.getRangeful(params.theme, params.org, month, month, 'datasets', undefined, '', tagNot);
            const aggregations = elasticResponse.aggregations;

            context.commit('SET_INITIAL_DATA', ['totalTopicDatasets', aggregations]);
            context.commit('SET_FILTERED_DATA', ['totalTopicDatasets', {
                datasets: [{
                    tree: aggregations[params.totalsTopic].buckets
                }]
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchTops: async (context, topTopic: string) => {
            context.commit('SET_LOADING', true);

            const month = new Utils().date.getLastMonth();

            const elasticResponse = await elastic.getRangeful('', '', month, month, topTopic, 10, 'month', 'basemap');
            const aggregations = elasticResponse.aggregations;
            const topX = aggregations.top_x.buckets;

            context.commit('SET_INITIAL_DATA', ['totalDatasetsRangeTop', aggregations]);
            context.commit('SET_FILTERED_DATA', ['totalDatasetsRangeTop', {
                labels: topX.map((item: any) => item.key),
                datasets: [{
                    data: topX.map((item: any) => item.total_hits.value),
                    md_id: topX.map((item: any) => item.md_id.buckets[0] ? item.md_id.buckets[0].key : undefined)
                }]
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchTotalsByType: async (context, params: { totalsType: string, theme: string, org: string, isIncludeBuildPlans: boolean }) => {
            context.commit('SET_LOADING', true);

            const tagNot = params.isIncludeBuildPlans ? '' : 'bplan';
            const currentMonth = new Utils().date.getCurrentMonth();

            const elasticResponse = await elastic.getRangeful(params.theme, params.org, '2000-01', currentMonth, params.totalsType, 100, 'year', tagNot);
            const aggregations = elasticResponse.aggregations;

            context.commit('SET_INITIAL_DATA', ['totalDatasetsCount', aggregations]);
            context.commit('SET_FILTERED_DATA', ['totalDatasetsCount', {
                labels: aggregations.total_entities_and_hits.buckets.map((item: any) =>
                    item.key_as_string.substr(0, item.key_as_string.indexOf('-'))),
                datasets: [{
                    data: aggregations.total_entities_and_hits.buckets.map((item: any) => item.entities_unique.value)
                }]
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchRangefulData: async (context, params: { theme: string, org: string, min: string, max: string, unit: string, category: string, chartId: string, tag_not?: string }) => {
            sanitizeRangefulParams(params);

            const elasticResponse = await elastic.getRangeful(params.theme, params.org, params.min, params.max, params.category, undefined, params.unit, params.tag_not);
            const aggregations = elasticResponse.aggregations;

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
            let aggregations = await elastic.getRangeful('', '', month, month, 'visitors', undefined, 'month', undefined);
            aggregations = aggregations['aggregations'];
            try {
                context.commit('SET_FILTERED_DATA', ['visitorsKPI', aggregations.total_entities_and_hits.buckets[0].total_hits.value]);
            } catch (e) {
                context.commit('SET_FILTERED_DATA', ['visitorsKPI', null]);
            }
        },
        fetchSensorsKPI: async (context) => {
            const response = await Axios.get('https://iot.hamburg.de/v1.0/Datastreams?$filter=not%20substringof(%27E-Roller%27,description)&$count=true');
            try {
                context.commit('SET_FILTERED_DATA', ['sensorsKPI', response.data['@iot.count']]);
            } catch (e) {
                context.commit('SET_FILTERED_DATA', ['sensorsKPI', null]);
            }
        },
        fetchBaseMapKPI: async (context) => {
            const month = new Utils().date.getLastMonth();
            let aggregations = await elastic.getRangeful('', '', month, month, '', undefined, 'month', undefined, 'basemap');
            aggregations = aggregations['aggregations'];
            try {
                context.commit('SET_FILTERED_DATA', ['baseMapKPI', aggregations.total_entities_and_hits.buckets[0].total_hits.value]);
            } catch (e) {
                context.commit('SET_FILTERED_DATA', ['baseMapKPI', null]);
            }
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
