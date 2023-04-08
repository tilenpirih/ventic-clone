import {
  getGenres,
  getShows,
  getTrendingShows,
  getShowDetails,
  getSeasonDetails,
  getEpisodeDetails,
} from '@/api/shows'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    infiniteLoadingEnabled: true,
    layoutType: 'DetailGridView',
    showType: 'trending',
    selectedGenre: { name: 'All', id: 'all' },
    genres: null,
    timeWindow: 'week',
    shows: {},
    scrollPosition: { layout: 'DetailGridView', position: 0 },
  },
  mutations: {
    SET_INFINITE_LOADING: (state, value) => {
      state.infiniteLoadingEnabled = value
    },
    SET_LAYOUT_TYPE: (state, layout) => {
      state.layoutType = layout
      state.infiniteLoadingEnabled = true
    },
    SET_SHOW_TYPE: (state, type) => {
      state.showType = type
      state.infiniteLoadingEnabled = true
    },
    SET_GENRES: (state, genres) => {
      state.genres = genres
      state.genres.unshift({ name: 'All', id: 'all' })
    },
    SET_GENRE: (state, genre) => {
      state.selectedGenre = genre
      state.infiniteLoadingEnabled = true
    },
    SET_TIME_WINDOW: (state, timeWindow) => {
      state.timeWindow = timeWindow
      state.infiniteLoadingEnabled = true
    },
    ADD_SHOWS: (state, payload) => {
      const showsLink = state.shows[payload.type][payload.genreID]
      Vue.set(showsLink, 'results', showsLink.results.concat(payload.data.results))
      showsLink.lastPage = payload.data.page
      showsLink.totalPages = payload.data.total_pages
    },
    SET_SCROLL_POSITION: (state, scrollPosition) => {
      state.scrollPosition = scrollPosition
    },
  },
  actions: {
    getGenres({ commit, state }) {
      return getGenres()
        .then(({ data }) => {
          commit('SET_GENRES', data.genres)
        })
        .catch(err => err)
    },
    getShows({ commit, state }, payload) {
      if (state.shows[payload.showType] === undefined) {
        Vue.set(state.shows, payload.showType, {})
      }
      if (payload.showType === 'trending') {
        if (state.shows[payload.showType][payload.timeWindow] === undefined) {
          Vue.set(state.shows[payload.showType], payload.timeWindow, {
            lastPage: 0,
            totalPages: 1000,
            results: [],
          })
        }
        if (
          state.shows[payload.showType][payload.timeWindow].lastPage <
          state.shows[payload.showType][payload.timeWindow].totalPages
        ) {
          return getTrendingShows(
            state.shows[payload.showType][payload.timeWindow].lastPage + 1,
            payload.timeWindow
          )
            .then(({ data }) => {
              commit('ADD_SHOWS', {
                data,
                type: payload.showType,
                genreID: payload.timeWindow,
              })
              return null
            })
            .catch(err => err)
        }
      }
      if (state.shows[payload.showType][payload.selectedGenre] === undefined) {
        Vue.set(state.shows[payload.showType], payload.selectedGenre, {
          lastPage: 0,
          totalPages: 500,
          results: [],
        })
      }
      if (
        state.shows[payload.showType][payload.selectedGenre].lastPage <
        state.shows[payload.showType][payload.selectedGenre].totalPages
      ) {
        return getShows(
          payload.showType,
          state.shows[payload.showType][payload.selectedGenre].lastPage + 1,
          payload.selectedGenre
        )
          .then(({ data }) => {
            commit('ADD_SHOWS', {
              data,
              type: payload.showType,
              genreID: payload.selectedGenre,
            })
            return null
          })
          .catch(err => err)
      }
      state.infiniteLoadingEnabled = false
      return 'maxed'
    },
    getShowDetails({ commit, state }, id) {
      return getShowDetails(id)
    },
    getSeasonDetails({ commit, state }, payload) {
      return getSeasonDetails(payload.id, payload.seasonNumber)
    },
    getEpisodeDetails({ commit, state }, payload) {
      return getEpisodeDetails(payload.id, payload.seasonNumber, payload.episodeNumber)
    },
  },
}
