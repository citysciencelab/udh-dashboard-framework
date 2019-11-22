import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import CountryFlag from 'vue-country-flag'
import * as d3 from 'd3'
import d3tip from 'd3-tip'

//We import ant-design because vue-material does not have a slider - maybe generally?
import 'ant-design-vue/dist/antd.css';
import { Slider, message } from 'ant-design-vue';

//internationalization
import VueI18n from 'vue-i18n'

//Bootstrap & Material Dashboard elements
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//d1st-uisystem-base - HH styles import
import 'd1st-uisystem-base/public/dist/bundled.min.css'
import * as d1hh from 'd1st-uisystem-base/public/dist/bundle.js'

// Not recommended - import what you need to not hurt performance (https://vuematerial.io/getting-started)
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueMaterial from 'vue-material'

import App from './App.vue'
import router from './router/router'
import store from './store/store'
import { messages } from './store/messages.module'
import './assets/scss/material-dashboard.scss';
import './assets/scss/_fonts.scss';
import utils from './utils/utils'

d3.tip = d3tip;

Vue.component(Slider.name, Slider);
Vue.use(Slider);
Vue.use(VueI18n);
Vue.use(BootstrapVue);
Vue.use(VueMaterial);
Vue.use(utils);

Vue.prototype.$message = message;
Vue.prototype.$d3 = d3;
Vue.prototype.$d1hh = d1hh;

Vue.component('country-flag', CountryFlag);

Vue.config.productionTip = false;

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'de',
    messages, // set locale messages
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
