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
            options: sliderOptions
        })
        wrapper.vm.onOptionsChanged();
        //wrapper.setData({ options: sliderOptions });
        //wrapper.setData({ defaults: [2018,2019] });
        console.warn("RangeSlider wrapper.html:", wrapper.html);

        console.log(wrapper.vm.options)
        console.log(wrapper.vm.defaults)
        console.log(wrapper.vm.marks)
        expect(wrapper.vm.minYear).to.equal(minYear);
        expect(wrapper.vm.maxYear).to.equal(currentYear);
        //expect(wrapper.isVisible()).to.be.true;

    });
});
