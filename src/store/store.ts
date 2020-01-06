import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import charts, { ChartsState } from './charts.module';
import { UDPCState } from './udpc.module';
// import watcher from '../plugins/watcher';

Vue.use(Vuex);

export interface RootState {
    charts: ChartsState;
    udpc: UDPCState;
}

export default new Store<RootState>({ // type of root state is 'RootState'
    /*
     *   More modules to follow. E.g. auth, gfi ...
     *   Good example for organising the vuex: https://github.com/gothinkster/vue-realworld-example-app/tree/master/src/store
     */
    modules: {
        charts
    },
    plugins: [
        // watcher
    ]
})
