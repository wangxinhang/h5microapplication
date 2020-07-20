import Vue from 'vue'
import store from './store'
import axios from './router/axios';
import VueAxios from 'vue-axios';
import router from './router/router';
import App from './App.vue'
import './permission'; // 权限
import './error'; // 日志
import './mock'; // mock模拟接口
import RouteTransition from 'vue-route-transition' //路由转场动画
import Vant from 'vant';
import 'vant/lib/index.css';
import Ripple from 'vue-ripple-directive'

Vue.use(RouteTransition)
Vue.use(VueAxios, axios)
Vue.use(Vant);

Vue.directive('ripple', Ripple);
Ripple.color = 'rgba(0, 0, 0, 0.2)'; //自定义点击水波纹颜色

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