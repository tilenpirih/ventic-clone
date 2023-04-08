import Vue from 'vue'
import { getGenres, getMovies, getMovieDetails, getTrendingMovies } from '@/api/movies'

export default {
  namespaced: true,
  state: {
    infiniteLoadingEnabled: true,
    layoutType: 'DetailGridView',
    movieType: 'popular',
    selectedGenre: { name: 'All', id: 'all' },
    genres: null,
    timeWindow: 'week',
    movies: {},
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
    SET_MOVIE_TYPE: (state, type) => {
      state.movieType = type
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
    ADD_MOVIES: (state, payload) => {
      const moviesLink = state.movies[payload.type][payload.genreID]
      Vue.set(moviesLink, 'results', moviesLink.results.concat(payload.data.results))
      moviesLink.lastPage = payload.data.page
      moviesLink.totalPages = payload.data.total_pages
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
    setScrollPosition({ commit, state }, position) {
      return commit('SET_SCROLL_POSITION', position)
    },
    getMovies({ commit, state }, payload) {
      if (state.movies[payload.movieType] === undefined) {
        Vue.set(state.movies, payload.movieType, {})
      }
      // get trending movies
      if (payload.movieType === 'trending') {
        if (state.movies[payload.movieType][payload.timeWindow] === undefined) {
          Vue.set(state.movies[payload.movieType], payload.timeWindow, {
            lastPage: 0,
            totalPages: 1000,
            results: [],
          })
        }
        if (
          state.movies[payload.movieType][payload.timeWindow].lastPage <
          state.movies[payload.movieType][payload.timeWindow].totalPages
        ) {
          return getTrendingMovies(
            state.movies[payload.movieType][payload.timeWindow].lastPage + 1,
            payload.timeWindow
          )
            .then(({ data }) => {
              commit('ADD_MOVIES', {
                data,
                type: payload.movieType,
                genreID: payload.timeWindow,
              })
              console.log(state.shows)
              return null
            })
            .catch(err => {
              throw new Error(err)
            })
        }
      }
      if (state.movies[payload.movieType][payload.selectedGenre] === undefined) {
        Vue.set(state.movies[payload.movieType], payload.selectedGenre, {
          lastPage: 0,
          totalPages: 1000,
          results: [],
        })
      }
      if (
        state.movies[payload.movieType][payload.selectedGenre].lastPage <
        state.movies[payload.movieType][payload.selectedGenre].totalPages
      ) {
        return getMovies(
          payload.movieType,
          state.movies[payload.movieType][payload.selectedGenre].lastPage + 1,
          payload.selectedGenre
        )
          .then(({ data }) => {
            commit('ADD_MOVIES', {
              data,
              type: payload.movieType,
              genreID: payload.selectedGenre,
            })
            return null
          })
          .catch(err => {
            throw new Error(err)
          })
      }
      state.infiniteLoadingEnabled = false
      return 'maxed'
    },
    getMovieDetails({ commit, state }, id) {
      return getMovieDetails(id)
    },
  },
}
