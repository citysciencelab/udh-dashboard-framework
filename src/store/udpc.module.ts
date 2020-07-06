import { Module } from 'vuex';
import elastic from '@/connectors/elastic';
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
        /*
            Requests the recently added datasets
         */
        fetchRecentDatasets: async (context) => {
            const chartId = 'recentDatasets';
            context.commit('SET_LOADING', true);
            const lastMonth = new Utils().date.getLastMonth();

            const elasticResponse = await elastic.udpcQuery(lastMonth, lastMonth, [], [], [], [], 'datasets', undefined, 10, 'create_date', ['online']);

            context.commit('SET_FILTERED_DATA', [chartId, {
                items: elasticResponse.hits.hits
                 .map((item: any) => ({ label: item._source.name, link: item._source.md_id})),
                action: 'md_id'
            }]);
            context.commit('SET_LOADING', false);
        },
        /*
            Requests total resource count by topic: 'topics' or 'organizations'
            The requested can be filtered by either of the above
         */
        fetchTotalsByTopic: async (context, params: { totalsTopic: string, theme: string[], org: string[], isIncludeBuildPlans: boolean }) => {
            const chartId = 'totalTopicDatasets';
            const changed = await context.dispatch('paramsChanged', [chartId, params]);
            if (!changed) return;

            context.commit('SET_LOADING', true);

            const tagNot = params.isIncludeBuildPlans ? [''] : ['bplan'];
            const month = new Utils().date.getLastMonth();

            const elasticResponse = await elastic.udpcQuery(month, month, params.theme, params.org, [], tagNot, 'datasets');
            const aggregations = elasticResponse.aggregations;
            let dataSets = [{
                tree: aggregations[params.totalsTopic].buckets
            }];
            if (params.totalsTopic === 'organization') {
                for (const dataSet of dataSets[0].tree) {
                    if (Object.prototype.hasOwnProperty.call(dataSet, 'label_org')) {
                        dataSet.label_short = dataSet.label_org.buckets[0].key;
                    }
                }
            }

            context.commit('SET_INITIAL_DATA', [chartId, aggregations]);
            context.commit('SET_FILTERED_DATA', [chartId, {
                datasets: dataSets
            }]);
            context.commit('SET_LOADING', false);
        },
        /*
            Requests resource count by type: 'datasets', 'apps', 'sensors'
            The data is structured by year of creation
         */
        fetchTotalsByType: async (context, params: { totalsType: string, theme: string[], org: string[], tag: string[] , tagNot: string[], status: string[] }) => {
            const chartId = 'totalDatasetsCount';
            const changed = await context.dispatch('paramsChanged', [chartId, params]);
            if (!changed) return;

            context.commit('SET_LOADING', true);

            const currentMonth = new Utils().date.getCurrentMonth();
            const elasticResponse = await elastic.udpcQuery('2000-01', currentMonth, params.theme, params.org, params.tag, params.tagNot, params.totalsType, 'year', 100, undefined, params.status);
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
        /*
            Fetches the most accessed resources by type: 'datasets', 'apps', 'downloads'
            The number of requested resources as well as the monitored time period can be adjusted
            For datasets it currently divides the requested data by intranet and internet resources
         */
        fetchTops: async (context, params: { topTopic: string, theme: string[], org: string[], tag_not: string[] }) => {
            const chartId = 'totalDatasetsRangeTop';
            const changed = await context.dispatch('paramsChanged', [chartId, params]);
            if (!changed) return;

            context.commit('SET_LOADING', true);

            const month = new Utils().date.getLastMonth();

            const elasticResponse = await elastic.udpcQuery(month, month, params.theme, params.org, [], params.tag_not, params.topTopic, 'month', 10);
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
                    label: 'Internet',
                    data: topX.map((item: any) => item.total_internet.value),
                    md_id: topX.map((item: any) => item.md_id?.buckets?.[0]?.key)
                },{
                    label: 'Intranet der FHH',
                    backgroundColor : '#7FADD4',
                    data: topX.map((item: any) => item.total_intranet.value),
                    md_id: topX.map((item: any) => item.md_id?.buckets?.[0]?.key)
                }]
            } else {
                dataSets = [{
                    data: topX.map((item: any) => item.total_hits.value),
                    md_id: topX.map((item: any) => {
                        if (params.topTopic === 'downloads') {
                            return item.key;
                        }
                        return item.md_id?.buckets?.[0]?.key;
                    })
                }]
            }
            context.commit('SET_FILTERED_DATA', [chartId, {
                labels: topX.map((item: any) => item.key),
                datasets: dataSets
            }]);
            context.commit('SET_FILTERED_DATA', [chartId+'-overlay-details', details]);
            context.commit('SET_LOADING', false);
        },
        /*
            Fetches total access numbers by resources type: 'datasets', 'apps', 'downloads'
            The request can be altered by adjusting the time-frame
            The datasets totals are divided into intranet and internet
         */
        fetchRangefulData: async (context, params: { theme: string[], org: string[], min: string, max: string, unit: string, category: string, chartId: string, tag_not: string[] }) => {
            new Utils().request.sanitizeRangefulParams(params);

            const changed = await context.dispatch('paramsChanged', [params.chartId, params]);
            if (!changed) return;

            const elasticResponse = await elastic.udpcQuery(params.min, params.max, params.theme, params.org, [], params.tag_not, params.category, params.unit);
            const aggregations = elasticResponse.aggregations;
            let dataSets = [{}];

            if (params.chartId === 'totalDatasets') {
                dataSets = [{
                    label: 'Internet',
                    backgroundColor : '#FF00FF',
                    data: aggregations.total_entities_and_hits.buckets.map((item: any) => item.total_internet.value)
                },{
                    label: 'Intranet der FHH',
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
        /*
            Fetches facts from the given elastic endpoint
         */
        fetchFacts: async (context) => {
            const utils =  new Utils();
            const chartId = 'didYouKnowFacts';
            const lang = utils.string.languages[context.rootState.dashboard?.locale || 'de']
            const month = utils.date.getCurrentMonth();
            const elasticResponse = await elastic.udpcQuery(month, month, [], [], [lang], [], 'info', undefined, 10);
            const topX = elasticResponse.aggregations.top_x.buckets;
            let items: object[] = [];
            
            topX.map((item: any) => items.push({label: item.key}))
            context.commit('SET_FILTERED_DATA', [chartId, items]);
        },
        /*
            Requests the total numbers of visitors to the urban data platform for the last month
         */
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
        /*
            Requests the total number of sensors from the sensorthings api
         */
        fetchSensorsKPI: async (context) => {
            const chartId = 'sensorsKPI';
            const response = await Axios.get('https://iot.hamburg.de/v1.0/Datastreams?$filter=not%20substringof(%27E-Roller%27,description)&$count=true');

            try {
                context.commit('SET_FILTERED_DATA', [chartId, response.data['@iot.count']]);
            } catch (e) {
                context.commit('SET_FILTERED_DATA', [chartId, null]);
            }
        },
        /*
            Requests total access count for resources tagged with basemap
         */
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
        /*
            Monitors if the underlying parameters for a request have been changed
            If no change has been detected, no new request to elastic has to be fired
         */
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
