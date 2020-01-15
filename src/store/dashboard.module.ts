import { Module } from 'vuex';
import { RootState } from './store';

export interface DashboardState {
    dashboardData: { [key: string]: Dataset };
    filteredData: { [key: string]: Dataset };
    filters: { [key: string]: any };
}

const initialState: DashboardState = {
    dashboardData: {
    },
    filteredData: {
    },
    filters: {},
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
                let newFilteredData: object[] = [];
                for (const filterId of Object.keys(filters)) {
                    const filterFunction = (item: Datum) => filters[filterId].indexOf(item[filterId]) > -1;
                    const filteredData = initialData.filter(filterFunction);
                    for (const dataElement of filteredData) {
                        newFilteredData.indexOf(dataElement) == -1 ? newFilteredData.push(dataElement) : null;
                    }
                }
                return newFilteredData;
            } else {
                return initialData;
            }
        }
    }
};

export default chartsModule;
