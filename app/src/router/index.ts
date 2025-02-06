import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'home',
    },
    meta: {
      display: 0,
    },
  },

  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('_v/home/index.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHashHistory(`${import.meta.env.VITE_BASE_URL}/`),
  routes,
})

export default router
