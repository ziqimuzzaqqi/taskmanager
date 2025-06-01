<template>
  <div class="min-h-screen bg-gray-100">
    <!-- HEADER -->
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl">Dashboard</h1>
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>

    <!-- KONTEN UTAMA -->
    <main class="p-6">
      <div v-if="isLoadingUser" class="text-center text-gray-500">
        Memuat data user...
      </div>
      <div v-else class="space-y-6">
        <p class="text-lg">
          Halo, <span class="font-semibold">{{ user.name }}</span>! Anda sudah login.
        </p>
        <!-- Tambahkan konten dashboard lain di sini -->
        <p>Di sini bisa ditampilkan ringkasan data, menu navigasi, dsb.</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from '../axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: {},
      isLoadingUser: true
    }
  },
  async created() {
    try {
      const res = await axios.get('/user')
      this.user = res.data
    } catch (err) {
      // Kalau token invalid, redirect ke /login
      localStorage.removeItem('token')
      this.$router.push('/login')
    } finally {
      this.isLoadingUser = false
    }
  },
  methods: {
    async handleLogout() {
      try {
        await axios.post('/logout')
      } catch (_) {
        // Abaikan error logout
      }
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
/* Styling tambahan jika diinginkan */
</style>
