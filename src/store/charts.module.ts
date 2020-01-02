import { Module } from 'vuex';
import elastic from '../utils/elastic';
import { aggregateData } from '../utils/utils';

export interface ChartsState {
    originalData: Dataset;
    dashData: Dataset;
    testData: { [key: string]: Dataset };
    filterValues: { [key: string]: any };
    filters: { [key: string]: any };
    loading: boolean;
}

const initialState: ChartsState = {
    originalData: [],
    dashData: [],
    testData: {
        osStats: []
    },
    filterValues: {},
    filters: {},
    loading: false
};

const chartsModule: Module<ChartsState, {}> = { // type of local state is 'ChartsState'
    state: { ...initialState },

    mutations: {
        SET_FILTERS: (state, [ident, values]) => {
            state.filters[ident] = values;
        },
        SET_ORIGINAL_DATA: (state, originalData: Dataset) => {
            state.originalData = originalData;
        },
        SET_DASH_DATA: (state, dashData: Dataset) => {
            state.dashData = dashData;
        },
        SET_OS_STATS: (state, data: Dataset) => {
            state.testData.osStats = data;
        },
        ADD_DASH_ELEMENT: (state, dataElement: any) => {
            state.dashData.push(dataElement);
        },
        SET_LOADING: (state, loading: boolean) => {
            state.loading = loading;
        }
    },

    actions: {
        setFilters: (context, [ident, values]) => {
            context.commit('SET_FILTERS', [ident, values]);
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

            context.commit('SET_OS_STATS', top10);
            context.commit('SET_LOADING', false);
        }
    },

    getters: {
        originalData: state => {
            return state.originalData
        },
        dashData: state => {
            return state.dashData
        },
        testData: state => {
            return state.testData
        },
        filterValues: state => {
            return state.filterValues
        },
        getDataByFilter: state => (property: string, value: any) => {
            return state.dashData.filter(element => element[property] === value)
        },
        getPropertyData: state => (property: string) => {
            let valuesForProperty = [];
            for (let obj of state.originalData) {
                valuesForProperty.push(obj[property])
            }
            return valuesForProperty;
        },
        loading: state => {
            return state.loading
        }
    }
};

export default chartsModule;
