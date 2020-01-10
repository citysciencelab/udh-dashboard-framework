import Axios from 'axios';

const baseUrl = 'https://test-geodienste.hamburg.de/udh_dashboard/_search';
const resultSize = 1000;

export default {
    /* Params expected to be in Elasticsearch API-compatible string format */
    get: async (params: { [key: string]: string }) => {
        const queryparts = Object.entries(params).filter(([k, v]) => v.length).map(([k, v]) => `${k}:${v}`);
        const query = queryparts.join(' AND ') + `&size=${resultSize}`;
        const url = encodeURI(`${baseUrl}?q=${query}`);
        const response = await Axios.get(url);
        return response.data.hits.hits.map((hit: any) => hit._source);
    },

    getFromTemplate: async (id: string, params: {}) => {
        const source = JSON.stringify({ id: id, params: params });
        const url = encodeURI(`${baseUrl}/template?source=${source}&source_content_type=application/json`);
        const response = await Axios.get(url);
        return response.data.hits.hits.map((hit: any) => hit._source);
    }
};
