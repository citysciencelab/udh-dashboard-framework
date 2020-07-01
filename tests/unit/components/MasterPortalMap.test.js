import MasterPortalMap from "../../../src/components/MasterPortalMap";
import {shallowMount, mount} from "@vue/test-utils";
import {expect} from "chai";
// import jsdom from "mocha-jsdom";
// import Canvas from "canvas";
// require('jsdom-global')(undefined, {pretendToBeVisual: true, url: 'http://localhost'})

import portalConfig from "../../../src/assets/map-config/portal.json";
import servicesConfig from "../../../src/assets/map-config/services.json";

describe("MasterPortalMap.vue", () => {

    // jsdom();
    // const { JSDOM } = jsdom;
    // const window = (new JSDOM(``, { pretendToBeVisual: true })).window;

    // const options = {
    //     propsData: {
    //         services: servicesConfig,
    //         portal: portalConfig,
    //         md_id: "3B43E143-2C8B-43E8-8004-EE9EDA3EA563",
    //         overlay: "This is a Caption",
    //         linkPrefix: "https://metaver.de/trefferanzeige?docuuid="
    //       }
    // };

    // it("initial settings", () => {
    //     const wrapper = shallowMount(MasterPortalMap, options);
    //     expect(wrapper).to.be.an("object");
    // });

    // it("mounting tests", async () => {
    //     const wrapper = mount(MasterPortalMap, options);

    //     console.log(wrapper.vm)
    // });
});