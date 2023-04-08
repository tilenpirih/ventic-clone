import Vue from 'vue'
import Vuex from 'vuex'
import Notifications from './modules/notifications'
import Dashboard from './modules/dasboard'
import Movies from './modules/movies'
import Shows from './modules/shows'
import Home from './modules/home'
import SelectedMedia from './modules/selectedMedia'
import Settings from './modules/settings/settings'
import Search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    miniDrawer: false,
  },
  mutations: {
    SET_MINI_DRAWER: (state, value) => {
      if (value === undefined) {
        state.miniDrawer = !state.miniDrawer
      } else {
        state.miniDrawer = value
      }
    },
  },
  actions: {
    setMiniDrawer: ({ commit }, value) => {
      commit('SET_MINI_DRAWER', value)
    },
  },
  modules: {
    Notifications,
    Dashboard,
    Movies,
    Shows,
    Home,
    SelectedMedia,
    Settings,
    Search,
  },
})
