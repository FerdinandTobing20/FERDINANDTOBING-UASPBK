import api from './api'

export const registrationService = {
  async register(eventId, userId) {
    const { data } = await api.post('/registrations', {
      eventId,
      userId,
      registrationDate: new Date().toISOString(),
      status: 'registered',
      attended: false
    })
    return data
  },
  
  async getByUser(userId) {
    const { data } = await api.get('/registrations', {
      params: { userId }
    })
    return data
  },
  
  async getByEvent(eventId) {
    const { data } = await api.get('/registrations', {
      params: { eventId }
    })
    return data
  },
  
  async updateAttendance(registrationId, attended) {
    const { data } = await api.patch(`/registrations/${registrationId}`, {
      attended
    })
    return data
  }
}