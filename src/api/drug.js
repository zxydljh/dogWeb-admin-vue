import request from '@/utils/request'

export const getDrugList = (params) =>
  request(
    {
      url: '/drug/page',
      method: 'get',
      params
    }
  )

export const addDrug = (data) =>
  request(
    {
      url: '/drug/add',
      method: 'post',
      data
    }
  )

export const getDrugById = (id) =>
  request(
    {
      url: `/drug/${id}`,
      method: 'get'
    }
  )

export const updateDrug = (id, data) =>
  request(
    {
      url: `/drug/update/${id}`,
      method: 'put',
      data
    }
  )

export const deleteDrugById = (id) =>
  request(
    {
      url: `/drug/delete/${id}`,
      method: 'delete'
    }
  )

export const startOrStopDrug = (id, status) =>
  request(
    {
      url: `/drug/status/${id}`,
      method: 'put',
      data: {
        status
      }
    }
  )
