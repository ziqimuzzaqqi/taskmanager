import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import LoginForm from '../components/LoginForm.vue'
import TaskManager from '../components/TaskManager.vue'

const routes = [
  { path: '/login',  component: LoginForm },
  { path: '/tasks',  component: TaskManager, meta: { requiresAuth: true } },
  { path: '/',        redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  // Jika menuju halaman login, bersihkan credential lama
  if (to.path === '/login') {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    return true
  }

  // Jika route butuh auth, periksa token & validasi lewat API /user
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      return '/login'
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    try {
      await axios.get('/api/user')  // validasi token
      return true
    } catch (err) {
      // token kadaluarsa atau tidak valid
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      return '/login'
    }
  }

  return true
})

export default router
