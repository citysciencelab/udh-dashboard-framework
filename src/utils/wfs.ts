import Axios from "axios";
import {parseString} from 'xml2js';
import GML2 from "ol/format/GML2";
import WFS from 'ol/format/WFS';
import * as proj from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export default {

    get: async (wfsUrl: string, wfsTypename: string, properties: string[]) => {
        return new Promise((res, rej) => {
            let url = 'https://geodienste.hamburg.de/' + wfsUrl + '?service=WFS&version=1.1.0&request=GetFeature' +
            '&outputFormat=GML3&typename=' + wfsTypename;
            const wfsReader = new WFS(),
                myProjectionName = 'EPSG:25832';
                // proj4.defs(myProjectionName, "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");

            // if (properties.length > 0) {
            //     url = url + '&PropertyName=(' + properties.toLocaleString() + ')'
            // }

            Axios.get(url).then(response => {
                parseString(response.data, {trim: true}, (err, result) => {
                    if(err) {
                        throw err
                    } else {
                        console.log(result);
                    
                        //TODO: try to parse this data to geoJSON, so we do not have to do the getDataFromWFSJson() method
                        // var formatWFS = new GML2({
                        //     srsName: 'EPSG:3857',
                        //     featureNS: "options.featureNS",
                        //     featureType: "dd"
                        // });
                        // let res = result["wfs:FeatureCollection"];
                        // res["localName"] = 'featureMembers';
                        // var features = formatWFS.readFeatures(res);
                        res(result);
                    }
                });
            });
        });
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
