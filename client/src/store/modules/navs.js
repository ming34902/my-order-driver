
import { constantRouterMap } from '@/router'
import { GetSideNavs,GetTopNavs } from '@/api/sys/navs'
import path from '@/router/path'
import { GetDiffRoutes } from '@/utils/util'

const navs = {
  state: {
    routers: [],
    addRouters: [],
    navmenus: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
    },
    SET_NullROUTERS: (state, routers) => {
      state.addRouters = routers
    },
    SET_NavMenus: (state, menus) => {
      state.navmenus = menus
    },
    SET_ALLROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
    //首次进入首页时，获取侧边菜单(初始获取是pid默认为1)
    InitSideNavs({commit}, pid) {
      return new Promise(resolve => {
        GetSideNavs(pid).then(response => {
          var filterRouters = filterNavs(path, response.data);
          commit('SET_ROUTERS', filterRouters)
          resolve()
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //初始化前端全部子路由
    InitRouter({commit}){
      return new Promise(resolve => {
        var pid = 1
        GetSideNavs(pid).then(response => {
          var filterRouters = filterNavs(path, response.data);
          commit('SET_ALLROUTERS', filterRouters)
          resolve()
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //点击顶部菜单时，获取侧边菜单
    GenerateSideNavsByTopNav({commit}, pid) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', path)
        resolve()
      }).catch(error => {
        console.log(error)
      })
    },
    ClearRouters({commit}) {
      commit('SET_NullROUTERS', [])
    },
    GetTopMenus({commit},menus) {
      commit('SET_NavMenus', menus)
    }
  }
}

/**
 *
 * @param navs 前端维护的路由全集
 * @param perms 后端返回的可访问菜单（仅包含名称）
 */
function filterNavs(navs,perms){
  let AllRouters=[
    {name: "应用程序"},{name: "应用程序信息"},{name: "WEB应用配置"},{name: "页面元素配置"}, {name: "应用API"}, {name: "移动应用"}, {name: "移动应用配置"},
    {name:"账号"},{name:"子账号管理"},{name:"个人信息"},{name:"修改密码"},
    {name:"权限管理"},{name:"角色"},{name:"权限组"},{name:"配置数据权限"},{name:"配置明细"},
    {name:"对象管理"},{name:"对象详情"},{name:"字段关系"},{name:"字段详情"},{name:"字段查找"},{name:"订单派发"}
  ]
  perms= perms.concat(AllRouters)
  //console.log('arr.concat',perms);
  //console.log('store-filterNavs-navs',navs);
  const accessableRouters = navs.filter(route =>{
    if(hasPermissions(route,perms)){
      if (route.children && route.children.length){
        route.children = filterNavs(route.children, perms)
      }
      return true
    }
    return false
  })
return accessableRouters
}

/**
 *
 * @param nav 前端维护的路由（单条）
 * @param perms（后端返回的可访问菜单）
 * @returns {boolean}
 */

function hasPermissions(nav,perms){
  if (nav && nav.name) {
    return perms.some(perm => nav.name.indexOf(perm.name) >= 0)
  } else {
    return true
  }
}


export default navs
