const _import = require('./_import_' + process.env.NODE_ENV)
export default [
  {
    path: '/sys/admin/apply',
    component: (resolve) => require(['@/views/layout/Layout'], resolve),
    name: '应用程序',
    icon: 'chart',
    check: 'No',
    children: [
      {
        path:'applyProgramInfo',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'应用程序信息',components: {main:(resolve) => require(['@/views/sys/admin/apply/applyProgramInfo'], resolve)}
        }]
      },
      {
        path:'applyWebConfig',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'WEB应用配置',components: {main:(resolve) => require(['@/views/sys/admin/apply/applyWebConfig'], resolve)}
        }]
      },
      {
        path:'applyPageElementConfig',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'页面元素配置',components: {main:(resolve) => require(['@/views/sys/admin/apply/applyPageElementConfig'], resolve)}
        }]
      },
      {
        path:'applyAPI',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'应用API',components: {main:(resolve) => require(['@/views/sys/admin/apply/applyAPI'], resolve)}
        }]
      },
      {
        path:'applyMobile',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'移动应用',components: {main:(resolve) => require(['@/views/sys/admin/apply/applyMobile'], resolve)}
        }]
      },
      {
        path:'applyMobileConfig',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'移动应用配置',components: {main:(resolve) => require(['@/views/sys/admin/apply/applyMobileConfig'], resolve)}
        }]
      }
    ]
  },
  {
    path: '/sys/admin/account',
    component: (resolve) => require(['@/views/layout/Layout'], resolve),
    name: '账号',
    icon: 'chart',
    check: 'No',
    children: [
      {
        path:'accountSonManage',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'子账号管理',components: {main:(resolve) => require(['@/views/sys/admin/account/accountSonManage'], resolve)}
        }]
      },
      {
        path:'accountPersonInfo',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'个人信息',components: {main:(resolve) => require(['@/views/sys/admin/account/accountPersonInfo'], resolve)}
        }]
      },
      {
        path:'accountResetPwd',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'修改密码',components: {main:(resolve) => require(['@/views/sys/admin/account/accountResetPwd'], resolve)}
        }]
      },
    ]
  },
  {
    path: '/sys/admin/role',
    component: (resolve) => require(['@/views/layout/Layout'], resolve),
    name: '权限管理',
    icon: 'chart',
    check: 'No',
    children: [
      {
        path:'roleModel',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'角色',components: {main:(resolve) => require(['@/views/sys/admin/role/roleModel'], resolve)}
        }]
      },
      {
        path:'rolePerGroup',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'权限组',components: {main:(resolve) => require(['@/views/sys/admin/role/rolePerGroup'], resolve)}
        }]
      },
      {
        path:'roleDataPerConfig',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'配置数据权限',components: {main:(resolve) => require(['@/views/sys/admin/role/roleDataPerConfig'], resolve)}
        }]
      },
      {
        path:'roleDetail',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'配置明细',components: {main:(resolve) => require(['@/views/sys/admin/role/roleDetail'], resolve)}
        }]
      },
    ]
  },
  {
    path: '/sys/admin/object',
    // component: (resolve) => require(['@/views/sys/admin/role'], resolve),
    name: '对象管理',
    icon: 'chart',
    check: 'No',
    component: _import('layout/hcsAppMain'),
    children: [
      {
        path:'objectDetail',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'对象详情',components: {main:(resolve) => require(['@/views/sys/admin/object/objectDetail'], resolve)}
        }]
      },
      {
        path:'objectCodeContact',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'字段关系',components: {main:(resolve) => require(['@/views/sys/admin/object/objectCodeContact'], resolve)}
        }]
      },
      {
        path:'objectCodeDetail',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'字段详情',components: {main:(resolve) => require(['@/views/sys/admin/object/objectCodeDetail'], resolve)}
        }]
      },
      {
        path:'objectReviseCodeSearch',
        component: _import('layout/hcsAppMain'),
        check: 'No',
        children:[{
          path:'/',name:'字段查找',components: {main:(resolve) => require(['@/views/sys/admin/object/objectReviseCodeSearch'], resolve)}
        }]
      },
    ]
  },
  {path: '*', name: 'error', hidden: true, redirect: '/404\'/404\''},
  // {
  //   path:'test',
  //   component: (resolve) => require(['@/views/test/test'], resolve),
  //   name:'测试'
  // },
]
