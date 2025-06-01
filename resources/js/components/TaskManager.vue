<template>
  <div class="max-w-2xl mx-auto bg-white rounded-lg shadow">
    <!-- Judul -->
    <div class="px-6 py-4 border-b">
      <h2 class="text-2xl font-semibold">Task Manager</h2>
    </div>

    <!-- Form Tambah Task -->
    <div class="px-6 py-4">
      <form @submit.prevent="addTask" class="mb-6">
        <input
          v-model="newTask.title"
          type="text"
          placeholder="Judul tugas"
          class="border p-2 w-full mb-2 rounded"
          :disabled="isAdding"
        />
        <textarea
          v-model="newTask.description"
          placeholder="Deskripsi (opsional)"
          class="border p-2 w-full mb-2 rounded"
          :disabled="isAdding"
        ></textarea>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          :disabled="isAdding"
        >
          {{ isAdding ? 'Menambah...' : 'Tambah Tugas' }}
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
    </div>

    <!-- Daftar Task -->
    <div class="px-6 py-4">
      <div v-if="isLoadingTasks" class="text-center text-gray-500">
        Memuat tugas...
      </div>
      <ul v-else>
        <li
          v-for="task in tasks"
          :key="task.id"
          class="mb-4 flex justify-between items-start border-b pb-4"
        >
          <div class="flex-1">
            <!-- Jika sedang edit task ini -->
            <div v-if="editTaskId === task.id">
              <input
                v-model="editTaskData.title"
                type="text"
                class="border p-2 w-full mb-2 rounded"
                :disabled="isUpdating"
              />
              <textarea
                v-model="editTaskData.description"
                class="border p-2 w-full mb-2 rounded"
                :disabled="isUpdating"
              ></textarea>
              <button
                @click="updateTask(task.id)"
                class="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                :disabled="isUpdating"
              >
                {{ isUpdating ? 'Menyimpan...' : 'Simpan' }}
              </button>
              <button
                @click="cancelEdit"
                class="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                :disabled="isUpdating"
              >
                Batal
              </button>
            </div>

            <!-- Jika tidak sedang edit -->
            <div v-else>
              <div class="flex items-center mb-1">
                <input
                  type="checkbox"
                  v-model="task.completed"
                  @change="toggleCompleted(task)"
                  class="mr-2"
                />
                <span
                  :class="{ 'line-through text-gray-400': task.completed }"
                  class="font-medium"
                >
                  {{ task.title }}
                </span>
              </div>
              <p v-if="task.description" class="text-gray-600">{{ task.description }}</p>
            </div>
          </div>

          <!-- Tombol Edit, Hapus -->
          <div class="pl-4 flex-shrink-0">
            <button
              v-if="editTaskId !== task.id"
              @click="startEdit(task)"
              class="mr-2 text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              @click="deleteTask(task.id)"
              class="text-red-600 hover:underline"
              :disabled="isDeletingId === task.id"
            >
              {{ isDeletingId === task.id ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </li>
      </ul>
      <p v-if="tasks.length === 0 && !isLoadingTasks" class="text-center text-gray-500">
        Belum ada tugas.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskManager',
  data() {
    return {
      tasks: [],
      isLoadingTasks: false,
      isAdding: false,
      isUpdating: false,
      isDeletingId: null,      // menyimpan id task yang sedang dihapus
      newTask: {
        title: '',
        description: '',
        completed: false
      },
      editTaskId: null,        // id task yang sedang diedit
      editTaskData: {
        title: '',
        description: ''
      },
      errorMessage: null
    }
  },
  mounted() {
    this.fetchTasks()
  },
  methods: {
    // Ambil daftar task dari API
    async fetchTasks() {
      this.isLoadingTasks = true
      this.errorMessage = null
      try {
        const res = await this.$axios.get('/tasks')
        this.tasks = res.data
      } catch (err) {
        this.errorMessage = 'Gagal memuat tugas.'
      } finally {
        this.isLoadingTasks = false
      }
    },

    // Tambah task baru
    async addTask() {
      if (!this.newTask.title.trim()) {
        this.errorMessage = 'Judul tugas wajib diisi.'
        return
      }
      this.isAdding = true
      this.errorMessage = null
      try {
        await this.$axios.post('/tasks', this.newTask)
        this.newTask.title = ''
        this.newTask.description = ''
        this.fetchTasks()
      } catch (err) {
        this.errorMessage = 'Gagal menambah tugas.'
      } finally {
        this.isAdding = false
      }
    },

    // Mulai edit task—isi form edit dengan data task
    startEdit(task) {
      this.editTaskId = task.id
      this.editTaskData.title = task.title
      this.editTaskData.description = task.description || ''
      this.errorMessage = null
    },

    // Batal edit
    cancelEdit() {
      this.editTaskId = null
      this.editTaskData.title = ''
      this.editTaskData.description = ''
      this.errorMessage = null
    },

    // Update task (judul/desc)
    async updateTask(taskId) {
      if (!this.editTaskData.title.trim()) {
        this.errorMessage = 'Judul tugas wajib diisi.'
        return
      }
      this.isUpdating = true
      this.errorMessage = null
      try {
        await this.$axios.put(`/tasks/${taskId}`, {
          title: this.editTaskData.title,
          description: this.editTaskData.description
        })
        this.editTaskId = null
        this.editTaskData.title = ''
        this.editTaskData.description = ''
        this.fetchTasks()
      } catch (err) {
        this.errorMessage = 'Gagal menyimpan perubahan.'
      } finally {
        this.isUpdating = false
      }
    },

    // Toggle completed
    async toggleCompleted(task) {
      this.errorMessage = null
      try {
        await this.$axios.put(`/tasks/${task.id}`, {
          completed: task.completed
        })
      } catch (err) {
        this.errorMessage = 'Gagal mengubah status.'
        // Rollback status jika error
        task.completed = !task.completed
      }
    },

    // Hapus task
    async deleteTask(taskId) {
      if (!confirm('Yakin ingin menghapus tugas ini?')) return
      this.isDeletingId = taskId
      this.errorMessage = null
      try {
        await this.$axios.delete(`/tasks/${taskId}`)
        this.fetchTasks()
      } catch (err) {
        this.errorMessage = 'Gagal menghapus tugas.'
      } finally {
        this.isDeletingId = null
      }
    }
  }
}
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
.error {
  color: #e3342f;
  margin-top: 0.5rem;
}
</style>
