const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.account.token,
  avatar: state => state.account.avatar,
  name: state => state.account.name,
  roles: state => state.account.roles,
  entityName: state => state.account.entityName,
  allrouter: state => state.navs.routers,
  nav_routers: state => state.navs.addRouters,
  nav_menus: state => state.navs.navmenus,
  visitedViews: state => state.app.visitedViews,
  cachedViews: state => state.app.cachedViews
}
export default getters
