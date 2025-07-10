import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/event',
    name: 'event-list',
    component: () => import('@/views/event/EventListView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/event/tambah',
    name: 'event-create',
    component: () => import('@/views/event/EventCreateView.vue'),
    meta: { requiresAuth: true, requiresRole: ['admin'] }
  },
  {
    path: '/event/edit/:id',
    name: 'event-edit',
    component: () => import('@/views/event/EventEditView.vue'),
    meta: { requiresAuth: true, requiresRole: ['admin'] }
  },
  {
    path: '/event/:id',
    name: 'event-detail',
    component: () => import('@/views/event/EventDetailView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pendaftaran',
    name: 'registration',
    component: () => import('@/views/RegistrationView.vue'),
    meta: { requiresAuth: true, requiresRole: ['peserta'] }
  },
  {
    path: '/verifikasi',
    name: 'verification',
    component: () => import('@/views/VerificationView.vue'),
    meta: { requiresAuth: true, requiresRole: ['panitia'] }
  },
  {
    path: '/laporan',
    name: 'report',
    component: () => import('@/views/ReportView.vue'),
    meta: { requiresAuth: true, requiresRole: ['admin'] }
  },
  {
    path: '/profil',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Allow access to landing and login pages without auth
  if (to.meta.requiresAuth === false) {
    next()
    return
  }
  
  // Check authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Check role requirements
  if (to.meta.requiresRole && !to.meta.requiresRole.includes(authStore.user?.role)) {
    next('/dashboard')
    return
  }
  
  next()
})

export default router