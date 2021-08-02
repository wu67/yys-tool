import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: '/app',
  timeout: 30000
})

export default axiosInstance