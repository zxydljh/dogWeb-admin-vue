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
    path: '/500',
    name: '500',
    component: () => import('@/views/500.vue')
  },
  {
    path: '/',
    component: CommonLayout,
    redirect: '/order',
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
        path: 'orderDetail/:id',
        name: 'OrderDetail',
        component: () => import('@/views/order/components/orderDetail.vue'),
        props: true
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
      // 编辑员工 跳转到 addEmployee组件中，但是要传递id
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
        path: 'editDog/:id',
        name: 'EditDog',
        component: () => import('@/views/dog/components/addDog.vue'),
        props: true
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
        path: 'editToy/:id',
        name: 'EditToy',
        component: () => import('@/views/toy/components/addToy.vue'),
        props: true
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
      },
      {
        path: 'editDrug/:id',
        name: 'EditDrug',
        component: () => import('@/views/drug/components/addDrug.vue'),
        props: true
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/feedback/index.vue')
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
