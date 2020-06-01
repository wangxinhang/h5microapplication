import Vue from 'vue'
import store from './store'
import axios from './router/axios';
import VueAxios from 'vue-axios';
import router from './router/router';
import App from './App.vue'
import './permission'; // 权限
import './error'; // 日志

Vue.use(VueAxios, axios)

//异步函数成功与失败处理函数
Vue.prototype.awaitWrap = promise => {
  return promise
  .then(res => [res, null])
  .catch(err => [null, err])
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
