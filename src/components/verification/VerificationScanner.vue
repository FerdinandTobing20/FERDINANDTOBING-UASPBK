<template>
  <div class="verification-scanner">
    <h3>Scanner Verifikasi</h3>
    
    <div class="scanner-input">
      <label for="registration-code">Masukkan Kode Registrasi:</label>
      <div class="input-group">
        <input
          id="registration-code"
          v-model="registrationCode"
          type="text"
          placeholder="Contoh: REG-001"
          @keyup.enter="verifyCode"
        />
        <button @click="verifyCode" :disabled="!registrationCode">
          Verifikasi
        </button>
      </div>
    </div>
    
    <div v-if="verificationResult" class="result" :class="resultClass">
      <div class="result-icon">{{ resultIcon }}</div>
      <h4>{{ resultTitle }}</h4>
      <p>{{ resultMessage }}</p>
      
      <div v-if="verificationResult.success && participant" class="participant-info">
        <div class="info-row">
          <span class="label">Nama:</span>
          <span class="value">{{ participant.name }}</span>
        </div>
        <div class="info-row">
          <span class="label">Email:</span>
          <span class="value">{{ participant.email }}</span>
        </div>
      </div>
      
      <button @click="resetScanner" class="reset-btn">
        Scan Lagi
      </button>
    </div>
    
    <div class="scanner-placeholder">
      <div class="camera-icon">📷</div>
      <p>QR Scanner akan ditambahkan di versi selanjutnya</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['verify-success'])

const registrationCode = ref('')
const verificationResult = ref(null)
const participant = ref(null)

const resultClass = computed(() => {
  if (!verificationResult.value) return ''
  return verificationResult.value.success ? 'success' : 'error'
})

const resultIcon = computed(() => {
  if (!verificationResult.value) return ''
  return verificationResult.value.success ? '✅' : '❌'
})

const resultTitle = computed(() => {
  if (!verificationResult.value) return ''
  return verificationResult.value.success ? 'Verifikasi Berhasil!' : 'Verifikasi Gagal'
})

const resultMessage = computed(() => {
  if (!verificationResult.value) return ''
  return verificationResult.value.message
})

const verifyCode = () => {
  if (!registrationCode.value) return
  
  // Simulate verification
  // In real app, this would call an API
  if (registrationCode.value.startsWith('REG-')) {
    verificationResult.value = {
      success: true,
      message: 'Peserta berhasil diverifikasi'
    }
    participant.value = {
      name: 'John Doe',
      email: 'john@example.com'
    }
    emit('verify-success', registrationCode.value)
  } else {
    verificationResult.value = {
      success: false,
      message: 'Kode registrasi tidak valid'
    }
    participant.value = null
  }
}

const resetScanner = () => {
  registrationCode.value = ''
  verificationResult.value = null
  participant.value = null
}
</script>

<style scoped>
.verification-scanner {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.verification-scanner h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.scanner-input {
  margin-bottom: 2rem;
}

.scanner-input label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: 500;
}

.input-group {
  display: flex;
  gap: 1rem;
}

.input-group input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input-group button {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.input-group button:hover:not(:disabled) {
  background-color: #2980b9;
}

.input-group button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.result {
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
}

.result.success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.result.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

.result-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.result h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.result p {
  margin-bottom: 1rem;
  color: #666;
}

.participant-info {
  background-color: rgba(255, 255, 255, 0.7);
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
  font-weight: 500;
  color: #666;
}

.value {
  font-weight: 600;
  color: #333;
}

.reset-btn {
  padding: 0.5rem 1.5rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background-color: #27ae60;
}

.scanner-placeholder {
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #ddd;
}

.camera-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.scanner-placeholder p {
  color: #666;
  margin: 0;
}
</style>