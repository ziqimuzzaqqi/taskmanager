<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <RegisterForm />
      <p class="mt-4 text-center">
        Sudah punya akun?
        <router-link to="/login" class="text-blue-600 hover:underline">Masuk di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue'

export default {
  name: 'RegisterView',
  components: { RegisterForm }
}
</script>

<style scoped>
/* Styling tambahan jika diperlukan */
</style>
