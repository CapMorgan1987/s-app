// import firebase from "firebase/app";
import firebase from 'firebase'

export const list = {
  state: {
    loadedLists: [],
  },
  getters: {
    getList(state) {
      return state.loadedLists
    },
  },
  mutations: {
    setLists(state, payload) {
      state.loadedLists = payload
    },
    createList(state, payload) {
      state.loadedLists.push(payload)
    },
    update(state) {
      return state.loadedLists
    },
  },
  actions: {
    loadLists({ commit }) {
      firebase.database().ref('list').once('value')
        .then((response) => {
          let lists = []
          let obj = response.val()
          for (let key in obj) {
            lists.push({
              id: key,
              listName: obj[key].listName,
              list: obj[key].list,
            })
          }
          commit("setLists", lists);
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createList({ commit }, payload) {
      const list = {
        listName: payload.listName,
        list: payload.items,
      }
      firebase.database().ref('list').push(list)
        .then(() => {
          commit('createList',
            list,
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeListDone({ commit }, { id, i, done }) {
      try {
        const changedItem = firebase.database().ref('list/' + id + '/list/' + i)
        changedItem.once('value').then(function (snapshot) {

          let isDone = snapshot.val().done;
          isDone = !done
          console.log(isDone);
          changedItem.update({
            done: isDone
          })
        })

        console.log(done);
        console.log(changedItem);
        commit('update')
        //firebase.database().ref('todo')[id].push(changedTodo)  
      }
      catch (error) {
        console.log(error)
      }

    },
  }
}

