<template>
  <header class="app-header">
    <div class="header-container">
      <RouterLink to="/dashboard" class="logo">
        <h1>Eventure</h1>
      </RouterLink>
      
      <nav class="nav-menu">
        <RouterLink to="/dashboard" class="nav-link">
          Dashboard
        </RouterLink>
        <RouterLink to="/event" class="nav-link">
          Event
        </RouterLink>
        <RouterLink v-if="isPeserta" to="/pendaftaran" class="nav-link">
          Pendaftaran
        </RouterLink>
        <RouterLink v-if="isPanitia" to="/verifikasi" class="nav-link">
          Verifikasi
        </RouterLink>
        <RouterLink v-if="isAdmin" to="/laporan" class="nav-link">
          Laporan
        </RouterLink>
      </nav>
      
      <div class="user-menu">
        <RouterLink to="/profil" class="user-info">
          <span class="user-name">{{ user?.name }}</span>
          <span class="user-role">{{ user?.role }}</span>
        </RouterLink>
        <button @click="handleLogout" class="logout-btn">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ROLES } from '@/utils/constants'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const isAdmin = computed(() => authStore.userRole === ROLES.ADMIN)
const isPanitia = computed(() => authStore.userRole === ROLES.PANITIA)
const isPeserta = computed(() => authStore.userRole === ROLES.PESERTA)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  color: white;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white;
  text-decoration: none;
}

.user-name {
  font-weight: 600;
}

.user-role {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: capitalize;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>