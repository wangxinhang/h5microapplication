/**
 * 全站路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 */
import VueRouter from 'vue-router';
import mainRouter from './main/'
import Vue from 'vue';
// import Store from '../store/';

Vue.use(VueRouter);

let Router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    },
    routes: [...mainRouter]
});
// Router.addRoutes([...mainRouter]);
export default Router;