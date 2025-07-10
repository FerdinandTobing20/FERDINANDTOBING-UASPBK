<template>
  <div class="sidebar-wrapper">
    <!-- Overlay for mobile -->
    <div
      v-if="isOpen && isMobile"
      class="sidebar-overlay"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'sidebar',
        { 'sidebar-open': isOpen },
        { 'sidebar-collapsed': isCollapsed && !isMobile }
      ]"
    >
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <div class="brand-icon">
            <slot name="brand-icon">
              <svg class="default-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </slot>
          </div>
          <h1 v-if="!isCollapsed || isMobile" class="brand-title">
            {{ brandName }}
          </h1>
        </div>
        
        <!-- Toggle Button -->
        <button
          v-if="!isMobile"
          class="collapse-btn"
          @click="toggleCollapse"
          :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <svg class="collapse-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <!-- Close Button for Mobile -->
        <button
          v-if="isMobile"
          class="close-btn"
          @click="closeSidebar"
          aria-label="Close sidebar"
        >
          <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- User Profile -->
      <div v-if="userProfile" class="sidebar-profile">
        <div class="profile-avatar">
          <img
            v-if="userProfile.avatar"
            :src="userProfile.avatar"
            :alt="userProfile.name"
            class="avatar-img"
          />
          <div v-else class="avatar-placeholder">
            {{ getInitials(userProfile.name) }}
          </div>
        </div>
        <div v-if="!isCollapsed || isMobile" class="profile-info">
          <p class="profile-name">{{ userProfile.name }}</p>
          <p class="profile-role">{{ userProfile.role }}</p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li
            v-for="item in menuItems"
            :key="item.id"
            class="nav-item"
          >
            <!-- Single Menu Item -->
            <router-link
              v-if="!item.children"
              :to="item.path"
              :class="[
                'nav-link',
                { 'nav-link-active': isActiveRoute(item.path) }
              ]"
              @click="handleMenuClick(item)"
            >
              <component
                v-if="item.icon"
                :is="item.icon"
                class="nav-icon"
              />
              <span v-if="!isCollapsed || isMobile" class="nav-text">
                {{ item.label }}
              </span>
              <span
                v-if="item.badge && (!isCollapsed || isMobile)"
                class="nav-badge"
              >
                {{ item.badge }}
              </span>
            </router-link>

            <!-- Menu Item with Children -->
            <div v-else class="nav-group">
              <button
                :class="[
                  'nav-link nav-link-group',
                  { 'nav-link-active': isActiveGroup(item) }
                ]"
                @click="toggleGroup(item.id)"
              >
                <component
                  v-if="item.icon"
                  :is="item.icon"
                  class="nav-icon"
                />
                <span v-if="!isCollapsed || isMobile" class="nav-text">
                  {{ item.label }}
                </span>
                <svg
                  v-if="!isCollapsed || isMobile"
                  :class="[
                    'nav-arrow',
                    { 'nav-arrow-expanded': expandedGroups.includes(item.id) }
                  ]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>

              <!-- Submenu -->
              <ul
                v-if="expandedGroups.includes(item.id) && (!isCollapsed || isMobile)"
                class="nav-submenu"
              >
                <li
                  v-for="child in item.children"
                  :key="child.id"
                  class="nav-item"
                >
                  <router-link
                    :to="child.path"
                    :class="[
                      'nav-link nav-link-child',
                      { 'nav-link-active': isActiveRoute(child.path) }
                    ]"
                    @click="handleMenuClick(child)"
                  >
                    <component
                      v-if="child.icon"
                      :is="child.icon"
                      class="nav-icon"
                    />
                    <span class="nav-text">{{ child.label }}</span>
                    <span
                      v-if="child.badge"
                      class="nav-badge"
                    >
                      {{ child.badge }}
                    </span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <div v-if="footerItems.length > 0" class="footer-items">
          <button
            v-for="item in footerItems"
            :key="item.id"
            class="footer-item"
            @click="handleFooterClick(item)"
            :title="item.label"
          >
            <component
              v-if="item.icon"
              :is="item.icon"
              class="footer-icon"
            />
            <span v-if="!isCollapsed || isMobile" class="footer-text">
              {{ item.label }}
            </span>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// Props
const props = defineProps({
  brandName: {
    type: String,
    default: 'App Name'
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  menuItems: {
    type: Array,
    default: () => [
      {
        id: 1,
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'DashboardIcon'
      },
      {
        id: 2,
        label: 'Users',
        path: '/users',
        icon: 'UsersIcon',
        badge: '5'
      },
      {
        id: 3,
        label: 'Products',
        icon: 'ProductsIcon',
        children: [
          { id: 31, label: 'All Products', path: '/products' },
          { id: 32, label: 'Add Product', path: '/products/add' },
          { id: 33, label: 'Categories', path: '/products/categories' }
        ]
      },
      {
        id: 4,
        label: 'Orders',
        path: '/orders',
        icon: 'OrdersIcon'
      },
      {
        id: 5,
        label: 'Settings',
        path: '/settings',
        icon: 'SettingsIcon'
      }
    ]
  },
  userProfile: {
    type: Object,
    default: () => ({
      name: 'John Doe',
      role: 'Administrator',
      avatar: ''
    })
  },
  footerItems: {
    type: Array,
    default: () => [
      { id: 1, label: 'Settings', icon: 'SettingsIcon' },
      { id: 2, label: 'Help', icon: 'HelpIcon' },
      { id: 3, label: 'Logout', icon: 'LogoutIcon' }
    ]
  }
})

// Emits
const emit = defineEmits([
  'update:isOpen',
  'toggle-collapse',
  'menu-click',
  'footer-click'
])

// Reactive data
const isCollapsed = ref(false)
const expandedGroups = ref([])
const isMobile = ref(false)

// Composables
const route = useRoute()

// Computed
const currentRoute = computed(() => route.path)

// Methods
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const closeSidebar = () => {
  emit('update:isOpen', false)
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle-collapse', isCollapsed.value)
  
  // Close all expanded groups when collapsing
  if (isCollapsed.value) {
    expandedGroups.value = []
  }
}

const toggleGroup = (groupId) => {
  const index = expandedGroups.value.indexOf(groupId)
  if (index > -1) {
    expandedGroups.value.splice(index, 1)
  } else {
    expandedGroups.value.push(groupId)
  }
}

const isActiveRoute = (path) => {
  return currentRoute.value === path || currentRoute.value.startsWith(path + '/')
}

const isActiveGroup = (group) => {
  return group.children?.some(child => isActiveRoute(child.path))
}

const handleMenuClick = (item) => {
  emit('menu-click', item)
  if (isMobile.value) {
    closeSidebar()
  }
}

const handleFooterClick = (item) => {
  emit('footer-click', item)
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Lifecycle
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  // Auto-expand active groups
  props.menuItems.forEach(item => {
    if (item.children && isActiveGroup(item)) {
      expandedGroups.value.push(item.id)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Watchers
watch(() => props.isOpen, (newVal) => {
  if (newVal && isCollapsed.value && !isMobile.value) {
    isCollapsed.value = false
  }
})
</script>

<style scoped>
.sidebar-wrapper {
  position: relative;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  transform: translateX(-100%);
  transition: transform 0.3s ease, width 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 2rem;
  height: 2rem;
  color: #3b82f6;
  flex-shrink: 0;
}

.default-icon {
  width: 100%;
  height: 100%;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  white-space: nowrap;
}

.collapse-btn,
.close-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.collapse-btn:hover,
.close-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.collapse-icon,
.close-icon {
  width: 1rem;
  height: 1rem;
  stroke-width: 2;
}

.sidebar-profile {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.profile-avatar {
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
}

.profile-info {
  min-width: 0;
  flex: 1;
}

.profile-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-role {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  gap: 0.75rem;
}

.nav-link:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.nav-link-active {
  background-color: #eff6ff;
  color: #3b82f6;
  border-right: 3px solid #3b82f6;
}

.nav-link-group {
  justify-content: space-between;
}

.nav-link-child {
  padding-left: 2.5rem;
  font-size: 0.875rem;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-badge {
  background-color: #3b82f6;
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
}

.nav-arrow {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s;
  stroke-width: 2;
}

.nav-arrow-expanded {
  transform: rotate(90deg);
}

.nav-submenu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}

.footer-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;
  gap: 0.75rem;
}

.footer-item:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.footer-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.footer-text {
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Mobile responsive */
@media (min-width: 768px) {
  .sidebar {
    position: relative;
    transform: translateX(0);
    height: 100vh;
  }
}

/* Scrollbar styling */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>