import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/udpc',
      name: 'udpc',
      component: () => import(/* webpackChunkName: "udpc" */ '../views/UDPC.vue')
    },
    {
      path: '/participation',
      name: 'participation',
      component: () => import(/* webpackChunkName: "udpc" */ '../views/Participation.vue')
    }
  ]
})
