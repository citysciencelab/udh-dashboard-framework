import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import dashboard from './dashboard.module';

Vue.use(Vuex);

export default new Store<RootState>({
    // type of root state is 'RootState'
    // see the 'Creating a new dashboard' part in the README.md for a short explanation of the store concept
    modules: {
        dashboard
    }
})
