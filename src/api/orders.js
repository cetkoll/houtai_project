import request from '@/utils/request'
export const getOrders = (params) => {
  return request({
    url: 'orders',
    params
  })
}
