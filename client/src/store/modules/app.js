import Cookies from 'js-cookie'
import { session } from '@/utils/util'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    visitedViews: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      console.log('store-app-state',state);
      if (Array.isArray(state.visitedViews) && state.visitedViews.length === 0){
        if(Array.isArray(session('visitedViews')) && session('visitedViews').length !== 0){
          session('visitedViews').forEach( view => {
            state.visitedViews.push({
              name: view.name,
              path: view.path,
              isclose: view.name === '首页' ? false : true
            })
          })
        }
        else{

          if (state.visitedViews.some(v => v.path !== '/dashboard')){
            state.visitedViews.push({
              name: '首页',
              path: '/dashboard',
              isclose: false
            })
          }

          state.visitedViews.push({
            name: view.name,
            path: view.path,
            isclose: view.name === '首页' ? false : true
          })

          session('visitedViews',state.visitedViews);
        }
      }
      else{
        state.visitedViews.push({
          name: view.name,
          path: view.path,
          isclose: view.name === '首页' ? false : true
        })
        session('visitedViews',state.visitedViews);
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      session('visitedViews',state.visitedViews)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    }
  }
}

export default app
