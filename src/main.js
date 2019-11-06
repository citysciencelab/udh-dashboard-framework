import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import charts from './charts'
import VueMaterial from 'vue-material'

import * as d3 from 'd3'
import d3tip from 'd3-tip'
d3.tip = d3tip;

//We import ant-design because vue-material does not have a slider - maybe generally?
import 'ant-design-vue/dist/antd.css';
import { Slider, message } from 'ant-design-vue';
Vue.component(Slider.name, Slider);
Vue.use(Slider);

Vue.prototype.$message = message;

// import FilterWatcher from './plugins/watcher'
// Vue.use(FilterWatcher, {store});

//CSS Imports
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './assets/scss/material-dashboard.scss';
import './assets/scss/_fonts.scss';

//d1st-uisystem-base
import 'd1st-uisystem-base/public/dist/bundled.min.css'
import * as d1hh from'd1st-uisystem-base/public/dist/bundle.js'

// Not recommended - import what you need to not hurt performance (https://vuematerial.io/getting-started)
Vue.use(VueMaterial);

Vue.config.productionTip = false;
Vue.use(charts);
Vue.use(BootstrapVue);

Object.defineProperty(Vue.prototype, '$d3', {value: d3});
Object.defineProperty(Vue.prototype, '$d1hh', {value: d1hh});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
