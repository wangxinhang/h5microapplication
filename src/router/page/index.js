// import Home from '@/views/Home.vue'
export default [{
    path: '/login',
    component: () => import( /* webpackChunkName: "about" */ '@/page/login/index.vue')
  },
  {
    path: '/404',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/components/error-page/404'),
  },
  {
    path: '/403',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/components/error-page/403'),
  },
  {
    path: '/500',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/components/error-page/500'),
  },
  {
    path: '*',
    redirect: '/404'
  }
]