 import Mock from 'mockjs'
 import nav from './nav'
 import loginAPI from './login'
 import  topNavAPI from './nav'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
 Mock.mock(/\/account\/login/, 'post', loginAPI.login)
 Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
 Mock.mock(/\/account\/info\.*/, 'get', loginAPI.getInfo)

 // 获取topNav


 //根据角色token调后端可用路由的假请求
 //初始可用的全部子路由
 Mock.mock(/\/permission\/firstMenu/, 'post', topNavAPI.GetTopNavs)
 Mock.mock(/\/permission\/subMenu/, 'post', nav.GetSideNavs)

 export default Mock
