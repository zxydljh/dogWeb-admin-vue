import request from '@/utils/request'

export const login = (userInfo) =>
  request({
    url: '/employee/login',
    method: 'post',
    data: userInfo
  })

export const logout = () =>
  request({
    url: '/employee/logout',
    method: 'post'
  })

export const getEmployeeList = (params) =>
  request({
    url: '/employee/page',
    method: 'get',
    params
  })

export const addEmployee = (data) =>
  request({
    url: '/employee/add',
    method: 'post',
    data
  })

export const getEmployeeById = (id) =>
  request({
    url: `/employee/${id}`,
    method: 'get'
  })

export const updateEmployee = (id, data) =>
  request({
    url: `/employee/update/${id}`,
    method: 'put',
    data
  })
