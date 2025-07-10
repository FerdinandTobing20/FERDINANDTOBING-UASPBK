<template>
  <div class="event-detail">
    <div v-if="loading" class="loading">
      <LoadingSpinner message="Memuat detail event..." />
    </div>
    
    <div v-else-if="event" class="event-content">
      <div class="event-header">
        <div>
          <h1>{{ event.title }}</h1>
          <span :class="['status-badge', event.status]">
            {{ formatters.status(event.status) }}
          </span>
        </div>
        <div v-if="isAdmin" class="event-actions">
          <RouterLink
            :to="`/event/edit/${event.id}`"
            class="btn-edit"
          >
            Edit Event
          </RouterLink>
          <button @click="handleDelete" class="btn-delete">
            Hapus Event
          </button>
        </div>
      </div>
      
      <div class="event-info-card">
        <h2>Informasi Event</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Tanggal</span>
            <span class="info-value">{{ formatters.date(event.date) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Waktu</span>
            <span class="info-value">{{ formatters.time(event.time) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Lokasi</span>
            <span class="info-value">{{ event.location }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Kapasitas</span>
            <span class="info-value">{{ event.capacity }} peserta</span>
          </div>
          <div class="info-item">
            <span class="info-label">Terdaftar</span>
            <span class="info-value">{{ registeredCount }} peserta</span>
          </div>
          <div class="info-item">
            <span class="info-label">Sisa Kuota</span>
            <span class="info-value">{{ event.capacity - registeredCount }} peserta</span>
          </div>
        </div>
      </div>
      
      <div class="description-card">
        <h2>Deskripsi</h2>
        <p>{{ event.description }}</p>
      </div>
      
      <div v-if="isPeserta && !isRegistered" class="registration-section">
        <button
          @click="showRegistration = true"
          class="btn-register"
          :disabled="registeredCount >= event.capacity"
        >
          {{ registeredCount >= event.capacity ? 'Event Penuh' : 'Daftar Sekarang' }}
        </button>
      </div>
      
      <div v-if="isPeserta && isRegistered" class="registered-notice">
        <p>✅ Anda sudah terdaftar di event ini</p>
      </div>
      
      <div v-if="isAdmin || isPanitia" class="participants-section">
        <h2>Daftar Peserta ({{ participants.length }})</h2>
        <div v-if="participants.length > 0" class="participants-table-container">
          <table class="participants-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Tanggal Daftar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(participant, index) in participants" :key="participant.id">
                <td>{{ index + 1 }}</td>
                <td>{{ participant.user.name }}</td>
                <td>{{ participant.user.email }}</td>
                <td>{{ formatters.date(participant.registrationDate) }}</td>
                <td>
                  <span :class="['status-badge', participant.attended ? 'attended' : 'registered']">
                    {{ participant.attended ? 'Hadir' : 'Terdaftar' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="empty-participants">
          <p>Belum ada peserta yang terdaftar</p>
        </div>
      </div>
    </div>
    
    <div v-else class="error">
      <ErrorMessage message="Event tidak ditemukan" />
    </div>
    
    <!-- Registration Modal -->
    <div v-if="showRegistration" class="modal-overlay" @click="showRegistration = false">
      <div class="modal-content" @click.stop>
        <RegistrationForm
          :event="event"
          @success="handleRegistrationSuccess"
          @cancel="showRegistration = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { eventService } from '@/services/eventService'
import { registrationService } from '@/services/registrationService'
import { formatters } from '@/utils/formatters'
import { ROLES } from '@/utils/constants'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import RegistrationForm from '@/components/registration/RegistrationForm.vue'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const event = ref(null)
const participants = ref([])
const userRegistrations = ref([])
const loading = ref(true)
const showRegistration = ref(false)

const isAdmin = computed(() => authStore.userRole === ROLES.ADMIN)
const isPanitia = computed(() => authStore.userRole === ROLES.PANITIA)
const isPeserta = computed(() => authStore.userRole === ROLES.PESERTA)

const registeredCount = computed(() => participants.value.length)
const isRegistered = computed(() => 
  userRegistrations.value.some(r => r.eventId === event.value?.id)
)

const loadEventData = async () => {
  try {
    const eventId = parseInt(route.params.id)
    event.value = await eventService.getById(eventId)
    
    // Load participants if admin or panitia
    if (isAdmin.value || isPanitia.value) {
      const registrations = await registrationService.getByEvent(eventId)
      
      // Load user data for each registration
      const participantsWithUsers = await Promise.all(
        registrations.map(async (reg) => {
          const { data: user } = await api.get(`/users/${reg.userId}`)
          return { ...reg, user }
        })
      )
      
      participants.value = participantsWithUsers
    } else {
      // Just get count for regular users
      const registrations = await registrationService.getByEvent(eventId)
      participants.value = registrations
    }
    
    // Check if current user is registered
    if (isPeserta.value) {
      userRegistrations.value = await registrationService.getByUser(authStore.user.id)
    }
  } catch (error) {
    console.error('Error loading event:', error)
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (confirm('Apakah Anda yakin ingin menghapus event ini?')) {
    try {
      await eventService.delete(event.value.id)
      router.push('/event')
    } catch (error) {
      alert('Gagal menghapus event')
    }
  }
}

const handleRegistrationSuccess = () => {
  showRegistration.value = false
  loadEventData() // Reload to update registration status
}

onMounted(() => {
  loadEventData()
})
</script>

<style scoped>
.event-detail {
  max-width: 1000px;
  margin: 0 auto;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2rem;
}

.event-header h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge.active {
  background-color: #2ecc71;
  color: white;
}

.status-badge.inactive {
  background-color: #e74c3c;
  color: white;
}

.status-badge.registered {
  background-color: #f39c12;
  color: white;
}

.status-badge.attended {
  background-color: #27ae60;
  color: white;
}

.event-actions {
  display: flex;
  gap: 1rem;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-edit {
  background-color: #f39c12;
  color: white;
}

.btn-edit:hover {
  background-color: #e67e22;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.event-info-card,
.description-card,
.participants-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.event-info-card h2,
.description-card h2,
.participants-section h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.description-card p {
  color: #666;
  line-height: 1.8;
}

.registration-section {
  text-align: center;
  margin: 2rem 0;
}

.btn-register {
  padding: 1rem 3rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-register:hover:not(:disabled) {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(52, 152, 219, 0.3);
}

.btn-register:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.registered-notice {
  text-align: center;
  padding: 1rem;
  background-color: #d4edda;
  border-radius: 8px;
  color: #155724;
  margin: 2rem 0;
}

.participants-table-container {
  overflow-x: auto;
}

.participants-table {
  width: 100%;
  border-collapse: collapse;
}

.participants-table th,
.participants-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.participants-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.empty-participants {
  text-align: center;
  padding: 2rem;
  color: #666;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
</style>