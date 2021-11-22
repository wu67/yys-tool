import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
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
    },
    {
      name: 'aboutThis',
      path: '/aboutThis',
      component: () => import('@/pages/aboutThis.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  }
})

export default router
