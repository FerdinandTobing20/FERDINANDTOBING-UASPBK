<template>
  <div class="report-table">
    <div class="table-header">
      <h3>Detail Laporan Event</h3>
      <ExportButton
        :data="reportData"
        filename="laporan-event"
        @export="$emit('export')"
      />
    </div>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th @click="sort('title')">
              Event
              <span class="sort-icon">{{ getSortIcon('capacity') }}</span>
            </th>
            <th @click="sort('registered')">
              Terdaftar
              <span class="sort-icon">{{ getSortIcon('registered') }}</span>
            </th>
            <th @click="sort('attended')">
              Hadir
              <span class="sort-icon">{{ getSortIcon('attended') }}</span>
            </th>
            <th @click="sort('attendanceRate')">
              Tingkat Kehadiran
              <span class="sort-icon">{{ getSortIcon('attendanceRate') }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedData" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ formatters.date(item.date) }}</td>
            <td>{{ item.location }}</td>
            <td>
              <span :class="['status-badge', item.status]">
                {{ formatters.status(item.status) }}
              </span>
            </td>
            <td>{{ item.capacity }}</td>
            <td>{{ item.registered }}</td>
            <td>{{ item.attended }}</td>
            <td>
              <div class="attendance-rate">
                <span>{{ item.attendanceRate }}%</span>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: item.attendanceRate + '%' }"
                  ></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4"><strong>Total</strong></td>
            <td><strong>{{ totals.capacity }}</strong></td>
            <td><strong>{{ totals.registered }}</strong></td>
            <td><strong>{{ totals.attended }}</strong></td>
            <td><strong>{{ totals.attendanceRate }}%</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
    
    <div v-if="reportData.length === 0" class="empty-state">
      <p>Tidak ada data untuk ditampilkan</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatters } from '@/utils/formatters'
import ExportButton from './ExportButton.vue'

const props = defineProps({
  reportData: {
    type: Array,
    default: () => []
  }
})

defineEmits(['export'])

const sortKey = ref('')
const sortOrder = ref(1)

const sortedData = computed(() => {
  if (!sortKey.value) return props.reportData
  
  return [...props.reportData].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]
    
    if (aVal < bVal) return -1 * sortOrder.value
    if (aVal > bVal) return 1 * sortOrder.value
    return 0
  })
})

const totals = computed(() => {
  const capacity = props.reportData.reduce((sum, item) => sum + item.capacity, 0)
  const registered = props.reportData.reduce((sum, item) => sum + item.registered, 0)
  const attended = props.reportData.reduce((sum, item) => sum + item.attended, 0)
  const attendanceRate = registered > 0 ? Math.round((attended / registered) * 100) : 0
  
  return { capacity, registered, attended, attendanceRate }
})

const sort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1
  } else {
    sortKey.value = key
    sortOrder.value = 1
  }
}

const getSortIcon = (key) => {
  if (sortKey.value !== key) return '↕️'
  return sortOrder.value === 1 ? '↓' : '↑'
}
</script>

<style scoped>
.report-table {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.table-header h3 {
  margin: 0;
  color: #333;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  user-select: none;
}

th:hover {
  background-color: #e9ecef;
}

.sort-icon {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.6;
}

tbody tr:hover {
  background-color: #f8f9fa;
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

.attendance-rate {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #3498db;
  transition: width 0.3s;
}

tfoot td {
  background-color: #f8f9fa;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}
</style>