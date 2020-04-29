import Vue from 'vue';
import CountryFlag from 'vue-country-flag';
import 'ant-design-vue/dist/antd.css';
import { Slider, message } from 'ant-design-vue';
import VueI18n from 'vue-i18n';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueMaterial from 'vue-material';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import { messages } from './messages/messages.module';
import utils from './utils/utils';

// Module augmentations for Vue
declare module 'vue/types/vue' {
    interface Vue {
      $utils: IUtils
      renderChart(chartData: Chart.ChartData, options?: Chart.ChartOptions): void
      addPlugin (plugin?: object): void
    }
  }

// We import ant-design because vue-material does not have a slider - maybe generally?
Vue.component(Slider.name, Slider);
Vue.use(Slider);
Vue.prototype.$message = message;

// Internationalization
Vue.use(VueI18n);

// Bootstrap
Vue.use(BootstrapVue);

// Vue-Material
// Not recommended - import what you need to not hurt performance (https://vuematerial.io/getting-started)
Vue.use(VueMaterial);

Vue.config.productionTip = false;

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
