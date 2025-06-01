<!-- resources/js/components/RegisterForm.vue -->
<template>
  <form @submit.prevent="handleRegister" class="space-y-4">
    <h2 class="text-2xl font-semibold text-center">Daftar Akun</h2>

    <div>
      <label class="block mb-1">Nama Lengkap</label>
      <input
        v-model="form.name"
        type="text"
        required
        class="w-full border px-3 py-2 rounded"
        placeholder="Nama Anda"
      />
    </div>

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

    <div>
      <label class="block mb-1">Konfirmasi Password</label>
      <input
        v-model="form.password_confirmation"
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
        class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {{ isLoading ? 'Memproses...' : 'Daftar' }}
      </button>
    </div>

    <p v-if="error" class="mt-2 text-red-600 text-center">{{ error }}</p>
  </form>
</template>

<script>
import axios from '../axios'

export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      error: null,
      isLoading: false
    }
  },
  methods: {
    async handleRegister() {
      this.error = null
      this.isLoading = true
      try {
        const res = await axios.post('/register', this.form)
        // Simpan token ke localStorage
        localStorage.setItem('token', res.data.access_token)
        // Langsung redirect ke dashboard setelah registrasi
        this.$router.push('/dashboard')
      } catch (err) {
        // Tangani error validasi, misal email sudah terdaftar
        // Laravel akan mengembalikan response 422 dengan pesan validasi
        if (err.response?.status === 422) {
          // Gabungkan semua error message menjadi satu string
          const errors = err.response.data.errors
          this.error = Object.values(errors).flat().join(' ')
        } else {
          this.error = err.response?.data?.message || 'Gagal mendaftar. Coba lagi.'
        }
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
