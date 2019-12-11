import elastic from '../utils/elastic';
import { aggregateData } from '../utils/utils';

const initialState = {
    testData: {
        osStats: []
    }
};

const state = { ...initialState };

const mutations = {
    SET_OS_STATS: (state, data) => {
        state.testData.osStats = data;
    }
};

const actions = {
    fetchOsStats: async (context) => {
        context.commit('SET_LOADING', true);

        const params = {
            month: context.getters.filters['MONTH'],
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

        context.commit('SET_OS_STATS', top10);
        context.commit('SET_LOADING', false);
    }
};

const getters = {
    getOsStats: state => {
        return state.testData.osStats
    },
    testData: state => {
        return state.testData
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
