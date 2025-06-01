// resources/js/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',               // otomatis mengarah ke http://localhost:8000/api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,         // jika Anda menggunakan cookie-based auth (Sanctum session)
})

// Interceptor untuk attach Authorization header secara otomatis jika token ada
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
