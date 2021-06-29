// import firebase from "firebase/app";
import firebase from 'firebase'

export const todo = {
  state: {
    loadedTodos: [],
  },
  getters: {
    getTodo(state) {
      return state.loadedTodos
    },
  },
  mutations: {
    setTodos(state, payload) {
      state.loadedTodos = payload
    },
    createTodo(state, payload) {
      state.loadedTodos.push(payload)
    },
    updateTodo(state) {
      return state.loadedTodos
    },
    delete(state) {
      return state.loadedTodos

    }
  },
  actions: {
    loadTodos({ commit }) {
      firebase.database().ref('todo').once('value')
        .then((response) => {
          let todos = []
          let obj = response.val()
          for (let key in obj) {
            todos.push({
              id: key,
              todo: obj[key].todo,
              done: obj[key].done
            })
          }
          commit("setTodos", todos);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    createTodo({ commit }, payload) {
      const todo = {
        todo: payload.todo,
        done: payload.done,
      }
      firebase.database().ref('todo').push(todo)
        .then(() => {
          commit('createTodo',
            todo,
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeDone({ commit }, { id, done }) {
      try {
        const changedTodo = firebase.database().ref('todo').child(id)
        changedTodo.update({
          done: !done
        })
        commit('updateTodo')
        console.log(done);
        //firebase.database().ref('todo')[id].push(changedTodo)
      }
      catch (error) {
        console.log(error)
      }

    },
    deleteTodo({ commit }, id) {
      try {
        const deleteTodo = firebase.database().ref("todo").child(id);
        deleteTodo.remove();
        console.log(id)
        commit('delete');
      }
      catch (error) {
        console.log(error)
      }
    },
  }
}

