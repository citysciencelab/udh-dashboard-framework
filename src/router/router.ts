import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// import(/* webpackChunkName: "yourdashboardname" */ '@/views/yourdashboardname.vue') makes sure that components are lazy loaded

export default new Router({
  routes: [
    {
      path: '*',
      name: 'udpc',
      component: () => import(/* webpackChunkName: "udpc" */ '@/views/UDPC.vue')
    },
    {
      path: '/udpc',
      name: 'udpc',
      component: () => import(/* webpackChunkName: "udpc" */ '@/views/UDPC.vue')
    },
    {
      path: '/participation',
      name: 'participation',
      component: () => import(/* webpackChunkName: "udpc" */ '@/views/Participation.vue')
    }
  ]
})
