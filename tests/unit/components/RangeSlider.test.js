import RangeSlider from "../../../src/components/RangeSlider";
import {shallowMount, mount} from "@vue/test-utils";
import {expect} from "chai";

// Test the InfoOverlay component
describe("RangeSlider.vue", () => {

    it("initial settings", () => {
        const wrapper = shallowMount(RangeSlider);
        expect(wrapper).to.be.an("object");
    });

    it("mounting tests", async () => {
        const minYear = '2014';
        const today = new Date();
        const currentYear = `${today.getFullYear()}`;
        const sliderOptions = { min: minYear, max: currentYear, unit: 'year', isShowMarks: true};
        // let wrapper = mount(RangeSlider);
        const wrapper = mount(RangeSlider, {
            propsData: {
                options: sliderOptions
            }
        })
        wrapper.vm.onOptionsChanged();
        //wrapper.setData({ options: sliderOptions });
        //wrapper.setData({ defaults: [2018,2019] });

        expect(wrapper.vm.minYear).to.equal(parseInt(minYear, 10));
        expect(wrapper.vm.maxYear).to.equal(parseInt(currentYear, 10));
        //expect(wrapper.isVisible()).to.be.true;

    });
});
