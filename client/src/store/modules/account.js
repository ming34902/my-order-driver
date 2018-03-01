import { login, logout, getInfo } from '@/api/sys/account'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { localstore } from '@/utils/util'

const account = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ENTITYNAME: (state, entityName) => {
      state.entityName = entityName
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const userKey = userInfo.userKey.trim()
      return new Promise((resolve, reject) => {
        login(userKey, userInfo.password).then(response => {
          const data = response.data
          setToken(data.Authorization)
          commit('SET_TOKEN', data.Authorization)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 免费注册
    Register({ commit }) {
      return new Promise((resole, reject) => {
        const register = '123'
        setToken(register)
        commit('SET_TOKEN', register)
        resole()
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.userName)
          commit('SET_AVATAR', data.avatar)
          commit('SET_ENTITYNAME', data.entityName)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          localstore('visitedViews',null)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default account
