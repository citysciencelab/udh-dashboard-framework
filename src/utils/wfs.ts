import Axios from "axios";
import {parseString} from 'xml2js';

export default {

    get: async (wfsUrl: string, wfsTypename: string, properties: string[]) => {
        let url = 'https://geodienste.hamburg.de/' + wfsUrl + '?service=WFS&version=1.1.0&request=GetFeature' +
            '&outputFormat=GML3&typename=' + wfsTypename;

        // if (properties.length > 0) {
        //     url = url + '&PropertyName=(' + properties.toLocaleString() + ')'
        // }

        let results = {};
        await Axios.get(url).then(response => {
            parseString(response.data, {trim: true},(err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    // var formatWFS = new GML2({
                    //     srsName: 'EPSG:3857',
                    //     featureNS: "options.featureNS",
                    //     featureType: "dd"
                    // });
                    // let res = result["wfs:FeatureCollection"];
                    // res["localName"] = 'featureMembers';
                    // var features = formatWFS.readFeatures(res);
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
