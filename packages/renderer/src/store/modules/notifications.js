let maxId = 0
export default {
  namespaced: true,
  state: {
    all: [],
  },
  mutations: {
    add(state, data) {
      state.all.push(data)
    },
    remove(state, id) {
      state.all = state.all.filter(notification => notification.id !== id)
    },
    clear(state) {
      state.all = []
    },
  },
  actions: {
    add({ commit }, message) {
      const id = ++maxId
      commit('add', { id, message })
      setTimeout(() => commit('remove', id), 4000)
    },
  },
}
