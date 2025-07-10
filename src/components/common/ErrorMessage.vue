<template>
  <div class="error-container">
    <div class="error-icon">⚠️</div>
    <h3>Terjadi Kesalahan</h3>
    <p>{{ message }}</p>
    <button v-if="showRetry" @click="$emit('retry')" class="retry-btn">
      Coba Lagi
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Terjadi kesalahan. Silakan coba lagi.'
  },
  showRetry: {
    type: Boolean,
    default: false
  }
})

defineEmits(['retry'])
</script>

<style scoped>
.error-container {
  text-align: center;
  padding: 2rem;
  background-color: #fee;
  border-radius: 8px;
  border: 1px solid #fcc;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-container h3 {
  color: #c0392b;
  margin-bottom: 0.5rem;
}

.error-container p {
  color: #666;
  margin-bottom: 1rem;
}

.retry-btn {
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.retry-btn:hover {
  background-color: #c0392b;
}
</style>