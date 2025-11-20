import axios from 'axios'

const usplash_url = 'https://api.unsplash.com/search/photos'

export function hotel_images(query = 'hotels') {
  return axios.get(usplash_url, {
    params: {
      query: query,
      per_page: 10,
      orientation: 'landscape'
    },
    headers: {
      Authorization: 'Client-ID E-ejdTZPUhjSShN_jptFUvL9qP-BZ1Yg_858z_Hq4lA'
    }
  })
  .then(res => res.data.results)
  .catch(err => console.error('Ошибка при получении изображений:', err))
}
