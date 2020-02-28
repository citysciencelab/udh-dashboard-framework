import { Module } from 'vuex';
import Chart from 'chart.js';
import {FeatureSet} from '../utils/utils';

const initialState: DashboardState = {
    dashboardData: {},
    filteredData: {},
    filters: {},
    loading: false
};

const chartsModule: Module<DashboardState, RootState> = {
    state: initialState,
    mutations: {
        SET_INITIAL_DATA: (state, [id, data]: [string, Dataset|FeatureSet]) => {
            state.dashboardData[id] = data;
        },
        SET_FILTERED_DATA: (state, [id, data]: [string, Chart.ChartData]) => {
            state.filteredData[id] = data;
        },
        SET_FILTERS: (state, [id, values]) => {
            if (values.length > 0) {
                state.filters[id] = values;
            } else {
                delete state.filters[id]
            }
        },
        SET_FILTERS_NONE: (state) => {
            state.filters = {}
        },
        SET_LOADING: (state, loading: boolean) => {
            state.loading = loading;
        }
    },
    actions: {
    },
    getters: {
        dashboardData: state => {
            return state.dashboardData;
        },
        filteredData: state => {
            return state.filteredData;
        },
        filters: state => {
            return state.filters;
        },
        distinctPropertyValues: state => (dataId: string, property: string) => {
            var data: Dataset|FeatureSet = state.dashboardData[dataId];

            if (data) {
                if (data instanceof FeatureSet) {
                    data = data.getProperties();
                }
                return data.reduce((result: string[], obj: Datum) => {
                    return result.find((el: string) => el === obj[property]) ?
                        result :
                        [...result, obj[property]]
                }, []);
            }
        },
        dataWithAppliedFilters: state => (dataId: string) => {
            const filters = state.filters;
            const initialData = state.dashboardData[dataId];

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
        loading: state => {
            return state.loading
        }
    }
};

export default chartsModule;
