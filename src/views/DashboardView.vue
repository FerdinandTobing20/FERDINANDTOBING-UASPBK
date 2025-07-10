<template>
  <div class="dashboard">
    <h1>Dashboard {{ roleTitle }}</h1>
    
    <div class="stats-grid">
      <div v-if="isAdmin" class="stat-card">
        <h3>Total Event</h3>
        <p class="stat-number">{{ totalEvents }}</p>
      </div>
      
      <div v-if="isAdmin || isPanitia" class="stat-card">
        <h3>Event Aktif</h3>
        <p class="stat-number">{{ activeEvents }}</p>
      </div>
      
      <div v-if="isAdmin" class="stat-card">
        <h3>Total Peserta</h3>
        <p class="stat-number">{{ totalRegistrations }}</p>
      </div>
      
      <div v-if="isPeserta" class="stat-card">
        <h3>Event Terdaftar</h3>
        <p class="stat-number">{{ myRegistrations }}</p>
      </div>
    </div>
    
    <div class="quick-actions">
      <h2>Aksi Cepat</h2>
      <div class="action-buttons">
        <RouterLink v-if="isAdmin" to="/event/tambah" class="action-btn">
          Tambah Event
        </RouterLink>
        <RouterLink v-if="isPeserta" to="/event" class="action-btn">
          Lihat Event
        </RouterLink>
        <RouterLink v-if="isPanitia" to="/verifikasi" class="action-btn">
          Verifikasi Peserta
        </RouterLink>
        <RouterLink v-if="isAdmin" to="/laporan" class="action-btn">
          Lihat Laporan
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import { eventService } from '@/services/eventService'
import { registrationService } from '@/services/registrationService'
import { ROLES } from '@/utils/constants'

const authStore = useAuthStore()
const eventStore = useEventStore()

const totalEvents = ref(0)
const activeEvents = ref(0)
const totalRegistrations = ref(0)
const myRegistrations = ref(0)

const userRole = computed(() => authStore.userRole)
const isAdmin = computed(() => userRole.value === ROLES.ADMIN)
const isPanitia = computed(() => userRole.value === ROLES.PANITIA)
const isPeserta = computed(() => userRole.value === ROLES.PESERTA)

const roleTitle = computed(() => {
  const roles = {
    admin: 'Admin',
    panitia: 'Panitia',
    peserta: 'Peserta'
  }
  return roles[userRole.value] || ''
})

onMounted(async () => {
  await eventStore.fetchEvents()
  
  totalEvents.value = eventStore.events.length
  activeEvents.value = eventStore.activeEvents.length
  
  if (isAdmin.value) {
    // Get total registrations
    const registrations = await registrationService.getByEvent()
    totalRegistrations.value = registrations.length
  }
  
  if (isPeserta.value) {
    // Get user's registrations
    const registrations = await registrationService.getByUser(authStore.user.id)
    myRegistrations.value = registrations.length
  }
})
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard h1 {
  margin-bottom: 2rem;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #3498db;
  margin: 0;
}

.quick-actions h2 {
  margin-bottom: 1rem;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #2980b9;
}
</style>