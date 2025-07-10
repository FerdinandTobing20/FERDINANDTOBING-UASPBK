<template>
  <div class="registration-form">
    <h2>Form Pendaftaran Event</h2>
    
    <div class="event-summary">
      <h3>{{ event.title }}</h3>
      <p>{{ event.description }}</p>
      <div class="event-details">
        <span>📅 {{ formatters.date(event.date) }}</span>
        <span>⏰ {{ formatters.time(event.time) }}</span>
        <span>📍 {{ event.location }}</span>
      </div>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Nama Lengkap</label>
        <input
          type="text"
          :value="user.name"
          disabled
          class="disabled-input"
        />
      </div>
      
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          :value="user.email"
          disabled
          class="disabled-input"
        />
      </div>
      
      <div class="form-group">
        <label>
          <input
            type="checkbox"
            v-model="agreed"
            required
          />
          Saya setuju dengan syarat dan ketentuan event ini
        </label>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-if="success" class="success-message">
        Pendaftaran berhasil! Silakan cek status pendaftaran Anda.
      </div>
      
      <div class="form-actions">
        <button
          type="submit"
          class="btn-primary"
          :disabled="loading || !agreed"
        >
          {{ loading ? 'Mendaftar...' : 'Daftar Sekarang' }}
        </button>
        <button
          type="button"
          class="btn-secondary"
          @click="$emit('cancel')"
        >
          Batal
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { registrationService } from '@/services/registrationService'
import { formatters } from '@/utils/formatters'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['success', 'cancel'])

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const agreed = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await registrationService.register(props.event.id, user.value.id)
    success.value = true
    setTimeout(() => {
      emit('success')
    }, 2000)
  } catch (err) {
    error.value = 'Gagal mendaftar. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.registration-form {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.registration-form h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.event-summary {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.event-summary h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.event-summary p {
  margin: 0 0 1rem 0;
  color: #666;
}

.event-details {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #666;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="email"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.disabled-input {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-group input[type="checkbox"] {
  margin-right: 0.5rem;
}

.error-message {
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: #fee;
  border-radius: 4px;
}

.success-message {
  color: #27ae60;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: #efe;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #ecf0f1;
  color: #333;
}

.btn-secondary:hover {
  background-color: #bdc3c7;
}
</style>