import { Module } from 'vuex';
import Chart from 'chart.js';
import { FeatureSet } from '../utils/wfs';

const initialState: DashboardState = {
    dashboardData: {},
    filteredData: {},
    filters: {},
    loading: false
};

const chartsModule: Module<DashboardState, RootState> = {
    state: initialState,
    mutations: {
        SET_INITIAL_DATA: (state, [id, data]: [string, FeatureSet|Dataset]) => {
            state.dashboardData[id] = data;
        },
        SET_FILTERED_DATA: (state, [id, data]: [string, Chart.ChartData]) => {
            state.filteredData[id] = data;
        },
        SET_FILTERS: (state, [id, values]) => {
            // Must instantiate a new object because otherwise Vuex change detection will not work
            const newFilters: { [key: string]: any } = {};

            // Copy previous filters
            for (const [k, v] of Object.entries(state.filters)) {
                newFilters[k] = v;
            }

            // Update filter
            if (values.length > 0) {
                newFilters[id] = values;
            } else {
                delete newFilters[id];
            }

            state.filters = newFilters;
        },
        SET_FILTERS_NONE: (state) => {
            state.filters = {}
        },
        SET_LOADING: (state, loading: boolean) => {
            state.loading = loading;
        }
    },
    actions: {
        setFilters: (context, [id, values]) => {
            context.commit('SET_FILTERS', [id, values]);
        }
    },
    getters: {
        dashboardData: state => () => {
            return state.dashboardData;
        },
        filteredData: state => () => {
            return state.filteredData;
        },
        filters: state => () => {
            return state.filters;
        },
        distinctPropertyValues: state => (dataId: string, property: string) => {
            if (!state.dashboardData[dataId]) {
                return;
            }
            const data = state.dashboardData[dataId] as any;
            return data[property].buckets.map((bucket: { key: string, doc_count: number }) => bucket.key);
        },
        dataWithAppliedFilters: state => (dataId: string) => {
            const filters = state.filters,
                initialData = state.dashboardData[dataId];

            if (Object.keys(filters).length !== 0) {
                let newFilteredData: object[] = initialData;
                for (const filterId of Object.keys(filters)) {
                    const filterFunction = (item: Datum) => filters[filterId].indexOf(item[filterId]) > -1;
                    newFilteredData = newFilteredData.filter(filterFunction);
                }
                return newFilteredData;
            } else {
                return initialData;
            }
        },
        loading: state => () => {
            return state.loading
        }
    }
};

export default chartsModule;
