<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <LoginForm />
      <p class="mt-4 text-center">
        Belum punya akun?
        <router-link to="/register" class="text-blue-600 hover:underline">Daftar di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'LoginView',
  components: { LoginForm }
}
</script>

<style scoped>
/* Styling tambahan jika diperlukan */
</style>
