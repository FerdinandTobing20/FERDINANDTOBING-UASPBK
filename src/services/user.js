import api from './api'

export const userService = {
  async getAll() {
    const { data } = await api.get('/users')
    return data
  },
  
  async getById(id) {
    const { data } = await api.get(`/users/${id}`)
    return data
  },
  
  async getByRole(role) {
    const { data } = await api.get('/users', {
      params: { role }
    })
    return data
  },
  
  async create(userData) {
    const { data } = await api.post('/users', {
      ...userData,
      createdAt: new Date().toISOString()
    })
    return data
  },
  
  async update(id, userData) {
    const { data } = await api.put(`/users/${id}`, {
      ...userData,
      updatedAt: new Date().toISOString()
    })
    return data
  },
  
  async updatePassword(id, currentPassword, newPassword) {
    // First verify current password
    const { data: user } = await api.get(`/users/${id}`)
    
    if (user.password !== currentPassword) {
      throw new Error('Password lama tidak sesuai')
    }
    
    // Update with new password
    const { data: updatedUser } = await api.patch(`/users/${id}`, {
      password: newPassword
    })
    
    return updatedUser
  },
  
  async delete(id) {
    await api.delete(`/users/${id}`)
  },
  
  async checkUsernameAvailability(username, excludeId = null) {
    const { data } = await api.get('/users', {
      params: { username }
    })
    
    const existingUsers = excludeId 
      ? data.filter(u => u.id !== excludeId)
      : data
      
    return existingUsers.length === 0
  },
  
  async checkEmailAvailability(email, excludeId = null) {
    const { data } = await api.get('/users', {
      params: { email }
    })
    
    const existingUsers = excludeId 
      ? data.filter(u => u.id !== excludeId)
      : data
      
    return existingUsers.length === 0
  }
}