import Axios from "axios";
import {parseString} from 'xml2js';


export default {

    get: async (wfsUrl: string, wfsTypename: string, properties: string[]) => {
        const url = 'https://geodienste.hamburg.de/' + wfsUrl + '?service=WFS&version=1.1.0&request=GetFeature' +
            '&typename=' + wfsTypename + '&PropertyName=(' + properties.toLocaleString() + ')';

        let results = {};
        const response = await Axios.get(url).then(response => {
            parseString(response.data, {trim: true},(err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    results = result
                }
            });
        });
        return results;
    },

    getDataFromWFSJson(wfsData: { [key: string]: any }, wfsTypename: string, properties: string[], prefix: string, baseNodes: string[]): Dataset {
        for (const nodes of baseNodes) {
            wfsData = wfsData[nodes];
        }
        // At this point we should have an array of data elements
        const dataCollection = [];
        let dataIndex = 0;
        for (const dataKey of Object.keys(wfsData)) {
            const data:{ [key: string]: any } = {};
            const dataElement = wfsData[dataKey];
            for (const prop of properties) {
                if (dataElement[prefix + ':' + wfsTypename][0][prefix + ':' + prop]) {
                    data[prop] = dataElement[prefix + ':' + wfsTypename][0][prefix + ':' + prop][0];

                }
            }
            // Adding an ID
            if (!data.hasOwnProperty('id')) {
                data['id'] = dataIndex;
            }
            // Adding attribute for counting elements if no real value is available
            dataCollection.push(data);
            dataIndex++;
        }
        return <Dataset>Object.values(dataCollection);
    }
};
