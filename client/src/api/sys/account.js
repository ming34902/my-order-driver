import fetch from '@/utils/fetch'
var qs = require('qs')

export function login(username, password) {
  return fetch({
    url: '/account/login',
    method: 'post',
    data: qs.stringify({
      username,
      password
    })
  })
}

export function getInfo() {
  return fetch({
    url: '/account/info',
    method: 'get'
  })
}

export function logout() {
  return fetch({
    url: '/account/logout',
    method: 'post'
  })
}

export function examinPassword (password) {
  return fetch({
    url: '/account/examinPassword',
    method: 'get',
    params: { password }
  })
}

export function updatePwd (password) {
  return fetch({
    url: '/account/updatePwd',
    method: 'post',
    data: qs.stringify({
      password
    })
  })
}
