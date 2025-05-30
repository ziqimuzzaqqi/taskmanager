<template>
  <div>
    <!-- HEADER -->
    <header class="p-4 flex justify-between items-center bg-blue-600 text-white">
      <h1 class="text-lg">Halo, {{ user.name }}</h1>
      <button @click="handleLogout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
        Logout
      </button>
    </header>

    <!-- FORM TAMBAH TASK, DAFTAR TASK dst. -->
    <div class="p-4 max-w-xl mx-auto">
      <!-- ... kode TaskManager Anda sebelumnya ... -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      tasks: [],
      newTask: { title:'', description:'', completed:false },
    }
  },
  mounted() {
    this.fetchTasks()
  },
  methods: {
    async handleLogout() {
      try {
        await axios.post('/api/logout')
      } catch(e) { /* abaikan error */ }
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      this.$router.push('/login')
    },
    async fetchTasks() { /* ... */ },
    async addTask()    { /* ... */ },
    async updateTask() { /* ... */ },
    async deleteTask() { /* ... */ },
  }
}
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
