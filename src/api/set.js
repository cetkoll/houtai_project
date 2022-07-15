import request from '@/utils/request'
//! 获取表格数据
export const getRoles = () => {
  return request({
    url: 'roles'
  })
}
//! 删除单个权限
export const delUserSet = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
//! 获取树的数据
export const getTree = () => {
  return request({
    url: 'rights/tree'
  })
}
//! 批量添加或删除用户权限
export const setTree = ({ roleId, rids }) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
