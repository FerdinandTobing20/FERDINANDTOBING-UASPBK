// Role Constants
export const ROLES = {
  ADMIN: 'admin',
  PANITIA: 'panitia',
  PESERTA: 'peserta'
}

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.PANITIA]: 'Panitia',
  [ROLES.PESERTA]: 'Peserta'
}

// Event Status Constants
export const EVENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  COMPLETED: 'completed'
}

export const EVENT_STATUS_LABELS = {
  [EVENT_STATUS.ACTIVE]: 'Aktif',
  [EVENT_STATUS.INACTIVE]: 'Tidak Aktif',
  [EVENT_STATUS.COMPLETED]: 'Selesai'
}

// Registration Status Constants
export const REGISTRATION_STATUS = {
  REGISTERED: 'registered',
  CANCELLED: 'cancelled',
  ATTENDED: 'attended'
}

export const REGISTRATION_STATUS_LABELS = {
  [REGISTRATION_STATUS.REGISTERED]: 'Terdaftar',
  [REGISTRATION_STATUS.CANCELLED]: 'Dibatalkan',
  [REGISTRATION_STATUS.ATTENDED]: 'Hadir'
}

// API Constants
export const API_ENDPOINTS = {
  USERS: '/users',
  EVENTS: '/events',
  REGISTRATIONS: '/registrations'
}

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  PER_PAGE_OPTIONS: [10, 25, 50, 100]
}

// Date Format Constants
export const DATE_FORMATS = {
  DISPLAY_DATE: 'DD MMMM YYYY',
  DISPLAY_TIME: 'HH:mm',
  DISPLAY_DATETIME: 'DD MMMM YYYY HH:mm',
  API_DATE: 'YYYY-MM-DD',
  API_DATETIME: 'YYYY-MM-DDTHH:mm:ss'
}

// Form Validation Constants
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 100,
  MIN_TITLE_LENGTH: 5,
  MAX_TITLE_LENGTH: 200,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 1000,
  MIN_CAPACITY: 1,
  MAX_CAPACITY: 10000
}

// Message Constants
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login berhasil!',
    LOGOUT: 'Logout berhasil!',
    CREATE_EVENT: 'Event berhasil dibuat!',
    UPDATE_EVENT: 'Event berhasil diperbarui!',
    DELETE_EVENT: 'Event berhasil dihapus!',
    REGISTER_EVENT: 'Pendaftaran berhasil!',
    VERIFY_ATTENDANCE: 'Kehadiran berhasil diverifikasi!',
    UPDATE_PROFILE: 'Profil berhasil diperbarui!',
    EXPORT_DATA: 'Data berhasil diexport!'
  },
  ERROR: {
    GENERAL: 'Terjadi kesalahan. Silakan coba lagi.',
    NETWORK: 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
    UNAUTHORIZED: 'Anda tidak memiliki akses untuk melakukan aksi ini.',
    NOT_FOUND: 'Data tidak ditemukan.',
    VALIDATION: 'Periksa kembali data yang Anda masukkan.',
    LOGIN_FAILED: 'Username atau password salah.',
    EVENT_FULL: 'Event sudah penuh.',
    ALREADY_REGISTERED: 'Anda sudah terdaftar di event ini.',
    DUPLICATE_EMAIL: 'Email sudah digunakan.',
    DUPLICATE_USERNAME: 'Username sudah digunakan.'
  },
  CONFIRM: {
    DELETE_EVENT: 'Apakah Anda yakin ingin menghapus event ini?',
    LOGOUT: 'Apakah Anda yakin ingin keluar?',
    CANCEL_REGISTRATION: 'Apakah Anda yakin ingin membatalkan pendaftaran?'
  }
}

// Color Constants for Charts/Reports
export const CHART_COLORS = {
  PRIMARY: '#3498db',
  SUCCESS: '#2ecc71',
  WARNING: '#f39c12',
  DANGER: '#e74c3c',
  INFO: '#3498db',
  SECONDARY: '#95a5a6'
}

// Export Format Constants
export const EXPORT_FORMATS = {
  CSV: 'csv',
  JSON: 'json',
  PDF: 'pdf',
  EXCEL: 'excel'
}

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  THEME: 'app_theme',
  LANGUAGE: 'app_language'
}

// Default Values
export const DEFAULTS = {
  EVENT_CAPACITY: 30,
  EVENT_STATUS: EVENT_STATUS.ACTIVE,
  USER_ROLE: ROLES.PESERTA,
  THEME: 'light',
  LANGUAGE: 'id'
}