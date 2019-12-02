import elastic from '../utils/elastic';
import { aggregateData } from '../utils/utils';

const initialState = {
    originalData: [],
    dashData: [],
    testData: {
        osStats: []
    },
    filterValues: {},
    filters: {
        source: '',
        year: [], // interpreted as: [year[0] TO year[1]]
        month: [] // interpreted as: [month[0] TO month[1]]
    },
    loading: false
};

const state = { ...initialState };

const mutations = {
    SET_FILTER_VALUES: (state, { ident, values }) => {
        if (state.filterValues.hasOwnProperty(ident)) {
            state.filterValues[ident] = values;
        } else {
            state.filterValues[ident] = values;
        }
    },
    SET_FILTER_SOURCE: (state, source) => {
        state.filters.source = source;
    },
    SET_FILTER_YEAR: (state, year) => {
        state.filters.year = year;
    },
    SET_FILTER_MONTH: (state, month) => {
        state.filters.month = month;
    },
    SET_ORIGINAL_DATA: (state, { originalData }) => {
        state.originalData = originalData;
    },
    SET_DASH_DATA: (state, dashData) => {
        state.dashData = dashData;
    },
    SET_OS_STATS: (state, data) => {
        state.testData.osStats = data;
    },
    ADD_DASH_ELEMENT: (state, { dataElement }) => {
        state.dashData.push(dataElement);
    },
    SET_LOADING: (state, loading) => {
        state.loading = loading;
    }
};

const actions = {
    setServiceFilter: (context, source) => {
        context.commit('SET_FILTER_SOURCE', source);
    },
    setYearFilter: (context, year) => {
        context.commit('SET_FILTER_YEAR', year);
    },
    setMonthFilter: (context, month) => {
        context.commit('SET_FILTER_MONTH', month);
    },
    fetchOsStats: async (context) => {
        context.commit('SET_LOADING', true);

        const params = {
            month: context.state.filters.month,
            year: context.state.filters.year,
            quelle: context.state.filters.source
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
};

const getters = {
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
    getDataByFilter: (state) => (property, value) => {
        return state.dashData.filter(element => element[property] === value)
    },
    getPropertyData: (state) => (property) => {
        let valuesForProperty = [];
        for (let obj of state.originalData) {
            valuesForProperty.push(obj[property])
        }
        return valuesForProperty;
    },
    loading: state => {
        return state.loading
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
