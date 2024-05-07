import { createRouter, createWebHashHistory } from 'vue-router'
import CommonLayout from '@/layout/index.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/',
    component: CommonLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/data/index.vue')
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/order/index.vue')
      },
      {
        path: 'employee',
        name: 'Employee',
        component: () => import('@/views/employee/index.vue')
      },
      {
        path: 'dog',
        name: 'Dog',
        component: () => import('@/views/dog/index.vue')
      },
      {
        path: 'toy',
        name: 'Toy',
        component: () => import('@/views/toy/index.vue')
      },
      {
        path: 'food',
        name: 'Food',
        component: () => import('@/views/food/index.vue')
      },
      {
        path: 'drug',
        name: 'Drug',
        component: () => import('@/views/drug/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
