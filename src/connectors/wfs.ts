import WFS from 'ol/format/WFS';
import {registerProjections} from '@/utils/projections';

export default {
    get: (wfsUrl: string, wfsTypename: string, options: { [key: string]: string|string[]  }) => {
        registerProjections();
        const parser = new WFS();
        let url = `https://geodienste.hamburg.de/${wfsUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${wfsTypename}`;

        for (const key in options) {
            const option = Array.isArray(options[key]) ? (options[key] as string[]).join(',') : options[key];
            url += `&${key}=${option}`;
        }

        return fetch(url)
            .then(response => response.text())
            .then(responseString => parser.readFeatures(responseString))
            .then(features => FeatureSet.from(features));
    }
}

export class FeatureSet extends Array {
    getProperties(): Dataset {
        return this.map(f => {
            try {
                return f.getProperties()
            }
            catch(e) {
                return f;
            }
        }) as FeatureSet;
    }
}