import api from './api'

export const eventService = {
  async getAll() {
    const { data } = await api.get('/events')
    return data
  },
  
  async getById(id) {
    const { data } = await api.get(`/events/${id}`)
    return data
  },
  
  async create(eventData) {
    const { data } = await api.post('/events', {
      ...eventData,
      createdAt: new Date().toISOString()
    })
    return data
  },
  
  async update(id, eventData) {
    const { data } = await api.put(`/events/${id}`, eventData)
    return data
  },
  
  async delete(id) {
    await api.delete(`/events/${id}`)
  }
}