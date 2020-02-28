import WFS from 'ol/format/WFS';
import {FeatureSet} from './utils';
import {registerProjections} from './projections';

export default {
    get: (wfsUrl: string, wfsTypename: string, options: Datum) => {
        return new Promise((res, rej) => {
            registerProjections();
            const parser = new WFS();
            let url = `https://geodienste.hamburg.de/${wfsUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${wfsTypename}`;
    
            for (const key in options) {
                const option = Array.isArray(options[key]) ? options[key].join(",") : options[key];
                url += `&${key}=${option}`;
            }
    
            fetch(url)
                .then(response => response.text())
                .then(responseString => parser.readFeatures(responseString))
                .then(features => {
                    res(FeatureSet.from(features));
                });
        });
    }
}