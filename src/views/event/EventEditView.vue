<template>
  <div class="event-create">
    <div class="page-header">
      <h1>Tambah Event Baru</h1>
    </div>
    
    <div class="form-container">
      <EventForm
        submit-text="Buat Event"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import EventForm from '@/components/event/EventForm.vue'

const router = useRouter()
const eventStore = useEventStore()

const handleSubmit = async (formData) => {
  const result = await eventStore.createEvent(formData)
  
  if (result.success) {
    router.push('/event')
  } else {
    alert('Gagal membuat event: ' + result.error)
  }
}

const handleCancel = () => {
  router.push('/event')
}
</script>

<style scoped>
.event-create {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #333;
}

.form-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>