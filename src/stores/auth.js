import { defineStore } from 'pinia'
import { authService } from '@/services/authService'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role || null
  },
  
  actions: {
    async login(credentials) {
      try {
        const response = await authService.login(credentials)
        this.user = response.user
        this.token = response.token
        localStorage.setItem('token', response.token)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      router.push('/')
    }
  }
})