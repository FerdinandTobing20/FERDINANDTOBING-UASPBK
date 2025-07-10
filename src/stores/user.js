import { defineStore } from 'pinia'
import api from '@/services/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(u => u.id === id)
    },
    
    getUsersByRole: (state) => (role) => {
      return state.users.filter(u => u.role === role)
    }
  },
  
  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const { data } = await api.get('/users')
        this.users = data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async updateUser(userId, userData) {
      try {
        const { data } = await api.put(`/users/${userId}`, userData)
        
        // Update local state
        const index = this.users.findIndex(u => u.id === userId)
        if (index !== -1) {
          this.users[index] = data
        }
        
        return { success: true, data }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }
  }
})