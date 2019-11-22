import Vue from 'vue'
import Axios from 'axios';

const baseUrl = 'https://test-geodienste.hamburg.de/layers-mrh/_doc/_search';

export default {
    get: async (params) => {
        const queryparts = Object.entries(params).map(([k, v]) => `${k}:${v}`);
        const query = queryparts.join(' AND ');
        const url = `${baseUrl}?q=${query}`;
        const response = await Axios.get(url);
        return response.data.hits.hits.map(hit => hit._source);
    }
};
