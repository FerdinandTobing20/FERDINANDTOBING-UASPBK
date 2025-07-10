<template>
  <div class="report-view">
    <h1>Laporan Event</h1>
    
    <div class="report-filters">
      <div class="filter-group">
        <label for="event-filter">Filter Event:</label>
        <select id="event-filter" v-model="selectedEventId">
          <option value="">Semua Event</option>
          <option
            v-for="event in events"
            :key="event.id"
            :value="event.id"
          >
            {{ event.title }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="status-filter">Status:</label>
        <select id="status-filter" v-model="selectedStatus">
          <option value="">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Tidak Aktif</option>
          <option value="completed">Selesai</option>
        </select>
      </div>
      
      <button @click="exportReport" class="export-btn">
        📥 Export Laporan
      </button>
    </div>
    
    <div v-if="loading" class="loading">
      <LoadingSpinner message="Memuat laporan..." />
    </div>
    
    <div v-else class="report-content">
      <div class="summary-cards">
        <div class="summary-card">
          <h3>Total Event</h3>
          <p class="summary-number">{{ filteredEvents.length }}</p>
        </div>
        <div class="summary-card">
          <h3>Total Peserta</h3>
          <p class="summary-number">{{ totalParticipants }}</p>
        </div>
        <div class="summary-card">
          <h3>Total Hadir</h3>
          <p class="summary-number">{{ totalAttended }}</p>
        </div>
        <div class="summary-card">
          <h3>Tingkat Kehadiran</h3>
          <p class="summary-number">{{ attendanceRate }}%</p>
        </div>
      </div>
      
      <div class="report-table-container">
        <h2>Detail Event</h2>
        <table class="report-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Tanggal</th>
              <th>Lokasi</th>
              <th>Status</th>
              <th>Kapasitas</th>
              <th>Terdaftar</th>
              <th>Hadir</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in eventReports" :key="report.event.id">
              <td>{{ report.event.title }}</td>
              <td>{{ formatters.date(report.event.date) }}</td>
              <td>{{ report.event.location }}</td>
              <td>
                <span :class="['status-badge', report.event.status]">
                  {{ formatters.status(report.event.status) }}
                </span>
              </td>
              <td>{{ report.event.capacity }}</td>
              <td>{{ report.registered }}</td>
              <td>{{ report.attended }}</td>
              <td>{{ report.attendanceRate }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEventStore } from '@/stores/event'
import { registrationService } from '@/services/registrationService'
import { formatters } from '@/utils/formatters'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const eventStore = useEventStore()

const selectedEventId = ref('')
const selectedStatus = ref('')
const loading = ref(false)
const registrations = ref([])

const events = computed(() => eventStore.events)

const filteredEvents = computed(() => {
  let filtered = events.value
  
  if (selectedEventId.value) {
    filtered = filtered.filter(e => e.id === parseInt(selectedEventId.value))
  }
  
  if (selectedStatus.value) {
    filtered = filtered.filter(e => e.status === selectedStatus.value)
  }
  
  return filtered
})

const eventReports = computed(() => {
  return filteredEvents.value.map(event => {
    const eventRegistrations = registrations.value.filter(r => r.eventId === event.id)
    const attended = eventRegistrations.filter(r => r.attended).length
    const registered = eventRegistrations.length
    
    return {
      event,
      registered,
      attended,
      attendanceRate: registered > 0 ? Math.round((attended / registered) * 100) : 0
    }
  })
})

const totalParticipants = computed(() => 
  eventReports.value.reduce((sum, report) => sum + report.registered, 0)
)

const totalAttended = computed(() => 
  eventReports.value.reduce((sum, report) => sum + report.attended, 0)
)

const attendanceRate = computed(() => 
  totalParticipants.value > 0 
    ? Math.round((totalAttended.value / totalParticipants.value) * 100) 
    : 0
)

const loadData = async () => {
  loading.value = true
  try {
    await eventStore.fetchEvents()
    
    // Load all registrations
    const allRegistrations = []
    for (const event of events.value) {
      const eventRegs = await registrationService.getByEvent(event.id)
      allRegistrations.push(...eventRegs)
    }
    registrations.value = allRegistrations
  } catch (error) {
    console.error('Error loading report data:', error)
  } finally {
    loading.value = false
  }
}

const exportReport = () => {
  // Generate CSV content
  const headers = ['Event', 'Tanggal', 'Lokasi', 'Status', 'Kapasitas', 'Terdaftar', 'Hadir', 'Tingkat Kehadiran']
  const rows = eventReports.value.map(report => [
    report.event.title,
    formatters.date(report.event.date),
    report.event.location,
    formatters.status(report.event.status),
    report.event.capacity,
    report.registered,
    report.attended,
    `${report.attendanceRate}%`
  ])
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `laporan-event-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.report-view {
  max-width: 1200px;
  margin: 0 auto;
}

.report-view h1 {
  margin-bottom: 2rem;
  color: #333;
}

.report-filters {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
}

.filter-group {
  flex: 1;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.filter-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.export-btn {
  padding: 0.75rem 1.5rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.export-btn:hover {
  background-color: #229954;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.summary-card h3 {
  color: #666;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.summary-number {
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
  margin: 0;
}

.report-table-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.report-table-container h2 {
  margin-bottom: 1rem;
  color: #333;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
}

.report-table th,
.report-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.report-table th {
  background-color: #f8f9fa;
  font-weight: 600;
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

.status-badge.completed {
  background-color: #95a5a6;
  color: white;
}

.loading {
  text-align: center;
  padding: 3rem;
}
</style>