import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
// 引用编译后的代码，生产环境
// import { MySelect, MyOption } from './dist/element-select.js';
// 引用源码，开发环境
import { MySelect, MyOption } from './lib/index.js';

Vue.use(ElementUI);
Vue.component('MySelect', MySelect);
Vue.component('MyOption', MyOption);

Vue.config.productionTip = false;

export default new Vue({
  el: '#app',
  render: (h) => h(App),
});
