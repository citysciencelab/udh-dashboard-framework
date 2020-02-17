import Axios from 'axios';

const baseUrl = 'https://test-geodienste.hamburg.de/udh_dashboard/_search';

export default {
    /*
     * Get data from Elasticsearch endpoint "test_rangeless"
     * Example:
        "theme": "Umwelt und Klima",
        "org": "Landesbetrieb Geoinformation und Vermessung",
        "date": "2019-11",
        "category": "datasets"
     */
    getRangeless: async (theme: string, org: string, date: string, category: string) => {
        validateDate(date);
        validateCategory(category);
        const params = { theme, org, date, category };
        const source = JSON.stringify({ id: 'test_rangeless', params: params });
        const url = encodeURI(`${baseUrl}/template?source=${source}&source_content_type=application/json`);
        const response = await Axios.get(url);
        return response.data.aggregations;
    },

    /*
     * Get data from Elasticsearch endpoint "test_rangeful"
     * Example:
        "theme": "Umwelt und Klima",
        "org": "Landesbetrieb Geoinformation und Vermessung",
        "from": "2019-11",
        "to": "2019-12",
        "category": "datasets",
        "top": 2,
        "interval": "year"
     */
    getRangeful: async (theme: string, org: string, from: string, to: string, category: string, top: number, interval: string) => {
        validateDate(from);
        validateDate(to);
        validateCategory(category);
        validateInterval(interval);
        const params = { theme, org, from, to, category, top, interval };
        const source = JSON.stringify({ id: 'test_rangeful', params: params });
        const url = encodeURI(`${baseUrl}/template?source=${source}&source_content_type=application/json`);
        const response = await Axios.get(url);
        return response.data.aggregations;
    }
};

function validateDate(date: string) {
    // it is trivial, but better than nothing
    if (!date.match(/^[0-9]{4}-[0-9]{2}$/)) {
        throw new Error('`Invalid date format. Must be YYYY-MM.');
    }
}

function validateCategory(category: string) {
    if (['datasets', 'apps', 'downloads'].indexOf(category) === -1) {
        throw new Error(`Invalid category. Must be 'datasets', 'apps' or 'downloads'.`);
    }
}

function validateInterval(category: string) {
    if (['month', 'year'].indexOf(category) === -1) {
        throw new Error(`Invalid interval. Must be 'month' or 'year'.`);
    }
}