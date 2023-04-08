export default {
  namespaced: true,
  state: {
    layoutType: 'DetailGrid',
    infiniteLoadingEnabled: false,
    popularMoviesScrollPosition: 0,
    popularShowsScrollPosition: 0,
  },
  mutations: {
    SET_LAYOUT_TYPE: (state, layout) => {
      state.layoutType = layout
      state.infiniteLoadingEnabled = true
    },
    SET_POPULAR_MOVIES_SCROLL_POSITION: (state, scrollPosition) => {
      state.popularMoviesScrollPosition = scrollPosition
    },
    SET_POPULAR_SHOWS_SCROLL_POSITION: (state, scrollPosition) => {
      state.popularShowsScrollPosition = scrollPosition
    },
  },
  actions: {},
}
