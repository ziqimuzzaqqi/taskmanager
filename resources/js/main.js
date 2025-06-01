import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios'       // import instance axios yang sudah kita buat

const app = createApp(App)

// Buat supaya axios bisa diakses di semua component lewat this.$axios
app.config.globalProperties.$axios = axios

app.use(router)
app.mount('#app')
