/**
 * 全站权限配置
 *
 */
import router from './router/router'
import store from './store'
import {
  validatenull
} from '@/util/validate'
import {
  getToken
} from '@/util/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({
  showSpinner: false
});
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.length === 0 && to.fullPath.indexOf("?sec") === -1) {
    next(to.path + "?sec");
    window.location.reload();
  } else {
    next();
  }
  //缓冲设置
  if (to.meta.keepAlive === true && store.state.tags.tagList.some(ele => {
      return ele.value === to.fullPath;
    })) {
    to.meta.$keepAlive = true;
  } else {
    if (to.meta.keepAlive === true && validatenull(to.meta.$keepAlive)) {
      to.meta.$keepAlive = true;
    } else {
      if (to.meta.$keepAlive === false) {
        to.meta.$keepAlive = false
      } else {
        to.meta.$keepAlive = true //菜单路由默认$keepAlive = true
      }
    }
  }
  const meta = to.meta || {};
  if (getToken()) {
  if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
      next({
        path: '/'
      })
    } else {
      //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
      // if (store.getters.token.length === 0) {
      //   store.dispatch('FedLogOut').then(() => {
      //     next({
      //       path: '/login'
      //     })
      //   })
      // } else {
        next()
      // }
    }
  } else {
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done();
  // let title = store.getters.tag.label;
  //根据当前的标签也获取label的值动态设置浏览器标题
  // router.$avueRouter.setTitle(title);
});
