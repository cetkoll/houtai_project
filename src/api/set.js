import request from '@/utils/request'
export const getRoles = () => {
  return request({
    url: 'roles'
  })
}

export const delUserSet = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

export const getTree = () => {
  return request({
    url: 'rights/tree'
  })
}

export const setTree = ({ roleId, rids }) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
