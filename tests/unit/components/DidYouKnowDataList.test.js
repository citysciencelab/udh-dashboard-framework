import Vue from "vue";
import DidYouKnowDataList from "../../../src/components/DidYouKnowDataList.vue";
import {mount} from "@vue/test-utils";
import {expect} from "chai";

/**
 * tests the DidYouKnowDataList Component
 */
describe("DidYouKnowDataList.vue", () => {
    const inputData = {
        action: null,
        items: [
            {label: "Das meistgenutzte Betriebssystem bei den Zugriffen auf die UDP ist Windows 10", link:"3B43E143-2C8B-43E8-8004-EE9EDA3EA563"},
            {label: "Die Webseite der UDP enthält eine Sammlung von Anwendungen nach Themen: http://www.urbandataplatform.hamburg/anwendungen/"}
        ]
    };
    const opts = {
        propsData: {
            inputData,
            linkPrefix: "https://metaver.de/trefferanzeige?docuuid="
        }
    }

    it("render List and parse http:// Strings to <a>", async() => {
        const wrapper = mount(DidYouKnowDataList, opts);
        expect(wrapper).to.be.an("object");
        expect(wrapper.vm.inputData.items.length).to.equal(2);

        await Vue.nextTick();
        // check for list length
        const listItems = wrapper.findAll("li");
        expect(listItems.length).to.equal(2);

        // check link parsing
        const el0 = wrapper.vm.inputData.items[0];
        expect(wrapper.vm.linkUrl(el0.link)).to.equal("https://metaver.de/trefferanzeige?docuuid=3B43E143-2C8B-43E8-8004-EE9EDA3EA563");
        expect(listItems.at(0).contains("a")).to.be.true;
        expect(listItems.at(1).find(".inline").html()).to.contain('<a href="');
    });
});
