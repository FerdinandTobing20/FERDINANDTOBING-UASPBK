<template>
  <div class="event-detail-component">
    <div class="detail-header">
      <h2>{{ event.title }}</h2>
      <span :class="['status-badge', event.status]">
        {{ formatters.status(event.status) }}
      </span>
    </div>
    
    <div class="detail-body">
      <p class="description">{{ event.description }}</p>
      
      <div class="info-grid">
        <div class="info-item">
          <span class="icon">📅</span>
          <div>
            <span class="label">Tanggal</span>
            <span class="value">{{ formatters.date(event.date) }}</span>
          </div>
        </div>
        
        <div class="info-item">
          <span class="icon">⏰</span>
          <div>
            <span class="label">Waktu</span>
            <span class="value">{{ formatters.time(event.time) }}</span>
          </div>
        </div>
        
        <div class="info-item">
          <span class="icon">📍</span>
          <div>
            <span class="label">Lokasi</span>
            <span class="value">{{ event.location }}</span>
          </div>
        </div>
        
        <div class="info-item">
          <span class="icon">👥</span>
          <div>
            <span class="label">Kapasitas</span>
            <span class="value">{{ event.capacity }} peserta</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatters } from '@/utils/formatters'

defineProps({
  event: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.event-detail-component {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.detail-header h2 {
  margin: 0;
  color: #333;
}

.status-badge {
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

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-item div {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 0.25rem;
}

.value {
  font-weight: 600;
  color: #333;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>