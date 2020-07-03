import Vue from "vue";
import DidYouKnow from "../../../src/components/DidYouKnow.vue";
import {shallowMount, mount} from "@vue/test-utils";
import {expect} from "chai";
import * as sinon from "sinon";

// Test the DidYouKnow component
describe("DidYouKnow.vue", () => {
    let clock;
    const data = {
        action: "md_id",
        items: [
            {label: "Das meistgenutzte Betriebssystem bei den Zugriffen auf die UDP ist Windows 10", link:"http://123.xyz"},
            {label: "Der Datensatz mit den meisten Zugriffen im Jahr 2019 war der Stadtplan der FHH", link:"http://456.xyz"}
        ]
    };
    const opts = {
        propsData: {
            data,
            interval: 5000,
        },
        mocks: {
            $t: () => 'some specific text'
        }
    }

    beforeEach(() => {
        clock = sinon.useFakeTimers({target: global});
    });
    afterEach(() => {
        clock.restore();
    });

    it("initial settings", async() => {
        const wrapper = shallowMount(DidYouKnow, opts);
        expect(wrapper).to.be.an("object");

        await Vue.nextTick();
        expect(wrapper.isVisible()).to.be.true;
        expect(wrapper.vm.currentIndex).to.equal(0);
    });

    it("render <a> if link is provided", async() => {
        const wrapper = mount(DidYouKnow, opts);

        await Vue.nextTick();
        expect(wrapper.find("a").isVisible()).to.be.true;
        expect(wrapper.find("a").text()).to.equal("Das meistgenutzte Betriebssystem bei den Zugriffen auf die UDP ist Windows 10 launch");
        expect(wrapper.vm.linkUrl).to.equal("http://123.xyz");
    });

    it("render <p> if no link is provided", async() => {
        const data = {
            action: null,
            items: [
                {label: "Das meistgenutzte Betriebssystem bei den Zugriffen auf die UDP ist Windows 10"},
                {label: "Der Datensatz mit den meisten Zugriffen im Jahr 2019 war der Stadtplan der FHH"}
            ]
        };
        const opts = {
            propsData: {
                data,
                interval: 5000,
            },
            mocks: {
                $t: () => 'some specific text'
            }
        }
        const wrapper = mount(DidYouKnow, opts);

        await Vue.nextTick();
        expect(wrapper.find("a").exists()).to.be.false;
        expect(wrapper.find("p").isVisible()).to.be.true;
        expect(wrapper.find("p").text()).to.equal("Das meistgenutzte Betriebssystem bei den Zugriffen auf die UDP ist Windows 10");
    });

    it("change text on interval", async () => {
        const wrapper = mount(DidYouKnow, opts);

        clock.tick(5100);
        await Vue.nextTick();
        expect(wrapper.vm.currentIndex).to.equal(1);
        expect(wrapper.find("a").text()).to.equal("Der Datensatz mit den meisten Zugriffen im Jahr 2019 war der Stadtplan der FHH launch");
    });

    it("emit event if action is md_id", async () => {
        const wrapper = mount(DidYouKnow, opts);

        clock.tick(5100);
        await Vue.nextTick();
        expect(wrapper.emitted('show-in-map').length).to.equal(1);
        expect(wrapper.emitted('show-in-map')[0][0]).to.have.property("label");
    })
});