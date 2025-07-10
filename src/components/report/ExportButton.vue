<template>
  <div class="export-button">
    <button @click="showMenu = !showMenu" class="export-btn">
      📥 Export
      <span class="arrow">{{ showMenu ? '▲' : '▼' }}</span>
    </button>
    
    <div v-if="showMenu" class="export-menu">
      <button @click="exportCSV" class="menu-item">
        Export ke CSV
      </button>
      <button @click="exportJSON" class="menu-item">
        Export ke JSON
      </button>
      <button @click="print" class="menu-item">
        Print
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  filename: {
    type: String,
    default: 'export'
  }
})

const emit = defineEmits(['export'])

const showMenu = ref(false)

const exportCSV = () => {
  // Convert data to CSV
  const headers = Object.keys(props.data[0] || {})
  const csvContent = [
    headers.join(','),
    ...props.data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Escape quotes and wrap in quotes if contains comma
        const escaped = String(value).replace(/"/g, '""')
        return escaped.includes(',') ? `"${escaped}"` : escaped
      }).join(',')
    )
  ].join('\n')
  
  // Download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${props.filename}-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  
  showMenu.value = false
  emit('export', 'csv')
}

const exportJSON = () => {
  const jsonContent = JSON.stringify(props.data, null, 2)
  
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${props.filename}-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  
  showMenu.value = false
  emit('export', 'json')
}

const print = () => {
  window.print()
  showMenu.value = false
  emit('export', 'print')
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.export-button')) {
    showMenu.value = false
  }
}

// Add/remove event listener
if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>

<style scoped>
.export-button {
  position: relative;
}

.export-btn {
  padding: 0.5rem 1rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
}

.export-btn:hover {
  background-color: #229954;
}

.arrow {
  font-size: 0.75rem;
}

.export-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 150px;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #f8f9fa;
}

.menu-item:not(:last-child) {
  border-bottom: 1px solid #eee;
}
</style>