import request from '@/utils/request'

export const getStatisticsData = () =>
  request(
    {
      url: '/data/statistics',
      method: 'get'
    }
  )

export const getOrderStatisticsData = () =>
  request(
    {
      url: '/data/orderStatistics',
      method: 'get'
    }
  )

export const getGoodsStatisticsData = () =>
  request(
    {
      url: '/data/goodsStatistics',
      method: 'get'
    }
  )
