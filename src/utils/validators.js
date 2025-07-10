export const validators = {
  required: (value) => {
    return !!value || 'Field ini wajib diisi'
  },
  
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Email tidak valid'
  },
  
  minLength: (min) => (value) => {
    return value.length >= min || `Minimal ${min} karakter`
  },
  
  maxCapacity: (max) => (value) => {
    return value <= max || `Maksimal ${max} peserta`
  },
  
  futureDate: (value) => {
    const date = new Date(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today || 'Tanggal harus di masa depan'
  }
}