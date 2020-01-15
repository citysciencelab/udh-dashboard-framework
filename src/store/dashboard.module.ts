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
            state.filters[id] = values;
        }
    },
    actions: {
        setFilters: (context, [ident, values]) => {
            context.commit('SET_FILTERS', [ident, values]);
        }
    },
    getters: {
        dashboardData: state => {
            return state.dashboardData;
        },
        filteredData: state => {
            return state.filteredData;
        },
        filteredDataById: state => (dataId: string) => {
            console.log("fjlle")
            return state.filteredData[dataId];
        },
        filters: state => {
            return state.filters;
        },
        getDistinctPropertyValues: state => (dataId: string, property: string) => {
            let valuesForProperty: string[] = [];
            for (let obj of state.filteredData[dataId]) {
                if (obj[property] && !valuesForProperty.find(element => element === obj[property])) {
                    valuesForProperty.push(obj[property])
                }
            }
            return valuesForProperty;
        }
    }
};

export default chartsModule;
