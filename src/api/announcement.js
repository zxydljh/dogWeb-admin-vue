import request from '@/utils/request'

export const publishAnnouncement = (data) =>
  request(
    {
      url: '/announcement/publish',
      method: 'post',
      data
    })

export const getAnnouncementList = () =>
  request(
    {
      url: '/announcement/list',
      method: 'get'
    })
