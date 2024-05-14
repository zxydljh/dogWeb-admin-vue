import request from '@/utils/request'

export const getEmployeeList = (params) =>
  request({
    url: '/employee/page',
    method: 'get',
    params
  })
