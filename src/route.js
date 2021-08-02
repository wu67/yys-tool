import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/heroList'
    },
    {
      name: 'heroList',
      path: '/heroList',
      component: () => import('@/pages/heroList.vue')
    },
    {
      name: 'equipList',
      path: '/equipList',
      component: () => import('@/pages/equipList.vue')
    },
    {
      name: 'userData',
      path: '/userData',
      component: () => import('@/pages/userData.vue')
    },
    {
      name: 'equipAnalysis',
      path: '/equipAnalysis',
      component: () => import('@/pages/equipAnalysis.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
