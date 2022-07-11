import request from '@/utils/request'
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'login',
    data
  })
}
export const getMenu = () => {
  return request({
    url: 'menus'
  })
}

export const getTableList = (params) => {
  return request({
    url: 'users',
    params
  })
}

export const changeStatus = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}
