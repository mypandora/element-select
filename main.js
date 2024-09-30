import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import { ElSelect, ElOption } from './lib/index.js';

Vue.use(ElementUI);
Vue.component('MySelect', ElSelect);
Vue.component('MyOption', ElOption);

Vue.config.productionTip = false;

export default new Vue({
  el: '#app',
  render: (h) => h(App),
});
