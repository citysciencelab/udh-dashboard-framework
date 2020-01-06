import { Module } from 'vuex';
import { RootState } from './store';

export interface DashboardState {
    originalData: Dataset;
    dashData: Dataset;
    filterValues: { [key: string]: any };
    filters: { [key: string]: any };
}

const initialState: DashboardState = {
    originalData: [],
    dashData: [],
    filterValues: {},
    filters: {}
};

const chartsModule: Module<DashboardState, RootState> = { // type of local state is 'ChartsState'
    state: { ...initialState },
    mutations: {
        SET_FILTERS: (state, [ident, values]) => {
            state.filters[ident] = values;
        },
        SET_ORIGINAL_DATA: (state, originalData: Dataset) => {
            state.originalData = originalData;
        },
        SET_DASH_DATA: (state, dashData: Dataset) => {
            state.dashData = dashData;
        },
        ADD_DASH_ELEMENT: (state, dataElement: Datum) => {
            state.dashData.push(dataElement);
        }
    },
    actions: {
        setFilters: (context, [ident, values]) => {
            context.commit('SET_FILTERS', [ident, values]);
        }
    },
    getters: {
        originalData: state => {
            return state.originalData
        },
        dashData: state => {
            return state.dashData
        },
        filters: state => {
            return state.filters
        },
        filterValues: state => {
            return state.filterValues
        },
        getDataByFilters: state => (dataSource: Dataset, property: string, value: any) => {
            let newData: Dataset = [];
            for (const filterElement of value) {
                newData = newData.concat(dataSource.filter(element => element[property] === filterElement));
            }
            return newData;
        },
        getPropertyData: state => (property: string, dataSource: Dataset) => {
            let valuesForProperty = [];
            for (let obj of dataSource) {
                valuesForProperty.push(obj[property])
            }
            return valuesForProperty;
        }
    }
};

export default chartsModule;
