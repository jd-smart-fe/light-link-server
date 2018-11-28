// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Stone from 'vue-stone'
import 'vue-stone/dist/vue-stone.css'
import 'vue-stone/dist/iconfonts.js';
import 'vue-stone/dist/iconfonts.css';
require('./libs/style.css');

Stone.install(Vue);
/* eslint disable next line */
if (process.env.NODE_ENV === 'development') {
  const jdsmart = require('welink-devtool-sdk');
  window.JDSMART = jdsmart;
}
import SmartSDK from './libs/SmartSDKUtils';
Vue.config.productionTip = false;
window.SmartSDK = SmartSDK;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
