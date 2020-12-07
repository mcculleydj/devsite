import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSketch: true,
  },
  getters: {
    showSketch: state => state.showSketch,
  },
  mutations: {
    SET_SHOW_SKETCH(state, payload) {
      state.showSketch = payload
    },
  },
  actions: {
    setShowSketch({ commit }, payload) {
      commit('SET_SHOW_SKETCH', payload)
    },
  },
  modules: {},
})
