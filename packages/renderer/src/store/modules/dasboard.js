export default {
  namespaced: true,
  state: {
    // TODO save drawer state in localStorage
    miniDrawer: false,
    dialog: false,
  },
  mutations: {
    SET_MINI_DRAWER: (state, status) => {
      state.miniDrawer = status
    },
    SET_DIALOG: (state, status) => {
      state.dialog = status
    },
  },
  actions: {},
}
