import request from '@/utils/request'

export const getFeedbackList = (params) => {
  return request({
    url: '/feedback/list',
    method: 'get',
    params
  })
}

export const deleteFeedbackById = (id) => {
  return request({
    url: `/feedback/delete/${id}`,
    method: 'delete'
  })
}
