import fetch from '@/utils/fetch'
export function queryPage(data) {
  return fetch({
    url: '/user/queryPage',
    method: 'post',
    data
  })
}

export function create(data) {
  return fetch({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return fetch({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function deleted(data) {
  return fetch({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function allRole() {
  return fetch({
    url: '/role/all',
    method: 'get'
  })
}

export function ownRole(userId) {
  return fetch({
    url: '/user/ownRole',
    method: 'get',
    params: { userId }
  })
}

export function grantRole(userId, roleIds) {
  const data = {
    userId,
    roleIds
  }
  return fetch({
    url: '/user/grantRole',
    method: 'post',
    data
  })
}

export function listUsers() {
  return fetch({
    url: '/user/listUsers',
    method: 'get'
  })
}

