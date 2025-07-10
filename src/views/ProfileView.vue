<template>
  <div class="profile-view">
    <h1>Profil Pengguna</h1>
    
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar">
          {{ userInitials }}
        </div>
        <div class="profile-info">
          <h2>{{ user.name }}</h2>
          <p class="role-badge">{{ user.role }}</p>
        </div>
      </div>
      
      <form @submit.prevent="handleUpdate" class="profile-form">
        <div class="form-group">
          <label for="name">Nama Lengkap</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            disabled
            class="disabled-input"
          />
        </div>
        
        <div class="form-section">
          <h3>Ubah Password</h3>
          <div class="form-group">
            <label for="currentPassword">Password Lama</label>
            <input
              id="currentPassword"
              v-model="passwordForm.current"
              type="password"
            />
          </div>
          
          <div class="form-group">
            <label for="newPassword">Password Baru</label>
            <input
              id="newPassword"
              v-model="passwordForm.new"
              type="password"
            />
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Konfirmasi Password Baru</label>
            <input
              id="confirmPassword"
              v-model="passwordForm.confirm"
              type="password"
            />
          </div>
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div v-if="success" class="success-message">
          Profil berhasil diperbarui!
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const form = ref({
  name: '',
  email: '',
  username: ''
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

const userInitials = computed(() => {
  return user.value.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const handleUpdate = async () => {
  error.value = ''
  success.value = false
  
  // Validate password if changing
  if (passwordForm.value.new) {
    if (passwordForm.value.new !== passwordForm.value.confirm) {
      error.value = 'Password baru dan konfirmasi tidak cocok'
      return
    }
    if (passwordForm.value.new.length < 6) {
      error.value = 'Password minimal 6 karakter'
      return
    }
  }
  
  loading.value = true
  
  try {
    // Update user data
    const updateData = {
      ...user.value,
      name: form.value.name,
      email: form.value.email
    }
    
    // If password is being changed
    if (passwordForm.value.new && passwordForm.value.current === user.value.password) {
      updateData.password = passwordForm.value.new
    } else if (passwordForm.value.new) {
      error.value = 'Password lama tidak sesuai'
      loading.value = false
      return
    }
    
    await api.put(`/users/${user.value.id}`, updateData)
    
    // Update local state
    authStore.user = updateData
    
    success.value = true
    
    // Reset password form
    passwordForm.value = {
      current: '',
      new: '',
      confirm: ''
    }
  } catch (err) {
    error.value = 'Gagal memperbarui profil'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (user.value) {
    form.value = {
      name: user.value.name,
      email: user.value.email,
      username: user.value.username
    }
  }
})
</script>

<style scoped>
.profile-view {
  max-width: 600px;
  margin: 0 auto;
}

.profile-view h1 {
  margin-bottom: 2rem;
  color: #333;
}

.profile-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 80px;
  height: 80px;
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
}

.profile-info h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #ecf0f1;
  border-radius: 20px;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.profile-form {
  margin-top: 1.5rem;
}

.form-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.form-section h3 {
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.disabled-input {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  margin: 1rem 0;
  padding: 0.75rem;
  background-color: #fee;
  border-radius: 4px;
}

.success-message {
  color: #27ae60;
  margin: 1rem 0;
  padding: 0.75rem;
  background-color: #efe;
  border-radius: 4px;
}

.form-actions {
  margin-top: 1.5rem;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .profile-card {
    padding: 1.5rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>