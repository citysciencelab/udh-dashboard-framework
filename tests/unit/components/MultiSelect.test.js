import MultiSelect from "../../../src/components/MultiSelect";
import {shallowMount, mount} from "@vue/test-utils";
import {expect} from "chai";

// Test the InfoOverlay component
describe("MultiSelect.vue", () => {

    it("initial settings", () => {
        const wrapper = shallowMount(MultiSelect);
        expect(wrapper).to.be.an("object");
    });

    it("testing filter behaviour", async () => {
        let wrapper = mount(MultiSelect);
        console.warn("RangeSlider wrapper.html:", wrapper.html);
    });
});
