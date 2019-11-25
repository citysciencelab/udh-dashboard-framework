import elastic from '../utils/elastic';

const initialState = {
    originalData: [],
    dashData: [],
    testData: [],
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
    SET_TEST_DATA: (state, data) => {
        state.testData = data;
    },
    ADD_DASH_ELEMENT: (state, { dataElement }) => {
        state.dashData.push(dataElement);
    },
    SET_LOADING: (state, loading) => {
        state.loading = loading;
    }
};

const makeMockActions = () => {
    return {
        fetchData(context) {
            const mockData = [
                {'val': 50, 'val1': 1400, 'val2': 1900, 'name': 'Jan', 'date': new Date("2019-01")},
                {'val': 60, 'val1': 1900, 'val2': 1730, 'name': 'Feb', 'date': new Date("2019-02")},
                {'val': 65, 'val1': 1000, 'val2': 1800, 'name': 'Mar', 'date': new Date("2019-03")},
                {'val': 80, 'val1': 1250, 'val2': 1805, 'name': 'Apr', 'date': new Date("2019-04")},
                {'val': 56, 'val1': 1050, 'val2': 1750, 'name': 'May', 'date': new Date("2019-05")},
                {'val': 78, 'val1': 1090, 'val2': 1777, 'name': 'Jun', 'date': new Date("2019-06")},
                {'val': 99, 'val1': 1700, 'val2': 2100, 'name': 'Jul', 'date': new Date("2019-07")},
                {'val': 95, 'val1': 1400, 'val2': 2089, 'name': 'Aug', 'date': new Date("2019-08")},
                {'val': 76, 'val1': 1400, 'val2': 1640, 'name': 'Sep', 'date': new Date("2019-09")},
                {'val': 40, 'val1': 1100, 'val2': 1790, 'name': 'Oct', 'date': new Date("2019-10")},
                {'val': 35, 'val1': 1155, 'val2': 1500, 'name': 'Nov', 'date': new Date("2019-11")},
                {'val': 42, 'val1': 1333, 'val2': 1800, 'name': 'Dec', 'date': new Date("2019-12")},
            ];
            context.commit('SET_LOADING', true);
            setTimeout(() => {
                context.commit('SET_DASH_DATA', mockData);
                context.commit('SET_LOADING', false);
                return Promise.resolve();
            }, 1000);
        },
    }
};

const makeActions = (elastic) => {
    return {
        setServiceFilter: (context, source) => {
            context.commit('SET_FILTER_SOURCE', source);
        },
        setYearFilter: (context, year) => {
            context.commit('SET_FILTER_YEAR', year);
        },
        setMonthFilter: (context, month) => {
            context.commit('SET_FILTER_MONTH', month);
        },
        fetchOsStats: (context) => {
            context.commit('SET_LOADING', true);

            const params = {
                month: context.state.filters.month,
                year: context.state.filters.year,
                quelle: context.state.filters.source
            };
            // Convert range filters
            params.year = `[${params.year[0]} TO ${params.year[1] || params.year[0]}]`;
            params.month = `[${params.month[0]} TO ${params.month[1] || params.month[0]}]`;

            elastic.get(params).then(results => {
                if (!results) {
                    return;
                }
                context.commit('SET_TEST_DATA', results);
            }).finally(() =>{
                context.commit('SET_LOADING', false);
            });
        }
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
    loading: state => {
        return state.loading
    }
};

export default {
    state,
    actions: makeActions(elastic),
    mutations,
    getters
};
