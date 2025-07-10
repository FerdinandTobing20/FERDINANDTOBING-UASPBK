<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-content">
        <!-- Company Info -->
        <div class="footer-section">
          <h3 class="footer-title">{{ companyName }}</h3>
          <p class="footer-description">
            {{ companyDescription }}
          </p>
          <div class="social-links">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="social.icon" class="social-icon" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li v-for="link in quickLinks" :key="link.name">
              <router-link :to="link.path" class="footer-link">
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-section">
          <h4 class="footer-heading">Services</h4>
          <ul class="footer-links">
            <li v-for="service in services" :key="service.name">
              <router-link :to="service.path" class="footer-link">
                {{ service.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div class="footer-section">
          <h4 class="footer-heading">Support</h4>
          <ul class="footer-links">
            <li v-for="support in supportLinks" :key="support.name">
              <router-link :to="support.path" class="footer-link">
                {{ support.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="footer-section">
          <h4 class="footer-heading">Newsletter</h4>
          <p class="newsletter-text">
            Subscribe to receive updates and news.
          </p>
          <form @submit.prevent="handleSubscribe" class="newsletter-form">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="newsletter-input"
              required
            />
            <button type="submit" class="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © {{ currentYear }} {{ companyName }}. All rights reserved.
          </p>
          <div class="footer-bottom-links">
            <router-link to="/privacy" class="footer-bottom-link">
              Privacy Policy
            </router-link>
            <router-link to="/terms" class="footer-bottom-link">
              Terms of Service
            </router-link>
            <router-link to="/cookies" class="footer-bottom-link">
              Cookie Policy
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  companyName: {
    type: String,
    default: 'Your Company'
  },
  companyDescription: {
    type: String,
    default: 'Building amazing digital experiences for the modern world.'
  },
  quickLinks: {
    type: Array,
    default: () => [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Contact', path: '/contact' }
    ]
  },
  services: {
    type: Array,
    default: () => [
      { name: 'Web Development', path: '/services/web' },
      { name: 'Mobile Apps', path: '/services/mobile' },
      { name: 'UI/UX Design', path: '/services/design' },
      { name: 'Consulting', path: '/services/consulting' }
    ]
  },
  supportLinks: {
    type: Array,
    default: () => [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Support', path: '/support' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Documentation', path: '/docs' }
    ]
  },
  socialLinks: {
    type: Array,
    default: () => [
      { name: 'Facebook', url: 'https://facebook.com', icon: 'FacebookIcon' },
      { name: 'Twitter', url: 'https://twitter.com', icon: 'TwitterIcon' },
      { name: 'Instagram', url: 'https://instagram.com', icon: 'InstagramIcon' },
      { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'LinkedInIcon' }
    ]
  }
})

// Emits
const emit = defineEmits(['subscribe'])

// Reactive data
const email = ref('')

// Computed
const currentYear = computed(() => new Date().getFullYear())

// Methods
const handleSubscribe = () => {
  if (email.value) {
    emit('subscribe', email.value)
    email.value = ''
  }
}
</script>

<style scoped>
.app-footer {
  background-color: #1f2937;
  color: #e5e7eb;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 3rem 0;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.footer-description {
  color: #9ca3af;
  line-height: 1.6;
  margin: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #3b82f6;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #374151;
  color: #9ca3af;
  border-radius: 50%;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.social-link:hover {
  background-color: #3b82f6;
  color: #ffffff;
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.newsletter-text {
  color: #9ca3af;
  margin: 0;
  font-size: 0.875rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  background-color: #374151;
  color: #ffffff;
  font-size: 0.875rem;
}

.newsletter-input::placeholder {
  color: #9ca3af;
}

.newsletter-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.newsletter-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.newsletter-button:hover {
  background-color: #2563eb;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
}

.footer-bottom-link {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.footer-bottom-link:hover {
  color: #3b82f6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-bottom-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
}
</style>