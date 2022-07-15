import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    houtai: {
      token: '',
      time: 0
    }
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.houtai.token = payload
    },
    setTime (state, payload) {
      state.houtai.time = Date.now()
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
