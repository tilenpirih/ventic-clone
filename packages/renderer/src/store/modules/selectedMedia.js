export default {
  namespaced: true,
  state: {
    cardWidth: 200,
    seasonCardWidth: 300,
    showLayoutType: 'CardView',
    seasonLayoutType: 'CardView',
    torrentSelection: false,
  },
  mutations: {
    SET_CARD_WIDTH: (state, width) => {
      state.cardWidth = width
    },
    SET_SEASON_CARD_WIDTH: (state, width) => {
      state.seasonCardWidth = width
    },
    SET_SHOW_LAYOUT_TYPE: (state, layout) => {
      state.showLayoutType = layout
    },
    SET_SEASON_LAYOUT_TYPE: (state, layout) => {
      state.seasonLayoutType = layout
    },
    SET_TORRENT_SELECTION: (state, bool) => {
      state.torrentSelection = bool
    },
  },
  actions: {},
}
