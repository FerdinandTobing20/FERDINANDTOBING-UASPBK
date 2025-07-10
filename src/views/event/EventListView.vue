<template>
  <div class="event-list">
    <div class="page-header">
      <h1>Daftar Event</h1>
      <RouterLink v-if="isAdmin" to="/event/tambah" class="btn-primary">
        Tambah Event Baru
      </RouterLink>
    </div>
    
    <div v-if="loading" class="loading">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="error" class="error">
      <ErrorMessage :message="error" />
    </div>
    
    <div v-else class="events-grid">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @view="viewEvent"
        @edit="editEvent"
        @delete="deleteEvent"
      />
    </div>
    
    <div v-if="!loading && events.length === 0" class="empty-state">
      <p>Belum ada event yang tersedia</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import EventCard from '@/components/event/EventCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import { ROLES } from '@/utils/constants'

const router = useRouter()
const authStore = useAuthStore()
const eventStore = useEventStore()

const isAdmin = computed(() => authStore.userRole === ROLES.ADMIN)
const events = computed(() => eventStore.events)
const loading = computed(() => eventStore.loading)
const error = computed(() => eventStore.error)

const viewEvent = (id) => {
  router.push(`/event/${id}`)
}

const editEvent = (id) => {
  router.push(`/event/edit/${id}`)
}

const deleteEvent = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus event ini?')) {
    const result = await eventStore.deleteEvent(id)
    if (!result.success) {
      alert('Gagal menghapus event: ' + result.error)
    }
  }
}

onMounted(() => {
  eventStore.fetchEvents()
})
</script>

<style scoped>
.event-list {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #333;
  margin: 0;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.loading,
.error,
.empty-state {
  text-align: center;
  padding: 3rem;
}

.empty-state {
  color: #666;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .page-header h1 {
    text-align: center;
  }
  
  .btn-primary {
    text-align: center;
  }
}
</style>