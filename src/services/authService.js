import api from './api'

export const authService = {
  async login(credentials) {
    // Simulasi login dengan JSON Server
    const { data: users } = await api.get('/users', {
      params: {
        username: credentials.username,
        password: credentials.password
      }
    })
    
    if (users.length > 0) {
      const user = users[0]
      // Generate fake token
      const token = btoa(`${user.username}:${Date.now()}`)
      return { user, token }
    } else {
      throw new Error('Username atau password salah')
    }
  }
}