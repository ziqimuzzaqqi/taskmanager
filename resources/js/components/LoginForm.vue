<!-- resources/js/components/LoginForm.vue -->
<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <h2 class="text-2xl font-semibold text-center">Login</h2>

    <div>
      <label class="block mb-1">Email</label>
      <input
        v-model="form.email"
        type="email"
        required
        class="w-full border px-3 py-2 rounded"
        placeholder="you@example.com"
      />
    </div>

    <div>
      <label class="block mb-1">Password</label>
      <input
        v-model="form.password"
        type="password"
        required
        class="w-full border px-3 py-2 rounded"
        placeholder="••••••••"
      />
    </div>

    <div class="text-center mt-4">
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {{ isLoading ? 'Memproses...' : 'Login' }}
      </button>
    </div>

    <p v-if="error" class="mt-2 text-red-600 text-center">{{ error }}</p>
  </form>
</template>

<script>
import axios from '../axios'

export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null,
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.error = null
      this.isLoading = true
      try {
        const res = await axios.post('/login', this.form)
        // Simpan token ke localStorage
        localStorage.setItem('token', res.data.access_token)
        // Arahkan ke dashboard setelah sukses login
        this.$router.push('/dashboard')
      } catch (err) {
        // Tangani error, misal kredensial salah
        this.error = err.response?.data?.message || 'Gagal login. Coba lagi.'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* Styling tambahan jika diinginkan */
</style>
