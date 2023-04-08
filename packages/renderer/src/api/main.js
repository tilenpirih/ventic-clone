import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export function axiosApi() {
  const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
  })
  api.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VITE_TMDB_KEY}`
  return api
}
