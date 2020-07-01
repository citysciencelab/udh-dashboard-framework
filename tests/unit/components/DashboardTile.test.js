import DashboardTile from "../../../src/components/DashboardTile.vue";
import {shallowMount} from "@vue/test-utils";
import {expect} from "chai";

// Test the DashboardTile component
describe("DashboardTile.vue", () => {

    it("initial settings", () => {
        const wrapper = shallowMount(DashboardTile);
        expect(wrapper).to.be.an("object");
    });

});
