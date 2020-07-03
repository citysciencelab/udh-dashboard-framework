import { expect } from 'chai'
import dashboardModule from '../../../../src/store/dashboard.module';

import mock_initial_data from './participation_data.mock';

const _state = {
    dashboardData: {},
    filteredData: {},
    filters: {},
    loading: false
};

const { SET_INITIAL_DATA, SET_FILTERED_DATA, SET_FILTERS, SET_FILTERS_NONE } = dashboardModule.mutations;
const { filters, dataWithAppliedFilters, distinctPropertyValues } = dashboardModule.getters;

describe("mutations", () => {
    let state;

    beforeEach(() => {
        state = _state;
    });

    it("DATA_FILTERING", () => {
        const id = 'participationData';
        const filterId = "bezirk";
        const filterValue = "Altona";

        // set the data
        SET_INITIAL_DATA(state, [id, mock_initial_data]);
        // set a set of filters
        SET_FILTERS(state, [filterId, [filterValue]]);
        const distinctValues = distinctPropertyValues(state)(id, filterId);
        expect(distinctValues).to.deep.contain(filterValue);
        expect(distinctValues).to.deep.contain('Wandsbek');
        expect(distinctValues).to.deep.contain('Harburg');

        const dataWithFilters = dataWithAppliedFilters(state)(id);
        for (const dataWithFilter of dataWithFilters) {
            expect(dataWithFilter[filterId]).to.equal(filterValue);
        }

    });
});