export default {
  namespaced: true,
  state: {
    mainBackgroundImg: 'https://wallpaperaccess.com/full/1281664.jpg',
    backgroundImg: 'https://wallpaperaccess.com/full/1281664.jpg',
    backImg: true,
    backgroundBlur: 20,
    backTintOpacity: 0.6,
    gridCardWidth: 190,
    horizontalCardWidth: 190,
    selectedMediaBackground: true,
    tintColor: '#222222FF',
    panelOpacity: 'B3',
    menuOpacity: 'CC',
  },
  mutations: {
    SET_BACKGROUND(state, image) {
      if (state.selectedMediaBackground) {
        state.backgroundImg = image
      }
    },
    SET_MAIN_BACKGROUND(state) {
      state.backgroundImg = state.mainBackgroundImg
    },
    ENAB_DISAB_BACK_IMG: (state, value) => {
      state.backImg = value
    },
    SET_BACK_BLUR: (state, value) => {
      state.backgroundBlur = value
    },
    SET_BACK_TINT_OPACITY: (state, value) => {
      state.backTintOpacity = value
    },
    SET_GRID_CARD_WIDTH: (state, width) => {
      state.gridCardWidth = width
    },
    SET_HORIZONTAL_CARD_WIDTH: (state, width) => {
      state.horizontalCardWidth = width
    },
    SET_BACK_TINT_COLOR: (state, value) => {
      state.tintColor = value
    },
    CHANGE_MAIN_BACK_IMG: (state, value) => {
      state.mainBackgroundImg = value
      state.backgroundImg = value
    },
    SET_MENU_OPACITY: (state, value) => {
      state.menuOpacity = value
    },
    SET_PANEL_OPACITY: (state, value) => {
      state.panelOpacity = value
    },
    SET_THEME: (state, value) => {
      state.menuOpacity = value
    },
    SET_SELECTED_MEDIA_BACKGROUND: (state, value) => {
      state.selectedMediaBackground = value
    },
  },
  actions: {},
}
