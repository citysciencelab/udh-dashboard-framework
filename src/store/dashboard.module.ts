import { Module } from 'vuex';
import Chart from 'chart.js';
import { FeatureSet } from '@/connectors/wfs';

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
            // It's initial data, so setting it once is enough
            if (!state.dashboardData[id]) {
                state.dashboardData[id] = data;
            }
        },
        SET_FILTERED_DATA: (state, [id, data]: [string, Chart.ChartData]) => {
            state.filteredData[id] = data;
        },
        SET_FILTERS: (state, [id, values]) => {
            if (values.length > 0) {
                state.filters[id] = values;
            } else {
                delete state.filters[id];
            }
        },
        SET_FILTERS_NONE: (state) => {
            state.filters = {};
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
            if (Object.prototype.hasOwnProperty.call(data, property)) {
                return data[property].buckets.map((bucket: { key: string, doc_count: number }) => bucket.key);
            } else {
                const notUnique = data.map((item: any) => item[property]);
                return [...new Set(notUnique)];
            }
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
