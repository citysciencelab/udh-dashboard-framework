import Axios from 'axios';

const baseUrl = 'https://test-geodienste.hamburg.de/layers-mrh/_doc/_search';
const resultSize = 1000;

export default {
    /* Params expected to be in Elasticsearch API-compatible string format */
    get: async (params) => {
        const queryparts = Object.entries(params).filter(([k, v]) => v.length).map(([k, v]) => `${k}:${v}`);
        const query = queryparts.join(' AND ') + `&size=${resultSize}`;
        const url = `${baseUrl}?q=${query}`;
        const response = await Axios.get(url);
        return response.data.hits.hits.map(hit => hit._source);
    }
};
