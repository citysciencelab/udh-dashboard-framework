import { expect } from 'chai'
import dashboardModule from '../../../../src/store/dashboard.module';
import udpcModule from '../../../../src/store/udpc.module';

import mock_initial_data from './initial_data.mock.json';
import mock_filtered_data from './initial_data.mock.json';

const _state = {
    dashboardData: {},
    filteredData: {},
    filters: {},
    loading: false
};

const { SET_INITIAL_DATA, SET_FILTERED_DATA, SET_FILTERS, SET_FILTERS_NONE, SET_LOADING } = dashboardModule.mutations;
const { fetchRecentDatasets, fetchTotalsByTopic, fetchTotalsByType } = udpcModule.actions;

describe("mutations", () => {
    let state;

    beforeEach(() => {
        state = _state;
    });

    it("SET_INITIAL_DATA", () => {
        const id = 'totalDatasetsCount';

        // first commit
        SET_INITIAL_DATA(state, [id, mock_initial_data]);
        expect(state.dashboardData[id]).to.deep.equal(mock_initial_data);

        // don't overwrite on second commit
        SET_INITIAL_DATA(state, [id, 'something']);
        expect(state.dashboardData[id]).to.not.equal('something');
    });

    it("SET_FILTERED_DATA", () => {
        const id = 'totalDownloads';

        SET_FILTERED_DATA(state, [id, mock_filtered_data]);
        expect(state.filteredData[id]).to.deep.equal(mock_filtered_data);
    });

    it("SET_FILTERS", () => {
        const id = 'org';
        const values = ["Behörde für Inneres und Sport", "Behörde für Wirtschaft, Verkehr und Innovation"];

        // set a set of filters
        SET_FILTERS(state, [id, values]);
        expect(state.filters[id]).to.deep.equal(values);

        // delete a set of filters
        SET_FILTERS(state, [id, []]);
        expect(state.filters).to.not.have.own.property(id);
    });

    it("SET_FILTERS_NONE", () => {
        state.filters['org'] = ["Behörde für Inneres und Sport", "Behörde für Wirtschaft, Verkehr und Innovation"];

        // check whether all keys have been deleted
        SET_FILTERS_NONE(state);
        expect(state.filters).to.not.have.any.keys('org', 'theme')
    });
});