import Utils from "../../../src/utils/utils";
import {expect} from "chai";

import {countData, aggregateData} from '@/utils/utils';

// Test the Utils component
describe("Utils.vue", () => {

    it("test date", () => {
        const dateee = '2020-06-23T09:50:30.232Z';
        const lastMonth = new Utils().date.getDateStringFromMillis(dateee);
        expect(lastMonth).to.contain('23.5.');
    });

    it("test number", () => {
        const result1 = new Utils().number.getAbbreviatedNumber(45000000);
        expect(result1).to.equal('45 Mio.');

        const result2 = new Utils().number.getAbbreviatedNumber(120);
        expect(result2).to.equal('120');

        const result3 = new Utils().number.getAbbreviatedNumber(4000);
        expect(result3).to.equal('4 Tsd.');
    });

    it("test string", () => {
        const result1 = new Utils().string.parseLinkFromString("Die Webseite der UDP enthält eine Sammlung von Anwendungen nach Themen: http://www.urbandataplatform.hamburg/anwendungen/");
        expect(result1).to.contain('<a href="');
        expect(result1).to.contain('target="_blank">');
    });

    const testData = [
        {
            name: 'Name1',
            value: 123
        },
        {
            name: 'Name2',
            value: 234
        },
        {
            name: 'Name1',
            value: 345
        }
    ];

    it("test data manipulation", () => {
        const result1 = countData(testData, 'name');
        expect(result1[0]['count']).to.equal(2);

        const result2 = aggregateData(testData, 'name', 'value');
        expect(result2[0]['value']).to.equal(468);
        expect(result2[0]['name']).to.equal('Name1');
    });
});
