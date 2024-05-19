import request from '@/utils/request'

export const getFoodList = (params) =>
  request(
    {
      url: '/food/page',
      method: 'get',
      params
    }
  )

export const addFood = (data) =>
  request(
    {
      url: '/food/add',
      method: 'post',
      data
    }
  )

export const getFoodById = (id) =>
  request(
    {
      url: `/food/${id}`,
      method: 'get'
    }
  )

export const updateFood = (id, data) =>
  request(
    {
      url: `/food/update/${id}`,
      method: 'put',
      data
    }
  )

export const deleteFoodById = (id) =>
  request(
    {
      url: `/food/delete/${id}`,
      method: 'delete'
    }
  )

export const startOrStopFood = (id, status) =>
  request(
    {
      url: `/food/status/${id}`,
      method: 'put',
      data: {
        status
      }
    }
  )
