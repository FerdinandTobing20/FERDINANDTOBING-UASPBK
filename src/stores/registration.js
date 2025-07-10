import { defineStore } from 'pinia'
import { registrationService } from '@/services/registrationService'

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    registrations: [],
    userRegistrations: [],
    loading: false,
    error: null
  }),
  
  getters: {
    registrationsByEvent: (state) => (eventId) => {
      return state.registrations.filter(r => r.eventId === eventId)
    },
    
    isUserRegistered: (state) => (eventId, userId) => {
      return state.userRegistrations.some(
        r => r.eventId === eventId && r.userId === userId
      )
    }
  },
  
  actions: {
    async fetchUserRegistrations(userId) {
      this.loading = true
      try {
        this.userRegistrations = await registrationService.getByUser(userId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async fetchEventRegistrations(eventId) {
      this.loading = true
      try {
        const registrations = await registrationService.getByEvent(eventId)
        this.registrations = registrations
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async registerForEvent(eventId, userId) {
      try {
        const registration = await registrationService.register(eventId, userId)
        this.userRegistrations.push(registration)
        return { success: true, data: registration }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    
    async updateAttendance(registrationId, attended) {
      try {
        const updated = await registrationService.updateAttendance(
          registrationId,
          attended
        )
        
        // Update local state
        const index = this.registrations.findIndex(r => r.id === registrationId)
        if (index !== -1) {
          this.registrations[index] = updated
        }
        
        return { success: true, data: updated }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }
  }
})