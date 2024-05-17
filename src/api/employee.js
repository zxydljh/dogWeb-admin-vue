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
