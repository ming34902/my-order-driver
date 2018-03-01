import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import account from './modules/account'
import navs from './modules/navs'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    account,
    navs
  },
  getters
})

export default store
