import RangeSlider from "../../../src/components/RangeSlider";
import {shallowMount, mount} from "@vue/test-utils";
import {expect} from "chai";

// Test the InfoOverlay component
describe("RangeSlider.vue", () => {

    it("initial settings", () => {
        const wrapper = shallowMount(RangeSlider);
        expect(wrapper).to.be.an("object");
    });

    it("marks creation year", async () => {
        const sliderOptions = { min: 2014, max: 2020, unit: 'year', isShowMarks: true};
        const wrapper = mount(RangeSlider, {
            propsData: {
                options: sliderOptions
            }
        });
        wrapper.vm.onOptionsChanged();
        expect(wrapper.vm.marks[2]).to.equal('2016');
        expect(Object.keys(wrapper.vm.marks)).to.have.lengthOf(7);
    });

    it("marks creation month", async () => {
        const sliderOptions = { min: '2014-01', max: '2020-01', unit: 'month', isShowMarks: true};
        const wrapper = mount(RangeSlider, {
            propsData: {
                options: sliderOptions
            }
        });
        wrapper.vm.onOptionsChanged();
        expect(wrapper.vm.marks[69]).to.equal('2019-10');
    });

    it("no marks creation", async () => {
        const sliderOptions = { min: 2014, max: 2020, unit: 'year', isShowMarks: true};
        const wrapper = mount(RangeSlider, {
            propsData: {
                options: sliderOptions
            }
        });
        wrapper.vm.onOptionsChanged();
        const antSliderMark1 = wrapper.findAll(".range-slider");
        console.log(antSliderMark1.at(0).html())
        //TODO: check the frontend a-slider - it should not contain ".ant-slider-mark"
        /**
        console.log(antSliderMark1.at(0).findAll(".ant-slider").at(0).html())
        antSliderMark1.to.have.lengthOf(1)
        const antSliderMark = wrapper.findAll(".ant-slider-mark");
        antSliderMark.to.have.lengthOf(1)
        antSliderMark.contains('span').toBe(false)
         **/
    });
});
