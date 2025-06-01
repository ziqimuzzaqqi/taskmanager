import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  // Jika ada path lain (misalnya /tasks), tambahkan rute di sini...
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global guard: hanya dashboard (atau rute dengan requiresAuth) yang dilindungi
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  // Jika menuju halaman dashboard dan token tidak ada, redirect ke /login
  if (to.meta.requiresAuth && !token) {
    next('/login')
  }
  // Jika menuju /login atau /register dan token ada, redirect ke /dashboard
  else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/dashboard')
  }
  else {
    next()
  }
})

export default router
