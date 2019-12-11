const initialState = {
    originalData: [],
    dashData: [],
    filterValues: {},
    filters: {},
    loading: false
};

const state = { ...initialState };

const mutations = {
    SET_FILTERS: (state, [ident, values]) => {
        state.filters[ident] = values;
    },
    SET_ORIGINAL_DATA: (state, { originalData }) => {
        state.originalData = originalData;
    },
    SET_DASH_DATA: (state, dashData) => {
        state.dashData = dashData;
    },
    ADD_DASH_ELEMENT: (state, { dataElement }) => {
        state.dashData.push(dataElement);
    },
    SET_LOADING: (state, loading) => {
        state.loading = loading;
    }
};

const actions = {
    setFilters: (context, [ident, values]) => {
        context.commit('SET_FILTERS', [ident, values]);
    }
};

const getters = {
    originalData: state => {
        return state.originalData
    },
    dashData: state => {
        return state.dashData
    },
    filters: state => {
        return state.filters
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
