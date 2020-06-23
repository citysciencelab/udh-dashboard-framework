import Vue from "vue";
import InfoOverlay from "../../../src/components/InfoOverlay.vue";
import {shallowMount, mount} from "@vue/test-utils";
import {expect} from "chai";

// Test the InfoOverlay component
describe("InfoOverlay.vue", () => {

    it("initial settings", () => {
        const wrapper = shallowMount(InfoOverlay);
        expect(wrapper).to.be.an("object");
    });

    it("close alert when button is clicked", async () => {
        let wrapper = mount(InfoOverlay);
        wrapper.setProps({ text: 'newTextMessage' });
        console.warn("InfoOverlay wrapper.html:", wrapper.html);

        expect(wrapper.vm.text).to.equal('newTextMessage');
        wrapper.vm.show();
        expect(wrapper.isVisible()).to.be.true;
        wrapper.find(".close-button").trigger("click");
        await Vue.nextTick();
        expect(wrapper.isEmpty());
    });
});
