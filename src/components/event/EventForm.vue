<template>
  <form @submit.prevent="handleSubmit" class="event-form">
    <div class="form-group">
      <label for="title">Judul Event *</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        :class="{ error: errors.title }"
      />
      <span v-if="errors.title" class="error-text">{{ errors.title }}</span>
    </div>
    
    <div class="form-group">
      <label for="description">Deskripsi *</label>
      <textarea
        id="description"
        v-model="form.description"
        rows="4"
        required
        :class="{ error: errors.description }"
      ></textarea>
      <span v-if="errors.description" class="error-text">{{ errors.description }}</span>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label for="date">Tanggal *</label>
        <input
          id="date"
          v-model="form.date"
          type="date"
          required
          :min="minDate"
          :class="{ error: errors.date }"
        />
        <span v-if="errors.date" class="error-text">{{ errors.date }}</span>
      </div>
      
      <div class="form-group">
        <label for="time">Waktu *</label>
        <input
          id="time"
          v-model="form.time"
          type="time"
          required
          :class="{ error: errors.time }"
        />
        <span v-if="errors.time" class="error-text">{{ errors.time }}</span>
      </div>
    </div>
    
    <div class="form-group">
      <label for="location">Lokasi *</label>
      <input
        id="location"
        v-model="form.location"
        type="text"
        required
        :class="{ error: errors.location }"
      />
      <span v-if="errors.location" class="error-text">{{ errors.location }}</span>
    </div>
    
    <div class="form-group">
      <label for="capacity">Kapasitas *</label>
      <input
        id="capacity"
        v-model.number="form.capacity"
        type="number"
        min="1"
        required
        :class="{ error: errors.capacity }"
      />
      <span v-if="errors.capacity" class="error-text">{{ errors.capacity }}</span>
    </div>
    
    <div class="form-group">
      <label for="status">Status</label>
      <select id="status" v-model="form.status">
        <option value="active">Aktif</option>
        <option value="inactive">Tidak Aktif</option>
      </select>
    </div>
    
    <div class="form-actions">
      <button type="submit" class="btn-primary" :disabled="loading">
        {{ loading ? 'Menyimpan...' : submitText }}
      </button>
      <button type="button" class="btn-secondary" @click="$emit('cancel')">
        Batal
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { validators } from '@/utils/validators'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  submitText: {
    type: String,
    default: 'Simpan'
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  capacity: 30,
  status: 'active',
  ...props.initialData
})

const errors = ref({})
const loading = ref(false)

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const validateForm = () => {
  errors.value = {}
  
  if (!validators.required(form.value.title)) {
    errors.value.title = 'Judul event wajib diisi'
  }
  
  if (!validators.required(form.value.description)) {
    errors.value.description = 'Deskripsi wajib diisi'
  }
  
  if (!validators.futureDate(form.value.date)) {
    errors.value.date = 'Tanggal harus di masa depan'
  }
  
  if (form.value.capacity < 1) {
    errors.value.capacity = 'Kapasitas minimal 1 peserta'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  emit('submit', form.value)
  loading.value = false
}

watch(() => props.initialData, (newData) => {
  form.value = { ...form.value, ...newData }
}, { deep: true })
</script>

<style scoped>
.event-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
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

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>