import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tab: 0,
    showSketch: true,
    sketchSource: 'sketch-outlined.png',
  },

  getters: {
    tab: state => state.tab,
    showSketch: state => state.showSketch,
    sketchSource: state => state.sketchSource,
  },

  mutations: {
    SET_TAB(state, payload) {
      state.tab = payload
    },

    SET_SHOW_SKETCH(state, payload) {
      state.showSketch = payload
    },

    SET_SKETCH_SOURCE(state, payload) {
      state.sketchSource = payload
    },
  },

  actions: {
    setTab({ commit }, payload) {
      commit('SET_TAB', payload)
    },

    setShowSketch({ commit }, payload) {
      commit('SET_SHOW_SKETCH', payload)
    },

    setSketchSource({ commit }, payload) {
      commit('SET_SKETCH_SOURCE', payload)
    },
  },
})
