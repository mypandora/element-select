import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { ElSelect, ElOption } from '@select';
import App from './App.vue';

Vue.use(ElementUI);
Vue.config.productionTip = false;
// Register the component globally
Vue.component('MySelect', ElSelect);
Vue.component('MyOption', ElOption);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
