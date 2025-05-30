import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Setup axios
axios.defaults.withCredentials = true
const token = localStorage.getItem('auth_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const app = createApp(App)
app.use(router)
app.mount('#app')
