import {param2Obj} from "@/utils";
var qs = require('qs')

const userMap = {
  admin: {
    code:0,
    data:{
      roles: ['admin','sales'],
      Authorization: 'admin',
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      userName: 'admin',
      entityName: 'yh'
    }

  },
  18612563578: {
    code:0,
    data:{
      roles: ['sales'],
      Authorization: '18612563578',
      introduction: '我是销售',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      userName: '18612563578',
      entityName:'yh'
    }
  }
}

export default {
  login: config => {
    console.log(qs.parse(config.body))
    const { username } = qs.parse(config.body)
    //let temp = userMap[username]
    return userMap[username]
  },
  getInfo: config => {
    //const { authorization } = param2Obj(config.url)
    const authorization = 'admin'
    if (userMap[authorization]) {
      return userMap[authorization]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
