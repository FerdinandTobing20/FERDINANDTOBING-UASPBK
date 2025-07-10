<template>
  <div class="verification-view">
    <h1>Verifikasi Kehadiran Peserta</h1>
    
    <div class="verification-container">
      <div class="event-selector">
        <label for="event-select">Pilih Event:</label>
        <select
          id="event-select"
          v-model="selectedEventId"
          @change="loadParticipants"
        >
          <option value="">-- Pilih Event --</option>
          <option
            v-for="event in activeEvents"
            :key="event.id"
            :value="event.id"
          >
            {{ event.title }} - {{ formatters.date(event.date) }}
          </option>
        </select>
      </div>
      
      <div v-if="loading" class="loading">
        <LoadingSpinner message="Memuat data peserta..." />
      </div>
      
      <div v-else-if="selectedEventId && participants.length > 0" class="participants-list">
        <h2>Daftar Peserta ({{ participants.length }} orang)</h2>
        
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari peserta..."
            class="search-input"
          />
        </div>
        
        <table class="participants-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Waktu Daftar</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(participant, index) in filteredParticipants"
              :key="participant.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ participant.user.name }}</td>
              <td>{{ participant.user.email }}</td>
              <td>{{ formatters.date(participant.registrationDate) }}</td>
              <td>
                <span :class="['status-badge', participant.attended ? 'attended' : 'registered']">
                  {{ participant.attended ? 'Hadir' : 'Terdaftar' }}
                </span>
              </td>
              <td>
                <button
                  v-if="!participant.attended"
                  @click="verifyAttendance(participant.id)"
                  class="verify-btn"
                >
                  Verifikasi
                </button>
                <span v-else class="verified-text">✓ Terverifikasi</span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="summary">
          <p>Total Terdaftar: {{ participants.length }}</p>
          <p>Total Hadir: {{ attendedCount }}</p>
          <p>Belum Hadir: {{ participants.length - attendedCount }}</p>
        </div>
      </div>
      
      <div v-else-if="selectedEventId && participants.length === 0" class="empty-state">
        <p>Belum ada peserta yang terdaftar untuk event ini.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEventStore } from '@/stores/event'
import { registrationService } from '@/services/registrationService'
import { formatters } from '@/utils/formatters'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import api from '@/services/api'

const eventStore = useEventStore()

const selectedEventId = ref('')
const participants = ref([])
const searchQuery = ref('')
const loading = ref(false)

const activeEvents = computed(() => eventStore.activeEvents)

const filteredParticipants = computed(() => {
  if (!searchQuery.value) return participants.value
  
  const query = searchQuery.value.toLowerCase()
  return participants.value.filter(p => 
    p.user.name.toLowerCase().includes(query) ||
    p.user.email.toLowerCase().includes(query)
  )
})

const attendedCount = computed(() => 
  participants.value.filter(p => p.attended).length
)

const loadParticipants = async () => {
  if (!selectedEventId.value) {
    participants.value = []
    return
  }
  
  loading.value = true
  try {
    const registrations = await registrationService.getByEvent(selectedEventId.value)
    
    // Load user data for each registration
    const participantsWithUsers = await Promise.all(
      registrations.map(async (reg) => {
        const { data: user } = await api.get(`/users/${reg.userId}`)
        return {
          ...reg,
          user
        }
      })
    )
    
    participants.value = participantsWithUsers
  } catch (error) {
    console.error('Error loading participants:', error)
  } finally {
    loading.value = false
  }
}

const verifyAttendance = async (registrationId) => {
  try {
    await registrationService.updateAttendance(registrationId, true)
    
    // Update local state
    const participant = participants.value.find(p => p.id === registrationId)
    if (participant) {
      participant.attended = true
    }
  } catch (error) {
    alert('Gagal memverifikasi kehadiran')
  }
}

onMounted(() => {
  eventStore.fetchEvents()
})
</script>

<style scoped>
.verification-view {
  max-width: 1200px;
  margin: 0 auto;
}

.verification-view h1 {
  margin-bottom: 2rem;
  color: #333;
}

.verification-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.event-selector {
  margin-bottom: 2rem;
}

.event-selector label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.event-selector select {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.participants-list h2 {
  margin-bottom: 1rem;
  color: #333;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  max-width: 300px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.participants-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
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

.participants-table tr:hover {
  background-color: #f8f9fa;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge.registered {
  background-color: #f39c12;
  color: white;
}

.status-badge.attended {
  background-color: #27ae60;
  color: white;
}

.verify-btn {
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.verify-btn:hover {
  background-color: #2980b9;
}

.verified-text {
  color: #27ae60;
  font-weight: 600;
}

.summary {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
}

.summary p {
  margin: 0;
  font-weight: 600;
  color: #333;
}

.loading,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}
</style>