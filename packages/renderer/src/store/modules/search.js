import getMedias from '@/api/search'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    infiniteLoadingEnabled: true,
    layoutType: 'DetailGridView',
    medias: [],
    scrollPosition: { layout: 'DetailGridView', position: 0 },
    lastPage: 0,
    totalPages: 1,
    searchQuery: '',
    query: '',
  },
  mutations: {
    SET_INFINITE_LOADING: (state, value) => {
      state.infiniteLoadingEnabled = value
    },
    SET_LAYOUT_TYPE: (state, layout) => {
      state.layoutType = layout
      state.infiniteLoadingEnabled = true
    },
    SET_SCROLL_POSITION: (state, scrollPosition) => {
      state.scrollPosition = scrollPosition
    },
    SET_QUERY: (state, query) => {
      if (state.query !== query) {
        state.query = query
        state.lastPage = 0
        state.totalPages = 1
        state.medias = []
      }
    },
    SET_SEARCH_QUERY: (state, query) => {
      state.searchQuery = query
    },
    ADD_MEDIAS: (state, data) => {
      Vue.set(
        state,
        'medias',
        state.medias.concat(
          data.results.filter(media => media.media_type === 'tv' || media.media_type === 'movie')
        )
      )
      state.lastPage = data.page
      state.totalPages = data.total_pages
    },
  },
  actions: {
    getSearchedMedia({ commit, state }) {
      if (state.lastPage < state.totalPages) {
        return getMedias(state.lastPage + 1, state.query).then(({ data }) => {
          commit('ADD_MEDIAS', data)
        })
      }
      state.infiniteLoadingEnabled = false
      return 'maxed'
    },
  },
}
