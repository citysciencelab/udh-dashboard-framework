import { expect } from 'chai'
import dashboardModule from '../../../src/store/dashboard.module';
import udpcModule from '../../../src/store/udpc.module';

import mock_initial_data from './initial_data.mock.json';
import mock_filtered_data from './initial_data.mock.json';

const _state = {
    dashboardData: {},
    filteredData: {},
    filters: {},
    loading: false
};

// const mock_commit_initial_data = [, mock_initial_data];
const mock_commit_filtered_data = ['totalDownloads', mock_filtered_data];

const { SET_INITIAL_DATA, SET_FILTERED_DATA, SET_FILTERS, SET_FILTERS_NONE, SET_LOADING } = dashboardModule.mutations;

describe("mutations", () => {
    let state;

    beforeEach(() => {
        state = _state;
    });

    it("SET_INITIAL_DATA", () => {
        const id = 'totalDatasetsCount';

        // first commit
        SET_INITIAL_DATA(state, [id, mock_initial_data]);
        // expect(state[id]).to.equal(mock_initial_data);

        // don't overwrite on second commit
        SET_INITIAL_DATA(state, [id, 'something']);
        // expect(state[id]).to.equal(mock_initial_data);
    });
});