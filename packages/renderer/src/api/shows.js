import { axiosApi } from './main'

const axios = axiosApi()

export function getGenres() {
  return axios.get('genre/tv/list')
}
export function getShows(swowType, page, genreID) {
  return axios.get(`/tv/${swowType}`, {
    params: {
      page,
      language: 'en',
      with_genres: genreID,
    },
  })
}
export function getTrendingShows(page, timeWindow) {
  return axios.get(`/trending/tv/${timeWindow}`, {
    params: {
      page,
      language: 'en',
    },
  })
}
export function getShowDetails(id) {
  return axios.get(`/tv/${id}`, {
    params: {
      append_to_response: 'videos,credits,similar',
    },
  })
}
export function getSeasonDetails(id, seasonNumber) {
  return axios.get(`/tv/${id}/season/${seasonNumber}`, {
    params: {
      append_to_response: 'credits',
    },
  })
}
export function getEpisodeDetails(id, seasonNumber, episodeNumber) {
  return axios.get(`/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`, {
    params: {
      append_to_response: 'credits,videos',
    },
  })
}
