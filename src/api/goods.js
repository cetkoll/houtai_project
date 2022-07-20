import request from '@/utils/request'
//! 获取商品列表
export const getGoodsList = (params) => {
  return request({
    url: 'goods',
    params
  })
}
//! 获取分类列表
export const getCategories = () => {
  return request({
    url: 'categories',
    params: {}
  })
}

//! 获取分类属性
export const cateList = (id, sel) => {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}
//! 添加商品
export const addGoods = (data) => {
  return request({
    method: 'POST',
    url: 'goods',
    data
  })
}
