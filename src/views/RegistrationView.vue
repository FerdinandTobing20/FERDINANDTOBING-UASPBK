<template>
  <div class="registration-view">
    <h1>Pendaftaran Event</h1>
    
    <div class="tabs">
      <button
        :class="['tab', { active: activeTab === 'available' }]"
        @click="activeTab = 'available'"
      >
        Event Tersedia
      </button>
      <button
        :class="['tab', { active: activeTab === 'registered' }]"
        @click="activeTab = 'registered'"
      >
        Event Terdaftar
      </button>
    </div>
    
    <div v-if="loading" class="loading">
      <LoadingSpinner />
    </div>
    
    <div v-else>
      <!-- Available Events Tab -->
      <div v-if="activeTab === 'available'" class="events-grid">
        <div
          v-for="event in availableEvents"
          :key="event.id"
          class="event-card"
        >
          <h3>{{ event.title }}</h3>
          <p class="description">{{ event.description }}</p>
          
          <div class="event-details">
            <div class="detail">
              <span class="icon">📅</span>
              {{ formatters.date(event.date) }}
            </div>
            <div class="detail">
              <span class="icon">⏰</span>
              {{ formatters.time(event.time) }}
            </div>
            <div class="detail">
              <span class="icon">📍</span>
              {{ event.location }}
            </div>
            <div class="detail">
              <span class="icon">👥</span>
              Kuota: {{ getAvailableSlots(event.id) }}/{{ event.capacity }}
            </div>
          </div>
          
          <div class="card-actions">
            <RouterLink
              :to="`/event/${event.id}`"
              class="btn-detail"
            >
              Lihat Detail
            </RouterLink>
            <button
              @click="registerEvent(event)"
              class="btn-register"
              :disabled="getAvailableSlots(event.id) === 0"
            >
              {{ getAvailableSlots(event.id) === 0 ? 'Penuh' : 'Daftar' }}
            </button>
          </div>
        </div>
        
        <div v-if="availableEvents.length === 0" class="empty-state">
          <p>Tidak ada event yang tersedia untuk didaftar</p>
        </div>
      </div>
      
      <!-- Registered Events Tab -->
      <div v-if="activeTab === 'registered'" class="registered-events">
        <div
          v-for="registration in myRegistrations"
          :key="registration.id"
          class="registration-card"
        >
          <div class="registration-header">
            <h3>{{ registration.event.title }}</h3>
            <span :class="['status', registration.attended ? 'attended' : 'registered']">
              {{ registration.attended ? 'Sudah Hadir' : 'Terdaftar' }}
            </span>
          </div>
          
          <p class="description">{{ registration.event.description }}</p>
          
          <div class="registration-info">
            <div class="info-row">
              <span class="label">Tanggal Event:</span>
              <span>{{ formatters.date(registration.event.date) }}, {{ formatters.time(registration.event.time) }}</span>
            </div>
            <div class="info-row">
              <span class="label">Lokasi:</span>
              <span>{{ registration.event.location }}</span>
            </div>
            <div class="info-row">
              <span class="label">Tanggal Daftar:</span>
              <span>{{ formatters.date(registration.registrationDate) }}</span>
            </div>
          </div>
          
          <RouterLink
            :to="`/event/${registration.event.id}`"
            class="btn-view"
          >
            Lihat Detail Event
          </RouterLink>
        </div>
        
        <div v-if="myRegistrations.length === 0" class="empty-state">
          <p>Anda belum terdaftar di event manapun</p>
        </div>
      </div>
    </div>
    
    <!-- Registration Modal -->
    <div v-if="selectedEvent" class="modal-overlay" @click="selectedEvent = null">
      <div class="modal-content" @click.stop>
        <RegistrationForm
          :event="selectedEvent"
          @success="handleRegistrationSuccess"
          @cancel="selectedEvent = null"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import { registrationService } from '@/services/registrationService'
import { eventService } from '@/services/eventService'
import { formatters } from '@/utils/formatters'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import RegistrationForm from '@/components/registration/RegistrationForm.vue'

const authStore = useAuthStore()
const eventStore = useEventStore()

const activeTab = ref('available')
const loading = ref(true)
const myRegistrations = ref([])
const allRegistrations = ref([])
const selectedEvent = ref(null)

const availableEvents = computed(() => {
  const registeredEventIds = myRegistrations.value.map(r => r.eventId)
  return eventStore.activeEvents.filter(e => !registeredEventIds.includes(e.id))
})

const getAvailableSlots = (eventId) => {
  const event = eventStore.events.find(e => e.id === eventId)
  const registrations = allRegistrations.value.filter(r => r.eventId === eventId)
  return event ? event.capacity - registrations.length : 0
}

const loadData = async () => {
  loading.value = true
  try {
    // Load all events
    await eventStore.fetchEvents()
    
    // Load user's registrations
    const userRegs = await registrationService.getByUser(authStore.user.id)
    
    // Get event details for each registration
    myRegistrations.value = await Promise.all(
      userRegs.map(async (reg) => ({
        ...reg,
        event: await eventService.getById(reg.eventId)
      }))
    )
    
    // Load all registrations to check capacity
    const allEvents = eventStore.events
    const allRegs = []
    for (const event of allEvents) {
      const eventRegs = await registrationService.getByEvent(event.id)
      allRegs.push(...eventRegs)
    }
    allRegistrations.value = allRegs
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const registerEvent = (event) => {
  selectedEvent.value = event
}

const handleRegistrationSuccess = () => {
  selectedEvent.value = null
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.registration-view {
  max-width: 1200px;
  margin: 0 auto;
}

.registration-view h1 {
  margin-bottom: 2rem;
  color: #333;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #ecf0f1;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
}

.tab.active {
  color: #3498db;
  border-bottom-color: #3498db;
}

.tab:hover {
  color: #2980b9;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.event-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.event-card h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.event-details {
  margin-bottom: 1.5rem;
}

.detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

.icon {
  font-size: 1rem;
}

.card-actions {
  display: flex;
  gap: 1rem;
}

.btn-detail,
.btn-register {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s;
}

.btn-detail {
  background-color: #ecf0f1;
  color: #333;
}

.btn-detail:hover {
  background-color: #bdc3c7;
}

.btn-register {
  background-color: #3498db;
  color: white;
}

.btn-register:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-register:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.registered-events {
  display: grid;
  gap: 1.5rem;
}

.registration-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.registration-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.registration-header h3 {
  margin: 0;
  color: #333;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status.registered {
  background-color: #f39c12;
  color: white;
}

.status.attended {
  background-color: #27ae60;
  color: white;
}

.registration-info {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.info-row:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 600;
  color: #666;
}

.btn-view {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-view:hover {
  background-color: #2980b9;
}

.empty-state {
  text-align: center;
  padding: 3rem;
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