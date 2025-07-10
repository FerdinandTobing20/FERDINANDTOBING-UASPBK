<template>
  <div class="attendee-list">
    <div class="list-header">
      <h3>Daftar Peserta</h3>
      <div class="stats">
        <span class="stat">
          <span class="stat-label">Total:</span>
          <span class="stat-value">{{ attendees.length }}</span>
        </span>
        <span class="stat">
          <span class="stat-label">Hadir:</span>
          <span class="stat-value attended">{{ attendedCount }}</span>
        </span>
        <span class="stat">
          <span class="stat-label">Belum Hadir:</span>
          <span class="stat-value not-attended">{{ notAttendedCount }}</span>
        </span>
      </div>
    </div>
    
    <div class="search-filter">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari nama atau email..."
        class="search-input"
      />
      <select v-model="filterStatus" class="filter-select">
        <option value="">Semua Status</option>
        <option value="attended">Sudah Hadir</option>
        <option value="not-attended">Belum Hadir</option>
      </select>
    </div>
    
    <div class="attendee-table-container">
      <table class="attendee-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Kode Registrasi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(attendee, index) in filteredAttendees" :key="attendee.id">
            <td>{{ index + 1 }}</td>
            <td>{{ attendee.name }}</td>
            <td>{{ attendee.email }}</td>
            <td class="code">{{ attendee.registrationCode }}</td>
            <td>
              <span :class="['status', attendee.attended ? 'attended' : 'not-attended']">
                {{ attendee.attended ? 'Hadir' : 'Belum Hadir' }}
              </span>
            </td>
            <td>
              <button
                v-if="!attendee.attended"
                @click="$emit('verify', attendee.id)"
                class="verify-btn"
              >
                Verifikasi
              </button>
              <span v-else class="verified">✓ Terverifikasi</span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="filteredAttendees.length === 0" class="empty-state">
        <p>Tidak ada data peserta yang sesuai</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  attendees: {
    type: Array,
    default: () => []
  }
})

defineEmits(['verify'])

const searchQuery = ref('')
const filterStatus = ref('')

const attendedCount = computed(() => 
  props.attendees.filter(a => a.attended).length
)

const notAttendedCount = computed(() => 
  props.attendees.filter(a => !a.attended).length
)

const filteredAttendees = computed(() => {
  let filtered = props.attendees
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(query) ||
      a.email.toLowerCase().includes(query) ||
      a.registrationCode.toLowerCase().includes(query)
    )
  }
  
  // Status filter
  if (filterStatus.value === 'attended') {
    filtered = filtered.filter(a => a.attended)
  } else if (filterStatus.value === 'not-attended') {
    filtered = filtered.filter(a => !a.attended)
  }
  
  return filtered
})
</script>

<style scoped>
.attendee-list {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-header h3 {
  margin: 0;
  color: #333;
}

.stats {
  display: flex;
  gap: 2rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.875rem;
}

.stat-value {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.stat-value.attended {
  color: #27ae60;
}

.stat-value.not-attended {
  color: #f39c12;
}

.search-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
}

.attendee-table-container {
  overflow-x: auto;
}

.attendee-table {
  width: 100%;
  border-collapse: collapse;
}

.attendee-table th,
.attendee-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.attendee-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.attendee-table tr:hover {
  background-color: #f8f9fa;
}

.code {
  font-family: monospace;
  color: #666;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status.attended {
  background-color: #d4edda;
  color: #155724;
}

.status.not-attended {
  background-color: #fff3cd;
  color: #856404;
}

.verify-btn {
  padding: 0.25rem 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.verify-btn:hover {
  background-color: #2980b9;
}

.verified {
  color: #27ae60;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>