import Axios from 'axios';

const baseUrl = 'https://test-geodienste.hamburg.de/udh_dashboard/_search';

const elastic = {

    /**
     * Get data from Elasticsearch endpoint "udpc_query"
     *
     * Stored query params:
     * @param from "YYYY-MM", default: "2019-11"
     * @param to "YYYY-MM", default: "2020-01"
     * @param theme array, Open Data Kategorie, kein default, Array muss mind. 1 Element enthalten
     * @param org array, Organisation, kein default, Array muss mind. 1 Element enthalten
     * @param tag array, {basemap|bplan|sensor}, Filter nach tags, kein default, Array muss mind. 1 Element enthalten
     * @param tag_not array, {basemap|bplan|sensor}, Negativ-Filter nach tags, kein default, Array muss mind. 1 Element enthalten
     * @param category string, {datasets|apps|downloads|visitors}, default: datasets
     * @param interval string, zeitliche Aggregation pro Monat oder pro Jahr, {month|year}, default: month, bei der category "visitors" liefert der Wert "year" keine sinnvollen Ergebnisse.
     * @param limit int, steuert alle Ergebnismengen (raw features und top_x Aggregation), default: 10
     * @param sortBy string, Feld, nach dem die raw features sortiert werden sollen, default: "change_date", {jedes feld der raw features}
     * @param status string, Feld, nach dem die raw features sortiert werden sollen, nur für neueste datensätze im einsatz, default: []
     */
    async udpcQuery(from: string, to: string, theme: string[], org: string[], tag: string[], tag_not: string[], category?: string, interval?: string, limit?: number, sortBy?: string, status?: string[]) {
        theme = elastic.validateArray(theme);
        org = elastic.validateArray(org);
        tag = elastic.validateArray(tag);
        tag_not = elastic.validateArray(tag_not);
        elastic.validateDate(from);
        elastic.validateDate(to);
        elastic.validateCategory(category);
        elastic.validateInterval(interval);
        elastic.validateSortBy(sortBy);
        status = elastic.validateArray(status);

        const params = { from, to, theme, org, tag, tag_not, category, interval, limit, sortBy, status };
        const source = JSON.stringify({ id: 'udpc_query', params: params });
        const url = encodeURI(`${baseUrl}/template?source=${source}&source_content_type=application/json`);
        const response = await Axios.get(url);
        return response.data;
    },

    validateDate(date: string) {
        // it is trivial, but better than nothing
        if (date && !date.match(/^[0-9]{4}-[0-9]{2}$/)) {
            throw new Error('`Invalid date format. Must be YYYY-MM.');
        }
    },

    validateCategory: (category?: string) => {
        if (category && ['datasets', 'apps', 'downloads', 'visitors', 'info', 'sensordatasets'].indexOf(category) === -1) {
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
            throw new Error(`Invalid sortBy. Must be 'create_date', 'change_date' or 'date'.`);
        }
    },

    validateArray(array?: string[]) {
        return array && array.length ? array : [''];
    }
};

export default elastic;
