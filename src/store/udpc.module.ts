import { Module } from 'vuex';
import elastic from '../connectors/elastic';
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
        fetchRecentDatasets: async (context) => {
            const chartId = 'recentDatasets';

            context.commit('SET_LOADING', true);

            const elasticResponse = await elastic.udpcQuery('', '', [], [], [], [], 'datasets', undefined, 10, 'change_date');

            context.commit('SET_FILTERED_DATA', [chartId, {
                items: elasticResponse.hits.hits
                 .map((item: any) => ({ label: item._source.name, link: item._source.md_id})),
                action: 'md_id'
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchTotalsByTopic: async (context, params: { totalsTopic: string, theme: string[], org: string[], isIncludeBuildPlans: boolean }) => {
            const chartId = 'totalTopicDatasets';
            const changed = await context.dispatch('paramsChanged', [chartId, params]);
            if (!changed) return;

            context.commit('SET_LOADING', true);

            const tagNot = params.isIncludeBuildPlans ? [''] : ['bplan'];
            const month = new Utils().date.getLastMonth();

            const elasticResponse = await elastic.udpcQuery(month, month, params.theme, params.org, [], tagNot, 'datasets');
            const aggregations = elasticResponse.aggregations;

            context.commit('SET_INITIAL_DATA', [chartId, aggregations]);
            context.commit('SET_FILTERED_DATA', [chartId, {
                datasets: [{
                    tree: aggregations[params.totalsTopic].buckets
                }]
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchTotalsByType: async (context, params: { totalsType: string, theme: string[], org: string[], isIncludeBuildPlans: boolean, tag: string[] }) => {
            const chartId = 'totalDatasetsCount';
            const changed = await context.dispatch('paramsChanged', [chartId, params]);
            if (!changed) return;

            context.commit('SET_LOADING', true);

            const tagNot = params.isIncludeBuildPlans ? [''] : ['bplan'];
            const currentMonth = new Utils().date.getCurrentMonth();

            const elasticResponse = await elastic.udpcQuery('2000-01', currentMonth, params.theme, params.org, params.tag, tagNot, params.totalsType, 'year', 100);
            const aggregations = elasticResponse.aggregations;

            context.commit('SET_INITIAL_DATA', [chartId, aggregations]);
            context.commit('SET_FILTERED_DATA', [chartId, {
                labels: aggregations.total_entities_and_hits.buckets.map((item: any) =>
                    item.key_as_string.substr(0, item.key_as_string.indexOf('-'))),
                datasets: [{
                    data: aggregations.total_entities_and_hits.buckets.map((item: any) => item.entities_unique.value)
                }]
            }]);
            context.commit('SET_LOADING', false);
        },
        fetchTops: async (context, params: { topTopic: string, theme: string[], org: string[] }) => {
            const chartId = 'totalDatasetsRangeTop';
            const changed = await context.dispatch('paramsChanged', [chartId, params]);
            if (!changed) return;

            context.commit('SET_LOADING', true);

            const month = new Utils().date.getLastMonth();

            const elasticResponse = await elastic.udpcQuery(month, month, params.theme, params.org, [], ['basemap'], params.topTopic, 'month', 10);
            const aggregations = elasticResponse.aggregations;
            const topX = aggregations?.top_x?.buckets;

            const details: DidYouKnowData = {
                items: [],
                action: null
            };
            topX.map((item: any) => details.items.push({
                label: item.key,
                link: params.topTopic !== 'downloads' ? item.md_id?.buckets?.[0]?.key : item.key
            }));

            context.commit('SET_INITIAL_DATA', [chartId, aggregations]);
            let dataSets = [{}];
            if (params.topTopic === 'datasets') {
                dataSets = [{
                    label: 'internet',
                    data: topX.map((item: any) => item.total_internet.value),
                    md_id: topX.map((item: any) => item.md_id?.buckets?.[0]?.key)
                },{
                    label: 'intranet',
                    backgroundColor : '#7FADD4',
                    data: topX.map((item: any) => item.total_intranet.value),
                    md_id: topX.map((item: any) => item.md_id?.buckets?.[0]?.key)
                }]
            } else {
                dataSets = [{
                    data: topX.map((item: any) => item.total_hits.value),
                    md_id: topX.map((item: any) => item.md_id?.buckets?.[0]?.key)
                }]
            }
            context.commit('SET_FILTERED_DATA', [chartId, {
                labels: topX.map((item: any) => item.key),
                datasets: dataSets
            }]);
            context.commit('SET_FILTERED_DATA', [chartId+'-overlay-details', details]);
            context.commit('SET_LOADING', false);
        },
        fetchRangefulData: async (context, params: { theme: string[], org: string[], min: string, max: string, unit: string, category: string, chartId: string, tag_not: string[] }) => {
            new Utils().request.sanitizeRangefulParams(params);

            const changed = await context.dispatch('paramsChanged', [params.chartId, params]);
            if (!changed) return;

            const elasticResponse = await elastic.udpcQuery(params.min, params.max, params.theme, params.org, [], params.tag_not, params.category, params.unit);
            const aggregations = elasticResponse.aggregations;
            let dataSets = [{}];

            if (params.chartId === 'totalDatasets') {
                dataSets = [{
                    label: 'internet',
                    data: aggregations.total_entities_and_hits.buckets.map((item: any) => item.total_internet.value)
                },{
                    label: 'intranet',
                    backgroundColor : '#7FADD4',
                    data: aggregations.total_entities_and_hits.buckets.map((item: any) => item.total_intranet.value)
                }]
            } else {
                dataSets = [{
                    data: aggregations.total_entities_and_hits.buckets.map((item: any) => item.total_hits.value)
                }]
            }

            context.commit('SET_FILTERED_DATA', [params.chartId, {
                labels: aggregations.total_entities_and_hits.buckets.map((item: any) => {
                    return params.unit === 'year' ? item.key_as_string.substring(0, 4) : item.key_as_string;
                }),
                datasets: dataSets
            }]);
        },
        fetchFacts: async (context) => {
            const chartId = 'didYouKnowFacts';
            const month = new Utils().date.getCurrentMonth();

            const elasticResponse = await elastic.udpcQuery(month, month, [], [], [], [], 'info', undefined, 10);
            const topX = elasticResponse.aggregations.top_x.buckets;
            let items: object[] = [];
            
            topX.map((item: any) => items.push({label: item.key}))
            context.commit('SET_FILTERED_DATA', [chartId, items]);
        },
        fetchVisitorsKPI: async (context) => {
            const chartId = 'visitorsKPI';
            const month = new Utils().date.getLastMonth();

            const elasticResponse = await elastic.udpcQuery(month, month, [], [], [], [], 'visitors', 'month');
            const aggregations = elasticResponse.aggregations;

            try {
                context.commit('SET_FILTERED_DATA', [chartId, aggregations.total_entities_and_hits.buckets[0].total_hits.value]);
            } catch (e) {
                context.commit('SET_FILTERED_DATA', [chartId, null]);
            }
        },
        fetchSensorsKPI: async (context) => {
            const chartId = 'sensorsKPI';
            const response = await Axios.get('https://iot.hamburg.de/v1.0/Datastreams?$filter=not%20substringof(%27E-Roller%27,description)&$count=true');

            try {
                context.commit('SET_FILTERED_DATA', [chartId, response.data['@iot.count']]);
            } catch (e) {
                context.commit('SET_FILTERED_DATA', [chartId, null]);
            }
        },
        fetchBaseMapKPI: async (context) => {
            const chartId = 'baseMapKPI';
            const month = new Utils().date.getLastMonth();
            const elasticResponse = await elastic.udpcQuery(month, month, [], [], ['basemap'], [], '', 'month');
            const aggregations = elasticResponse.aggregations;
            const details: DidYouKnowData = {
                items: [],
                action: null
            };
            aggregations.top_x.buckets.map((item: any) => details.items.push({label: item.key, link: item.md_id.buckets[0].key}));
            try {
                context.commit('SET_FILTERED_DATA', [chartId, aggregations.total_entities_and_hits.buckets[0].total_hits.value]);
                context.commit('SET_FILTERED_DATA', [chartId + '-overlay-details', details]);
            } catch (e) {
                context.commit('SET_FILTERED_DATA', [chartId, null]);
            }
        },
        paramsChanged: (context, args: [string, any]) => {
            const id = args[0];
            const params = JSON.stringify(args[1]);
            const changed = params !== context.state.filters[id];
            context.state.filters[id] = params;
            return changed;
        }
    },
    getters: {}
};

export default udpcModule;
