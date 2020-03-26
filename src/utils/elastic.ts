import Axios from 'axios';

const baseUrl = 'https://test-geodienste.hamburg.de/udh_dashboard/_search';

const elastic = {
    /*
     * Get data from Elasticsearch endpoint "test_rangeless"
     * Example:
        "theme": "Umwelt und Klima",
        "org": "Landesbetrieb Geoinformation und Vermessung",
        "date": "2019-11",
        "category": "datasets"
        "limit": 20,
        "sortBy": "change_date"
     */
    async getRangeless(theme: string, org: string, date: string, category: string, limit?: number, sortBy?: string) {
        elastic.validateDate(date);
        elastic.validateCategory(category);
        elastic.validateSortBy(sortBy);
        const params = { theme, org, date, category, limit, sortBy };
        const source = JSON.stringify({ id: 'test_rangeless', params: params });
        const url = encodeURI(`${baseUrl}/template?source=${source}&source_content_type=application/json`);
        const response = await Axios.get(url);
        return response.data;
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
        "tag_not": "basemap",
        "tag": "basemap"
     */
    async getRangeful(theme: string, org: string, from: string, to: string, category: string, top?: number, interval?: string, tag_not?: string, tag?: string) {
        elastic.validateDate(from);
        elastic.validateDate(to);
        elastic.validateCategory(category);
        elastic.validateInterval(interval);
        const params = { theme, org, tag, from, to, category, top, interval, tag_not };
        const source = JSON.stringify({ id: 'test_rangeful', params: params });
        const url = encodeURI(`${baseUrl}/template?source=${source}&source_content_type=application/json`);
        const response = await Axios.get(url);
        return response.data.aggregations;
    },

    validateDate(date: string) {
        // it is trivial, but better than nothing
        if (date && !date.match(/^[0-9]{4}-[0-9]{2}$/)) {
            throw new Error('`Invalid date format. Must be YYYY-MM.');
        }
    },

    validateCategory: (category: string) => {
        if (category && ['datasets', 'apps', 'downloads', 'visitors'].indexOf(category) === -1) {
            throw new Error(`Invalid category. Must be 'datasets', 'apps', 'downloads' or 'visitors'.`);
        }
    },

    validateInterval: (interval?: string) => {
        if (interval && ['month', 'year'].indexOf(interval) === -1) {
            throw new Error(`Invalid interval. Must be 'month' or 'year'.`);
        }
    },

    validateSortBy: (sortBy?: string) => {
        if (sortBy && ['create_date', 'change_date', 'date'].indexOf(sortBy) === -1) {
            throw new Error(`Invalid interval. Must be 'create_date', 'change_date' or 'date'.`);
        }
    }
};

export default elastic;
