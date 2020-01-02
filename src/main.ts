import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import CountryFlag from 'vue-country-flag';

//We import ant-design because vue-material does not have a slider - maybe generally?
import 'ant-design-vue/dist/antd.css';
import { Slider, message } from 'ant-design-vue';
Vue.component(Slider.name, Slider);
Vue.use(Slider);
Vue.prototype.$message = message;

// Internationalization
import VueI18n from 'vue-i18n';
import { messages } from './store/messages.module';
Vue.use(VueI18n);

//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import './assets/scss/material-dashboard.scss';
import './assets/scss/_fonts.scss';

// Vue-Material
// Not recommended - import what you need to not hurt performance (https://vuematerial.io/getting-started)
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueMaterial from 'vue-material';
Vue.use(VueMaterial);

Vue.config.productionTip = false;

import utils from './utils/utils';
Vue.use(new utils);

Vue.component('country-flag', CountryFlag);

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
