import { Module } from 'vuex';
import { RootState } from './store';

export interface DashboardState {
    dashboardData: { [key: string]: Dataset };
    filteredData: { [key: string]: Dataset };
    filters: { [key: string]: any };
}

const initialState: DashboardState = {
    dashboardData: {
        osStats: []
    },
    filteredData: {
        osStats: []
    },
    filters: {},
};

const chartsModule: Module<DashboardState, RootState> = { // type of local state is 'ChartsState'
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
            return state.dashboardData
        },
        filteredData: state => {
            return state.filteredData
        },
        filters: state => {
            return state.filters
        }
    }
};

export default chartsModule;
