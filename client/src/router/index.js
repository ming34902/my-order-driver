
import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

import  test from '../views/test/test'
import  send from  '../views/send/orderSend'
/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will not redirct in the levelbar
* noDropdown : if `noDropdown:true` will not has submenu in the sidebar
* meta : `{ role: ['admin'] }`  will control the page role
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorpage/404'), hidden: true },
  { path: '/401', component: _import('errorpage/401'), hidden: true },
  { path: '/register', component: _import('register/register'), hidden: true },
  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    hidden: true,
    children: [
      { path: '/',
        component: _import('layout/hcsAppMain'),
        children: [{path:'/', name:'首页',components: {main:_import('dashboard/index')} }]
      },
      { path: 'test', name:'test',component: _import('send/orderSend') },
      // { path: 'send', name:'orderSend', component: _import('send/orderSend'),}
      ]
  },
  // {
  //   path: '/test2',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     { path: 'test', name:'test',component: _import('test/test') }
  //     // { path: 'dashboard', name:'首页',component: _import('dashboard/index') }
  //   ]
  // },
]

export default new Router({
  //mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


