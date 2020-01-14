import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import dashboard from './dashboard.module';

Vue.use(Vuex);

export default new Store<RootState>({
    // Additional modules are lazy-loaded in UDPC.vue
    modules: {
        dashboard
    }
})
