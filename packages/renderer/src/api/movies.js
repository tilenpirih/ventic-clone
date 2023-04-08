import { axiosApi } from './main'

const axios = axiosApi()

export function getGenres() {
  return axios.get('genre/movie/list')
}
export function getMovies(movieType, page, genreID) {
  return axios.get(`/movie/${movieType}`, {
    params: {
      page,
      language: 'en',
      with_genres: genreID,
    },
  })
}
export function getTrendingMovies(page, timeWindow) {
  return axios.get(`/trending/movie/${timeWindow}`, {
    params: {
      page,
      language: 'en',
    },
  })
}
export function getMovieDetails(id) {
  return axios.get(`/movie/${id}`, {
    params: {
      append_to_response: 'release_dates,videos,credits,similar',
    },
  })
}
