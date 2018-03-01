import fetch from '@/utils/fetch'

export function tree() {
  return fetch({
    url: '/org/tree',
    method: 'get'
  })
}

export function list(parentId) {
  return fetch({
    url: '/org/list',
    method: 'get',
    params: { parentId }
  })
}

export function create(data) {
  return fetch({
    url: '/org/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return fetch({
    url: '/org/update',
    method: 'post',
    data
  })
}

export function deleted(data) {
  return fetch({
    url: '/org/delete',
    method: 'post',
    data
  })
}

export function listByUser() {
  return fetch({
    url: '/org/listByUser',
    method: 'get'
  })
}



