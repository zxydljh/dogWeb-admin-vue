import request from '@/utils/request'

export const getToyList = (params) =>
  request(
    {
      url: '/toy/page',
      method: 'get',
      params
    }
  )

export const addToy = (data) =>
  request(
    {
      url: '/toy/add',
      method: 'post',
      data
    }
  )

export const getToyById = (id) =>
  request(
    {
      url: `/toy/${id}`,
      method: 'get'
    }
  )

export const updateToy = (id, data) =>
  request(
    {
      url: `/toy/update/${id}`,
      method: 'put',
      data
    }
  )

export const deleteToyById = (id) =>
  request(
    {
      url: `/toy/delete/${id}`,
      method: 'delete'
    }
  )

export const startOrStopToy = (id, status) =>
  request(
    {
      url: `/toy/status/${id}`,
      method: 'put',
      data: {
        status
      }
    }
  )
