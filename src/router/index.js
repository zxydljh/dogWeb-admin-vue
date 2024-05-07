import { createRouter, createWebHashHistory } from 'vue-router'
import CommonLayout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: CommonLayout
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
