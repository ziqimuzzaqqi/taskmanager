<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
      <h1 class="text-3xl font-bold mb-6">Selamat Datang</h1>
      <p class="mb-6">Silakan Login jika sudah punya akun, atau Daftar jika belum.</p>
      <div class="space-x-4">
        <router-link
          to="/login"
          class="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >Login</router-link>
        <router-link
          to="/register"
          class="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingView'
}
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
