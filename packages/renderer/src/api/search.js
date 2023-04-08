import { axiosApi } from './main'

const axios = axiosApi()

export default function getMedias(page, query) {
  return axios.get('/search/multi', {
    params: {
      query,
      page,
      language: 'en',
    },
  })
}
