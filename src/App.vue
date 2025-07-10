<template>
  <div id="app">
    <AppHeader v-if="isAuthenticated && !isLandingPage" />
    <main class="main-content" :class="{ 'no-padding': isLandingPage }">
      <RouterView />
    </main>
    <AppFooter v-if="isAuthenticated && !isLandingPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'

const route = useRoute()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isLandingPage = computed(() => route.name === 'landing')
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.main-content.no-padding {
  padding: 0;
  max-width: 100%;
}
</style>