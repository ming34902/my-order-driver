import fetch from '@/utils/fetch'
export function queryPage(data) {
  return fetch({
    url: '/role/queryPage',
    method: 'post',
    data
  })
}

export function create(data) {
  return fetch({
    url: '/role/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return fetch({
    url: '/role/update',
    method: 'post',
    data
  })
}

export function deleted(data) {
  return fetch({
    url: '/role/delete',
    method: 'post',
    data
  })
}

export function treeAllPermisson() {
  return fetch({
    url: '/permission/treeAll',
    method: 'get'
  })
}

export function listOwnPermisson(roleId) {
  return fetch({
    url: '/role/permission/own',
    method: 'get',
    params: { roleId }
  })
}

export function updateRoleAuthorize(roleId, permissionIds) {
  const data = {
    roleId,
    permissionIds
  }
  return fetch({
    url: '/role/permission/update',
    method: 'post',
    data
  })
}

