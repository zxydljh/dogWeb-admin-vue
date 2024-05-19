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
        path: 'addEmployee',
        name: 'AddEmployee',
        component: () => import('@/views/employee/components/addEmployee.vue')
      },
      {
        path: 'editEmployee/:id',
        name: 'EditEmployee',
        component: () => import('@/views/employee/components/addEmployee.vue'),
        props: true
      },
      {
        path: 'dog',
        name: 'Dog',
        component: () => import('@/views/dog/index.vue')
      },
      {
        path: 'addDog',
        name: 'AddDog',
        component: () => import('@/views/dog/components/addDog.vue')
      },
      {
        path: 'toy',
        name: 'Toy',
        component: () => import('@/views/toy/index.vue')
      },
      {
        path: 'addToy',
        name: 'AddToy',
        component: () => import('@/views/toy/components/addToy.vue')
      },
      {
        path: 'food',
        name: 'Food',
        component: () => import('@/views/food/index.vue')
      },
      {
        path: 'addFood',
        name: 'AddFood',
        component: () => import('@/views/food/components/addFood.vue')
      },
      {
        path: 'editFood/:id',
        name: 'EditFood',
        component: () => import('@/views/food/components/addFood.vue'),
        props: true
      },
      {
        path: 'drug',
        name: 'Drug',
        component: () => import('@/views/drug/index.vue')
      },
      {
        path: 'addDrug',
        name: 'AddDrug',
        component: () => import('@/views/drug/components/addDrug.vue')
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
