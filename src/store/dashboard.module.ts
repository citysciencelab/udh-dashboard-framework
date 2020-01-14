import { Module } from 'vuex';

const initialState: DashboardState = {
    dashboardData: {},
    filteredData: {},
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
