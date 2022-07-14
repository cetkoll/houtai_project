import request from '@/utils/request'
//! 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'login',
    data
  })
}
//! 获取左侧导航栏
export const getMenu = () => {
  return request({
    url: 'menus'
  })
}
//! 获取用户列表
export const getTableList = (params) => {
  return request({
    url: 'users',
    params
  })
}
//! 修改用户状态
export const changeStatus = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}
//! 修改用户数据信息
export const updateUser = (id, { email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      email,
      mobile
    }
  })
}
//! 删除用户
export const delUser = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}

//! 获取用户的角色列表
export const getPower = () => {
  return request({
    url: 'roles'
  })
}

//! 修改用户角色
export const updatePower = ({ id, rid }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}

//! 添加用户
export const addUser = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}
