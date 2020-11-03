import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 公共样式
import './assets/common.css'
// 屏幕变化重新设置
import 'amfe-flexible'

Vue.config.productionTip = false
import {
  Toast,
  Search
} from "vant";
Vue.use(Toast).use(Search);
Vue.prototype.$toast = Toast
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')