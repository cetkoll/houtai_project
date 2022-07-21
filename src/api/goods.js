import request from '@/utils/request'
//! 获取商品列表
export const getGoodsList = (params) => {
  return request({
    url: 'goods',
    params
  })
}
//! 获取分类列表
export const getCategories = (params) => {
  return request({
    url: 'categories',
    params
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

//! 添加或删除分类参数
export const updataAttr = ({ id, attrId, data }) => {
  return request({
    method: 'PUT',
    url: `categories/${id}/attributes/${attrId}`,
    data
  })
}

//! 添加动态或静态参数
export const addAttr = (id, data) => {
  return request({
    method: 'POST',
    url: `categories/${id}/attributes`,
    data
  })
}

//! 删除参数
export const delAttr = (id, attrid) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}/attributes/${attrid}`
  })
}

//! 添加分类
export const addCate = (data) => {
  return request({
    method: 'POST',
    url: 'categories',
    data
  })
}
