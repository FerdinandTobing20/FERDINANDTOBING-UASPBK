<template>
  <div class="event-list-component">
    <div v-if="loading" class="loading">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="events.length > 0" class="events-container">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @view="$emit('view', $event)"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
    
    <div v-else class="empty-state">
      <p>{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import EventCard from './EventCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

defineProps({
  events: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  emptyMessage: {
    type: String,
    default: 'Tidak ada event yang tersedia'
  }
})

defineEmits(['view', 'edit', 'delete'])
</script>

<style scoped>
.events-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.loading,
.empty-state {
  text-align: center;
  padding: 3rem;
}

.empty-state {
  color: #666;
}
</style>