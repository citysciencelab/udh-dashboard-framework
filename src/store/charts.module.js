
const initialState = {
    originalData: [],
    dashData: [],
    filterValues: {},
    test: false
};

export const state = { ...initialState };

export const mutations = {
    SET_FILTER_VALUES: (state, { ident, values }) => {
        if (state.filterValues.hasOwnProperty(ident)) {
            state.filterValues[ident] = values;
        } else {
            state.filterValues[ident] = values;
        }
    },
    SET_ORIGINAL_DATA: (state, { originalData }) => {
        state.originalData = originalData;
    },
    SET_DASH_DATA: (state, { dashData }) => {
        state.dashData = dashData;
    },
    ADD_DASH_ELEMENT: (state, { dataElement }) => {
        state.dashData.push(dataElement);
    },
    SET_TEST: (state, { test }) => {
        state.test = test;
    }
};

export const actions = {
    //Example actions
    // async [FAVORITE_REMOVE](context, slug) {
    //     const { data } = await FavoriteService.remove(slug);
    //     // Update list as well. This allows us to favorite an article in the Home view.
    //     context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    //     context.commit(SET_ARTICLE, data.article);
    // },
    // [ARTICLE_PUBLISH]({ state }) {
    //     return ArticlesService.create(state.article);
    // },
};

const getters = {
    dashData: state => {
        return state.dashData
    },
    originalData: state => {
        return state.originalData
    },
    filterValues: state => {
        return state.filterValues
    },
    getDataByFilter: (state) => (property, value) => {
        //this.$store.getters.getDataByFilter('name', 'Apr')
        return state.dashData.filter(element => element[property] === value)
    },
    getPropertyData: (state) => (property) => {
        let valuesForProperty = [];
        for (let obj of state.originalData) {
            valuesForProperty.push(obj[property])
        }
        return valuesForProperty;
    },
    test: state => {
        return state.test
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
