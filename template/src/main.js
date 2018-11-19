// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Stone from 'vue-stone';
import 'vue-stone/dist/vue-stone.css';
import SmartSDK from './libs/SmartSDK1.0.3';
import App from './App';


Vue.config.productionTip = false;

Stone.install(Vue);
require('./css/style.css');

window.SmartSDK = SmartSDK;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
