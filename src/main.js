import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import * as d3 from 'd3'
import charts from './charts'
import VueMaterial from 'vue-material'

//CSS Imports
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "./assets/scss/material-dashboard.scss";

Vue.config.productionTip = false;
Vue.use(charts);
Vue.use(BootstrapVue);

// Not recommended - import what you need to not hurt performance (https://vuematerial.io/getting-started)
Vue.use(VueMaterial);


Object.defineProperty(Vue.prototype, '$d3', {value: d3});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
