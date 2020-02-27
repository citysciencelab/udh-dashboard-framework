import GeoJSON from 'ol/format/GeoJSON';
import * as mpapi from "masterportalAPI";
import {FeatureSet} from './utils';

export default {

    get: (wfsUrl: string, wfsTypename: string, properties: string[]) => {
        return new Promise((res, rej) => {
            const rawLayer = {
                url: 'https://geodienste.hamburg.de/' + wfsUrl,
                featureType: wfsTypename
            },
                source = mpapi.wfs.createLayerSource(rawLayer),
                geojsonParser = new GeoJSON();

            source.once('addfeature', () => {
                // res(source.getFeatures().map((f: Feature) => f.getProperties()));
                res(FeatureSet.from(source.getFeatures()));
                // res(source.getFeatures().map((f: Feature) => geojsonParser.writeFeatureObject(f)));
            });
        });
    },

    // getDataFromWFSJson(wfsData: { [key: string]: any }, wfsTypename: string, properties: string[], prefix: string, baseNodes: string[]): Dataset {
    //     for (const nodes of baseNodes) {
    //         wfsData = wfsData[nodes];
    //     }
    //     // At this point we should have an array of data elements
    //     const dataCollection = [];
    //     let dataIndex = 0;
    //     for (const dataKey of Object.keys(wfsData)) {
    //         const data:{ [key: string]: any } = {};
    //         const dataElement = wfsData[dataKey];
    //         for (const prop of properties) {
    //             if (dataElement[prefix + ':' + wfsTypename][0][prefix + ':' + prop]) {
    //                 data[prop] = dataElement[prefix + ':' + wfsTypename][0][prefix + ':' + prop][0];

    //             }
    //         }
    //         // Adding an ID
    //         if (!data.hasOwnProperty('id')) {
    //             data['id'] = dataIndex;
    //         }
    //         // Adding attribute for counting elements if no real value is available
    //         dataCollection.push(data);
    //         dataIndex++;
    //     }
    //     return <Dataset>Object.values(dataCollection);
    // }
};
