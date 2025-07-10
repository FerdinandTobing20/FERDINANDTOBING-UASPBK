export const formatters = {
  date: (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  },
  
  time: (timeString) => {
    return timeString.slice(0, 5) // HH:mm
  },
  
  currency: (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  },
  
  status: (status) => {
    const statusMap = {
      active: 'Aktif',
      inactive: 'Tidak Aktif',
      completed : 'Selesai',
      registered: 'Terdaftar',
      attended: 'Hadir',
      absent: 'Tidak Hadir'
    }
    return statusMap[status] || status
  }
}