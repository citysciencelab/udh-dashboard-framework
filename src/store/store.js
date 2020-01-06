import Vue from 'vue';
import Vuex from 'vuex';
import dashboard from "./dashboard.module";
// import watcher from "../plugins/watcher";

Vue.use(Vuex);

export default new Vuex.Store({
    /*
     *   More modules to follow. E.g. auth, gfi ...
     *   Good example for organising the vuex: https://github.com/gothinkster/vue-realworld-example-app/tree/master/src/store
     */
    modules: {
        dashboard
    },
    plugins: [
        // watcher
    ]
})
