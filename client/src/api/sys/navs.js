import fetch from '@/utils/fetch'

export function GetTopNavs() {
  return fetch({
    url: '/permission/firstMenu',
    method: 'post'
  })
}

export function GetSideNavs(pid) {
  return fetch({
    url: '/permission/subMenu',
    method: 'post',
    data: { pid }
  })
}

