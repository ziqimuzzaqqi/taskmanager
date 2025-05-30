<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  try {
    const response = await axios.post('/api/login', { email: email.value, password: password.value })
    localStorage.setItem('token', response.data.token)
    router.push('/tasks')
  } catch (error) {
    alert('Login gagal. Cek email dan password!')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Contoh styling tambahan, sesuaikan sesuai kebutuhan */
</style>
