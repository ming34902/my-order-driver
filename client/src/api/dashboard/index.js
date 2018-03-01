import fetch from '@/utils/fetch'

export function getHeard() {
  return fetch({
    url: '/chart/getCurrentDayCount',
    method: 'get',
    data: {}
  })
}

export function getCurrentMonthCount() {
  return fetch({
    url: '/chart/getCurrentMonthCount',
    method: 'get',
    data: {}
  })
}

export function getCurrentYearCount() {
  return fetch({
    url: '/chart/getCurrentYearCount',
    method: 'get',
    data: {}
  })
}

export function getHistoryCount() {
  return fetch({
    url: '/chart/getHistoryCount',
    method: 'get',
    data: {}
  })
}

export function getWarehouseCount() {
  return fetch({
    url: '/chart/getWarehouseCount',
    method: 'get',
    data: {}
  })
}

export function getSaleCount() {
  return fetch({
    url: '/chart/getSaleCount',
    method: 'get',
    data: {}
  })
}
