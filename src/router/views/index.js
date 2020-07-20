// import Home from '@/views/Home.vue'
import index from '@/page/index/'
export default [{
    path: '/',
    component: index,
    redirect: '/home',
    children: [{
      path: '/home',
      component: () => import( /* webpackChunkName: "about" */ '@/views/home/index.vue')
    }, {
      path: '/tab',
      component: () => import( /* webpackChunkName: "about" */ '@/views/tab/index.vue')
    }, {
      path: '/swipe',
      component: () => import( /* webpackChunkName: "about" */ '@/views/swipe/index.vue')
    }]
  },
  {
    path: '/rate',
    meta: {
      keepAlive: false
    },
    component: () => import( /* webpackChunkName: "about" */ '@/views/home/rate.vue')
  },
  {
    path: '/button',
    component: () => import( /* webpackChunkName: "about" */ '@/views/home/button.vue')
  },
  {
    path: '/address',
    component: () => import( /* webpackChunkName: "about" */ '@/views/home/address.vue')
  },
  {
    path: '/demo',
    component: () => import( /* webpackChunkName: "about" */ '@/views/home/demo.vue')
  }
]