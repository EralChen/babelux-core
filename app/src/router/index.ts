import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DEMO_MASTER from './_demo-master'
export const routes: Array<RouteRecordRaw> = [
  ...DEMO_MASTER,
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('_v/home.vue'),
  },

  {
    path: '/login',
    component: () => import('_v/login/index.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL + '/'),
  routes,
})

export default router