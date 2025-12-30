import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('_v/home/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(`${import.meta.env.VITE_BASE_URL}/`),
  routes,
})

export default router
