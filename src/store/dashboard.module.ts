import { Module } from 'vuex';
import Chart from 'chart.js';
import { FeatureSet } from '@/connectors/wfs';

// see the 'Creating a new dashboard' part in the README.md for a short explanation of the store concept

/*
    Core variables used in dashboards
    dashboardData as the initial data requested and available in the client
    filteredData for storing data that is beeing filtered in the client
    filters for the filters set by the user in the frontend to calculate filteredData
    loading parameter that indicates a currently running request
 */
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
        /*
         *  Return the distinct values from a dataset for a given property
         *  Used to fill the filters with a list of distinct values
         *  @param dataId name of the dashboardData dataset to get the distinct filter values from
         *  @param propterty is the name of the distinct filters to retrieve
         *  @return unique filters
         */
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
        /*
         * Return a recalculated dataset according to the given filters
         * @param dataId name of the dashboardData dataset to apply filters
         * @return filtered data or complete dataset if no filters have been found
         */
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
