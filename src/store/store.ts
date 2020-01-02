import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import charts from "./charts.module";
// import watcher from "../plugins/watcher";

Vue.use(Vuex);

export default new Store<{}>({ // type of root state is '{}'
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
