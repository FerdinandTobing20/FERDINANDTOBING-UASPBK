<template>
  <div class="registration-status">
    <div class="status-header">
      <h3>Status Pendaftaran</h3>
      <span :class="['status-badge', statusClass]">
        {{ statusText }}
      </span>
    </div>
    
    <div class="status-details">
      <div class="detail-row">
        <span class="label">Tanggal Daftar:</span>
        <span class="value">{{ formatters.date(registration.registrationDate) }}</span>
      </div>
      
      <div v-if="registration.attended" class="detail-row">
        <span class="label">Status Kehadiran:</span>
        <span class="value attended">✅ Sudah Hadir</span>
      </div>
      
      <div v-else class="detail-row">
        <span class="label">Status Kehadiran:</span>
        <span class="value not-attended">⏳ Belum Hadir</span>
      </div>
    </div>
    
    <div v-if="showQRCode" class="qr-section">
      <h4>QR Code Pendaftaran</h4>
      <div class="qr-placeholder">
        <p>QR-{{ registration.id }}</p>
      </div>
      <p class="qr-note">Tunjukkan QR code ini saat verifikasi</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatters } from '@/utils/formatters'

const props = defineProps({
  registration: {
    type: Object,
    required: true
  },
  showQRCode: {
    type: Boolean,
    default: false
  }
})

const statusClass = computed(() => {
  if (props.registration.attended) return 'attended'
  return 'registered'
})

const statusText = computed(() => {
  if (props.registration.attended) return 'Sudah Hadir'
  return 'Terdaftar'
})
</script>

<style scoped>
.registration-status {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.status-header h3 {
  margin: 0;
  color: #333;
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

.status-details {
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
}

.label {
  color: #666;
  font-weight: 500;
}

.value {
  color: #333;
  font-weight: 600;
}

.value.attended {
  color: #27ae60;
}

.value.not-attended {
  color: #f39c12;
}

.qr-section {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.qr-section h4 {
  margin-bottom: 1rem;
  color: #333;
}

.qr-placeholder {
  width: 200px;
  height: 200px;
  margin: 0 auto 1rem;
  background-color: #f8f9fa;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 1.2rem;
}

.qr-note {
  font-size: 0.875rem;
  color: #666;
}
</style>