import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import dashboard, { DashboardState } from './dashboard.module';
import {ParticipationState} from "@/store/participation.module";
import {UDPCState} from "@/store/udpc.module";

Vue.use(Vuex);

export interface RootState {
    // dashboard: DashboardState;
    udpc: UDPCState;
    participation: ParticipationState
}

export default new Store<RootState>({ // type of root state is 'RootState'
    /*
     *   More modules to follow. E.g. auth, gfi ...
     *   Good example for organising the vuex: https://github.com/gothinkster/vue-realworld-example-app/tree/master/src/store
     */
    modules: {
        dashboard
    }
})
