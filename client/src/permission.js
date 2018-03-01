import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth' // 验权
import {GetTopNavs} from '@/api/sys/navs'
import {sortMenu, matchPath} from '@/utils/util'
import path from '@/router/path'

const whiteList = ['/login', '/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
      if (to.path === '/login') {
        next({path: '/'})
        // NProgress.done()
      } else if(to.path==='/test'){
        //  这里做第三方权限认证

        next()
      } else {
        if (store.getters.roles.length === 0) {
          store.dispatch('GetInfo').then(res => { // 拉取用户信息
            GetTopNavs().then(response => {
              store.dispatch('GetTopMenus', response.data)
              store.dispatch('InitSideNavs', sortMenu(response.data))   // 根据order排序
              store.dispatch('InitRouter').then(() => {
                router.addRoutes(store.getters.allrouter);//动态添加可访问的路由
                next({...to})
              })
            })
            // next()
          }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
              Message.error('验证失败,请重新登录')
              NProgress.done()
              next({path: '/login'})
            })
          })
        } else {
          var isRouterMatched = matchPath(router.options.routes, to.path)
          if (isRouterMatched || to.path === '/dashboard') {
            next()
          }
          else {
            var isMatched = matchPath(path, to.path)
            if (isMatched) {
              store.dispatch('InitRouter').then(() => {
                var isPermissioned = matchPath(store.getters.allrouter, to.path)
                if (isPermissioned) {
                  next()
                }
                else {
                  next('/401')
                }
              })
            }
            else {
              next('/404')
            }
          }
        }
      }
    }
    else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
        NProgress.done()
      }
    }
  }
)

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
