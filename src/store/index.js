import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './user/user'
import { todo } from './todo/todo'
import { list } from './list/list'
import { temp } from './temperature/temp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user,
    todo,
    list,
    temp
  }
})

// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     user: null
//   },
//   getters: {
//     currentUser(state) {
//       return state.user
//     }
//   },
//   mutations: {
//     SET_USER(state, user) {
//       state.user = user;
//     }
//   },
//   actions: {
//     setUser({ commit }, user) {
//       commit('SET_USER', user)
//     }
//   },
//   modules: {
//   }
// })