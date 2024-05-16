import request from '@/utils/request'

export const login = (userInfo) =>
  request({
    url: '/employee/login',
    method: 'post',
    data: userInfo
  })

export const logout = (params) =>
  request({
    url: '/employee/logout',
    method: 'post',
    params
  })

export const getEmployeeList = (params) =>
  request({
    url: '/employee/page',
    method: 'get',
    params
  })
