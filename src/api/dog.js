import request from '@/utils/request'

export const getDogList = (params) =>
  request(
    {
      url: '/dog/page',
      method: 'get',
      params
    }
  )

export const addDog = (data) =>
  request(
    {
      url: '/dog/add',
      method: 'post',
      data
    }
  )

export const getDogById = (id) =>
  request(
    {
      url: `/dog/${id}`,
      method: 'get'
    }
  )

export const updateDog = (id, data) =>
  request(
    {
      url: `/dog/update/${id}`,
      method: 'put',
      data
    }
  )

export const deleteDogById = (id) =>
  request(
    {
      url: `/dog/delete/${id}`,
      method: 'delete'
    }
  )

export const startOrStopDog = (id, status) =>
  request(
    {
      url: `/dog/status/${id}`,
      method: 'put',
      data: {
        status
      }
    }
  )
