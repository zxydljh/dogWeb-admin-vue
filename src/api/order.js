import request from '@/utils/request'

export const getOrderList = (params) =>
  request(
    {
      url: '/order/list/page',
      method: 'get',
      params
    }
  )

export const cancelOrderById = (id) =>
  request(
    {
      url: `/order/cancel/${id}`,
      method: 'put'
    }
  )

export const acceptOrderById = (id) =>
  request(
    {
      url: `/order/accept/${id}`,
      method: 'put'
    }
  )

export const deliverOrderById = (id) =>
  request(
    {
      url: `/order/deliver/${id}`,
      method: 'put'
    }
  )

export const completeOrderById = (id) =>
  request(
    {
      url: `/order/complete/${id}`,
      method: 'put'
    }
  )

export const refundOrderById = (id) =>
  request(
    {
      url: `/order/refund/${id}`,
      method: 'put'
    }
  )

export const getOrderDetailById = (id) =>
  request(
    {
      url: `/order/${id}`,
      method: 'get'
    }
  )
