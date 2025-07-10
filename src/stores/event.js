import { defineStore } from 'pinia'
import { eventService } from '@/services/eventService'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
    currentEvent: null,
    loading: false,
    error: null
  }),
  
  getters: {
    activeEvents: (state) => state.events.filter(e => e.status === 'active'),
    eventById: (state) => (id) => state.events.find(e => e.id === id)
  },
  
  actions: {
    async fetchEvents() {
      this.loading = true
      try {
        this.events = await eventService.getAll()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async createEvent(eventData) {
      try {
        const newEvent = await eventService.create(eventData)
        this.events.push(newEvent)
        return { success: true, data: newEvent }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    
    async updateEvent(id, eventData) {
      try {
        const updatedEvent = await eventService.update(id, eventData)
        const index = this.events.findIndex(e => e.id === id)
        if (index !== -1) {
          this.events[index] = updatedEvent
        }
        return { success: true, data: updatedEvent }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    
    async deleteEvent(id) {
      try {
        await eventService.delete(id)
        this.events = this.events.filter(e => e.id !== id)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }
  }
})