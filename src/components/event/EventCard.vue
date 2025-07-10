<template>
  <div class="event-card">
    <div class="event-header">
      <h3>{{ event.title }}</h3>
      <span :class="['status-badge', event.status]">
        {{ formatters.status(event.status) }}
      </span>
    </div>
    
    <div class="event-info">
      <p class="description">{{ event.description }}</p>
      
      <div class="detail-item">
        <span class="icon">📅</span>
        <span>{{ formatters.date(event.date) }}</span>
      </div>
      
      <div class="detail-item">
        <span class="icon">⏰</span>
        <span>{{ formatters.time(event.time) }}</span>
      </div>
      
      <div class="detail-item">
        <span class="icon">📍</span>
        <span>{{ event.location }}</span>
      </div>
      
      <div class="detail-item">
        <span class="icon">👥</span>
        <span>Kapasitas: {{ event.capacity }} peserta</span>
      </div>
    </div>
    
    <div class="event-actions">
      <button @click="$emit('view', event.id)" class="btn-view">
        Lihat Detail
      </button>
      <button v-if="canEdit" @click="$emit('edit', event.id)" class="btn-edit">
        Edit
      </button>
      <button v-if="canDelete" @click="$emit('delete', event.id)" class="btn-delete">
        Hapus
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { formatters } from '@/utils/formatters'
import { ROLES } from '@/utils/constants'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

defineEmits(['view', 'edit', 'delete'])

const authStore = useAuthStore()
const isAdmin = computed(() => authStore.userRole === ROLES.ADMIN)
const canEdit = computed(() => isAdmin.value)
const canDelete = computed(() => isAdmin.value)
</script>

<style scoped>
.event-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.event-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.25rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
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

.status-badge.completed {
  background-color: #95a5a6;
  color: white;
}

.event-info {
  margin-bottom: 1.5rem;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.detail-item {
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

.event-actions {
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.event-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-view {
  background-color: #3498db;
  color: white;
  flex: 1;
}

.btn-view:hover {
  background-color: #2980b9;
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
</style>