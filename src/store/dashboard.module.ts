import { Module } from 'vuex';

const initialState: DashboardState = {
    dashboardData: {},
    filteredData: {},
    filters: {},
    loading: false
};

const chartsModule: Module<DashboardState, RootState> = {
    state: { ...initialState },
    mutations: {
        SET_INITIAL_DATA: (state, [id, data]: [string, Dataset]) => {
            state.dashboardData[id] = data;
        },
        SET_FILTERED_DATA: (state, [id, data]: [string, Dataset]) => {
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
            for (const filterId of Object.keys(state.filters)) {
                delete state.filters[filterId]
            }
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
        filteredDataById: state => (dataId: string) => {
            return state.filteredData[dataId];
        },
        filters: state => {
            return state.filters;
        },
        distinctPropertyValues: state => (dataId: string, property: string) => {
            let valuesForProperty: string[] = [];
            for (let obj of state.filteredData[dataId]) {
                if (obj[property] && !valuesForProperty.find(element => element === obj[property])) {
                    valuesForProperty.push(obj[property])
                }
            }
            return valuesForProperty;
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
        }
    }
};

export default chartsModule;
