import request from '@/utils/request'

export const getStatisticsData = () =>
  request(
    {
      url: '/data/statistics',
      method: 'get'
    }
  )
