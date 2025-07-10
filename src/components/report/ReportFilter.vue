<template>
  <div class="report-filter">
    <h3>Filter Laporan</h3>
    
    <div class="filter-form">
      <div class="filter-group">
        <label for="event-filter">Event</label>
        <select
          id="event-filter"
          :value="filters.eventId"
          @change="updateFilter('eventId', $event.target.value)"
        >
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
        <label for="status-filter">Status Event</label>
        <select
          id="status-filter"
          :value="filters.status"
          @change="updateFilter('status', $event.target.value)"
        >
          <option value="">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Tidak Aktif</option>
          <option value="completed">Selesai</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="date-from">Dari Tanggal</label>
        <input
          id="date-from"
          type="date"
          :value="filters.dateFrom"
          @change="updateFilter('dateFrom', $event.target.value)"
        />
      </div>
      
      <div class="filter-group">
        <label for="date-to">Sampai Tanggal</label>
        <input
          id="date-to"
          type="date"
          :value="filters.dateTo"
          @change="updateFilter('dateTo', $event.target.value)"
        />
      </div>
      
      <div class="filter-actions">
        <button @click="$emit('apply')" class="btn-apply">
          Terapkan Filter
        </button>
        <button @click="$emit('reset')" class="btn-reset">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      eventId: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    })
  },
  events: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update', 'apply', 'reset'])

const updateFilter = (key, value) => {
  emit('update', { ...props.filters, [key]: value })
}
</script>

<style scoped>
.report-filter {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.report-filter h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.filter-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: 500;
}

.filter-group select,
.filter-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
}

.filter-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-apply,
.btn-reset {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-apply {
  background-color: #3498db;
  color: white;
}

.btn-apply:hover {
  background-color: #2980b9;
}

.btn-reset {
  background-color: #ecf0f1;
  color: #333;
}

.btn-reset:hover {
  background-color: #bdc3c7;
}
</style>