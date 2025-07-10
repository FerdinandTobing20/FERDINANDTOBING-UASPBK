<template>
  <div class="landing-page">
    <!-- Navigation -->
    <nav class="landing-nav">
      <div class="nav-container">
        <div class="logo">
          <img src="/logo.png" alt="Eventure Logo" class="logo-img">
          <h2>Eventure</h2>
        </div>
        <div class="nav-links desktop-nav">
          <a href="#features">Fitur</a>
          <a href="#about">Tentang</a>
          <a href="#contact">Kontak</a>
          <RouterLink to="/login" class="login-btn">
            <span>Login</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3h6v6M10 14L21 3M21 10v11h-11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <!-- Mobile Menu -->
      <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
        <a href="#features" @click="closeMobileMenu">Fitur</a>
        <a href="#about" @click="closeMobileMenu">Tentang</a>
        <a href="#contact" @click="closeMobileMenu">Kontak</a>
        <RouterLink to="/login" class="login-btn-mobile">Login</RouterLink>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-badge">
            <span class="badge-icon">🚀</span>
            <span>Platform Event Management #1 di Indonesia</span>
          </div>
          <h1 class="hero-title">
            Kelola Event Anda dengan <span class="highlight">Eventure</span>
          </h1>
          <p class="hero-description">
            Platform manajemen event terlengkap untuk mengelola acara, peserta, dan laporan dalam satu sistem terintegrasi
          </p>
          <div class="hero-buttons">
            <RouterLink to="/login" class="btn-primary-hero">
              <span>Mulai Sekarang</span>
              <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
            <a href="#features" class="btn-secondary-hero">
              <span>Pelajari Lebih Lanjut</span>
            </a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <h4>100+</h4>
              <p>Event Aktif</p>
            </div>
            <div class="hero-stat">
              <h4>5k+</h4>
              <p>Pengguna</p>
            </div>
            <div class="hero-stat">
              <h4>98%</h4>
              <p>Kepuasan</p>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="dashboard-preview">
            <div class="preview-header">
              <div class="preview-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
            <div class="preview-content">
              <div class="floating-element element-1">
                <div class="icon">📅</div>
                <span>Event Management</span>
              </div>
              <div class="floating-element element-2">
                <div class="icon">👥</div>
                <span>Peserta Tracking</span>
              </div>
              <div class="floating-element element-3">
                <div class="icon">📊</div>
                <span>Real-time Analytics</span>
              </div>
              <div class="floating-element element-4">
                <div class="icon">✅</div>
                <span>Instant Verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">FITUR</span>
          <h2 class="section-title">Fitur Unggulan Eventure</h2>
          <p class="section-subtitle">
            Semua yang Anda butuhkan untuk mengelola event dengan efisien
          </p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">👤</div>
            </div>
            <h3>Multi-Role System</h3>
            <p>Tiga role berbeda: Admin, Panitia, dan Peserta dengan akses yang disesuaikan</p>
            <div class="feature-link">
              <span>Pelajari lebih lanjut</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div class="feature-card featured">
            <div class="feature-badge">POPULER</div>
            <div class="feature-icon-wrapper">
              <div class="feature-icon">📅</div>
            </div>
            <h3>Manajemen Event</h3>
            <p>Buat, edit, dan kelola event dengan mudah melalui dashboard intuitif</p>
            <div class="feature-link">
              <span>Pelajari lebih lanjut</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">📝</div>
            </div>
            <h3>Registrasi Online</h3>
            <p>Peserta dapat mendaftar event secara online dengan proses yang simpel</p>
            <div class="feature-link">
              <span>Pelajari lebih lanjut</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">✅</div>
            </div>
            <h3>Verifikasi Digital</h3>
            <p>Panitia dapat memverifikasi kehadiran peserta secara real-time</p>
            <div class="feature-link">
              <span>Pelajari lebih lanjut</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">📊</div>
            </div>
            <h3>Laporan Lengkap</h3>
            <p>Generate laporan event dengan statistik lengkap dan export ke CSV</p>
            <div class="feature-link">
              <span>Pelajari lebih lanjut</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">🔒</div>
            </div>
            <h3>Keamanan Terjamin</h3>
            <p>Sistem autentikasi yang aman dengan akses berbasis role</p>
            <div class="feature-link">
              <span>Pelajari lebih lanjut</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">CARA KERJA</span>
          <h2 class="section-title">Bagaimana Cara Kerjanya?</h2>
        </div>
        
        <div class="roles-showcase">
          <div class="role-card admin-role">
            <div class="role-header">
              <div class="role-icon">👨‍💼</div>
              <h3>Untuk Admin</h3>
            </div>
            <div class="role-steps">
              <div class="step">
                <span class="step-number">1</span>
                <div class="step-content">
                  <h4>Login sebagai Admin</h4>
                  <p>Akses dashboard lengkap</p>
                </div>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <div class="step-content">
                  <h4>Buat event baru</h4>
                  <p>Setup detail acara</p>
                </div>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <div class="step-content">
                  <h4>Kelola peserta</h4>
                  <p>Monitor registrasi</p>
                </div>
              </div>
              <div class="step">
                <span class="step-number">4</span>
                <div class="step-content">
                  <h4>Generate laporan</h4>
                  <p>Analisa performa event</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="role-card panitia-role">
            <div class="role-header">
              <div class="role-icon">👨‍🏫</div>
              <h3>Untuk Panitia</h3>
            </div>
            <div class="role-steps">
              <div class="step">
                <span class="step-number">1</span>
                <div class="step-content">
                  <h4>Login sebagai Panitia</h4>
                  <p>Akses tools verifikasi</p>
                </div>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <div class="step-content">
                  <h4>Pilih event</h4>
                  <p>Lihat event yang ditugaskan</p>
                </div>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <div class="step-content">
                  <h4>Verifikasi peserta</h4>
                  <p>Scan QR atau manual</p>
                </div>
              </div>
              <div class="step">
                <span class="step-number">4</span>
                <div class="step-content">
                  <h4>Lihat statistik</h4>
                  <p>Monitor kehadiran real-time</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="role-card peserta-role">
            <div class="role-header">
              <div class="role-icon">👥</div>
              <h3>Untuk Peserta</h3>
            </div>
            <div class="role-steps">
              <div class="step">
                <span class="step-number">1</span>
                <div class="step-content">
                  <h4>Login sebagai Peserta</h4>
                  <p>Atau daftar akun baru</p>
                </div>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <div class="step-content">
                  <h4>Lihat event tersedia</h4>
                  <p>Browse katalog event</p>
                </div>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <div class="step-content">
                  <h4>Daftar event</h4>
                  <p>Isi form pendaftaran</p>
                </div>
              </div>
              <div class="step">
                <span class="step-number">4</span>
                <div class="step-content">
                  <h4>Cek status</h4>
                  <p>Lihat tiket & QR code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <span class="section-badge">TENTANG KAMI</span>
            <h2>Platform Event Management Terpercaya</h2>
            <p>
              Eventure adalah platform manajemen event modern yang dirancang untuk 
              memudahkan pengelolaan acara dari skala kecil hingga besar. Dengan 
              fitur lengkap dan antarmuka yang user-friendly, Eventure membantu 
              Anda fokus pada kesuksesan event Anda.
            </p>
            <div class="about-features">
              <div class="about-feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Setup event dalam hitungan menit</span>
              </div>
              <div class="about-feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Dashboard analytics real-time</span>
              </div>
              <div class="about-feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Support 24/7 siap membantu</span>
              </div>
            </div>
            <div class="stats">
              <div class="stat">
                <h3>100+</h3>
                <p>Event Terkelola</p>
              </div>
              <div class="stat">
                <h3>5000+</h3>
                <p>Peserta Terdaftar</p>
              </div>
              <div class="stat">
                <h3>98%</h3>
                <p>Kepuasan Pengguna</p>
              </div>
            </div>
          </div>
          <div class="about-visual">
            <div class="visual-container">
              <div class="visual-card card-1">
                <div class="card-icon">🎯</div>
                <h4>Misi Kami</h4>
                <p>Membuat event management jadi mudah dan menyenangkan</p>
              </div>
              <div class="visual-card card-2">
                <div class="card-icon">💡</div>
                <h4>Visi Kami</h4>
                <p>Menjadi platform event #1 di Indonesia</p>
              </div>
              <div class="visual-card card-3">
                <div class="card-icon">🌟</div>
                <h4>Nilai Kami</h4>
                <p>Inovasi, kualitas, dan kepuasan pelanggan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Siap Mengelola Event Anda?</h2>
          <p>Bergabunglah dengan ribuan pengguna yang telah mempercayai Eventure</p>
          <div class="cta-buttons">
            <RouterLink to="/login" class="cta-button primary">
              <span>Login Sekarang</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
            <a href="#contact" class="cta-button secondary">
              <span>Hubungi Kami</span>
            </a>
          </div>
        </div>
        <div class="cta-visual">
          <div class="cta-card">
            <div class="cta-icon">🎉</div>
            <h3>Event Sukses</h3>
            <p>100+ event berhasil dikelola</p>
          </div>
          <div class="cta-card">
            <div class="cta-icon">⚡</div>
            <h3>Setup Cepat</h3>
            <p>Mulai dalam 5 menit</p>
          </div>
          <div class="cta-card">
            <div class="cta-icon">💎</div>
            <h3>Fitur Premium</h3>
            <p>Akses semua fitur lengkap</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contact" class="landing-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section footer-brand">
            <div class="footer-logo">
              <img src="/logo.png" alt="Eventure Logo" class="footer-logo-img">
              <h3>Eventure</h3>
            </div>
            <p>Platform manajemen event terpercaya untuk semua kebutuhan acara Anda.</p>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <a href="#features">Fitur</a>
            <a href="#about">Tentang</a>
            <a href="#contact">Kontak</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div class="footer-section">
            <h4>Layanan</h4>
            <a href="#">Event Management</a>
            <a href="#">Ticketing System</a>
            <a href="#">Analytics Dashboard</a>
            <a href="#">API Documentation</a>
          </div>
          <div class="footer-section">
            <h4>Kontak</h4>
            <div class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p>Jl. Sudirman No. 123, Jakarta</p>
            </div>
            <div class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p>info@eventure.com</p>
            </div>
            <div class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p>(021) 1234-5678</p>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Eventure. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Mobile menu state
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Smooth scroll for anchor links
const smoothScroll = (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
    e.preventDefault()
    const targetId = e.target.getAttribute('href')
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Parallax effect for hero section
const handleScroll = () => {
  const scrolled = window.pageYOffset
  const orbs = document.querySelectorAll('.gradient-orb')
  const floatingElements = document.querySelectorAll('.floating-element')
  
  orbs.forEach((orb, index) => {
    const speed = 0.5 + (index * 0.1)
    orb.style.transform = `translateY(${scrolled * speed}px)`
  })
  
  floatingElements.forEach((element, index) => {
    const speed = 0.3 + (index * 0.1)
    element.style.transform = `translateY(${-scrolled * speed}px)`
  })
}

onMounted(() => {
  document.addEventListener('click', smoothScroll)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', smoothScroll)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Modern Variables */
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  --dark: #0f172a;
  --dark-light: #1e293b;
  --gray: #64748b;
  --gray-light: #94a3b8;
  --white: #ffffff;
  --bg-light: #f8fafc;
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --gradient-dark: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* Reset and Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing-page {
  min-height: 100vh;
  background-color: var(--white);
  overflow-x: hidden;
}

/* Navigation */
.landing-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.logo h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-links a {
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:not(.login-btn)::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s ease;
}

.nav-links a:not(.login-btn):hover::after {
  width: 100%;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--gradient-primary);
  color: white !important;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.login-btn svg {
  transition: transform 0.3s ease;
}

.login-btn:hover svg {
  transform: translate(3px, -3px);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-menu-btn span {
  display: block;
  width: 25px;
  height: 3px;
  background: var(--dark);
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-lg);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu.active {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-menu a {
  display: block;
  padding: 0.75rem 0;
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.mobile-menu a:hover {
  color: var(--primary);
}

.login-btn-mobile {
  margin-top: 1rem;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--gradient-primary);
  color: white !important;
  border-radius: 50px;
  text-align: center;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 2rem 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: var(--gradient-primary);
  top: -300px;
  right: -200px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
  bottom: -200px;
  left: -100px;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 50px;
  font-size: 0.875rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.badge-icon {
  font-size: 1rem;
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--dark);
  font-weight: 800;
}

.highlight {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn-primary-hero,
.btn-secondary-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary-hero {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
}

.btn-primary-hero:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 30px rgba(99, 102, 241, 0.4);
}

.btn-primary-hero .btn-icon {
  transition: transform 0.3s ease;
}

.btn-primary-hero:hover .btn-icon {
  transform: translateX(3px);
}

.btn-secondary-hero {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  border: 2px solid transparent;
}

.btn-secondary-hero:hover {
  background: rgba(99, 102, 241, 0.15);
  border-color: var(--primary);
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.hero-stat h4 {
  font-size: 2rem;
  color: var(--dark);
  margin-bottom: 0.25rem;
}

.hero-stat p {
  color: var(--gray);
  font-size: 0.875rem;
}

/* Hero Visual */
.hero-visual {
  position: relative;
}

.dashboard-preview {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: perspective(1000px) rotateY(-15deg);
}

.preview-header {
  background: var(--bg-light);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.preview-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--gray-light);
}

.dot:first-child {
  background: #ef4444;
}

.dot:nth-child(2) {
  background: #f59e0b;
}

.dot:last-child {
  background: #10b981;
}

.preview-content {
  padding: 2rem;
  height: 400px;
  position: relative;
}

.floating-element {
  position: absolute;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.floating-element:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.floating-element .icon {
  font-size: 1.5rem;
}

.element-1 {
  top: 20px;
  left: 20px;
  animation: float 3s ease-in-out infinite;
}

.element-2 {
  top: 80px;
  right: 40px;
  animation: float 3s ease-in-out infinite 0.5s;
}

.element-3 {
  bottom: 120px;
  left: 60px;
  animation: float 3s ease-in-out infinite 1s;
}

.element-4 {
  bottom: 40px;
  right: 20px;
  animation: float 3s ease-in-out infinite 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Features Section */
.features {
  padding: 100px 2rem;
  background: var(--bg-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 50px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.5rem;
  color: var(--dark);
  margin-bottom: 1rem;
  font-weight: 800;
}

.section-subtitle {
  color: var(--gray);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.feature-card {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(99, 102, 241, 0.2);
}

.feature-card.featured {
  background: var(--gradient-primary);
  color: white;
}

.feature-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: var(--accent);
  color: white;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 50px;
}

.feature-icon-wrapper {
  width: 60px;
  height: 60px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-card.featured .feature-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
}

.feature-icon {
  font-size: 1.75rem;
}

.feature-card h3 {
  color: var(--dark);
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.feature-card.featured h3 {
  color: white;
}

.feature-card p {
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.feature-card.featured p {
  color: rgba(255, 255, 255, 0.9);
}

.feature-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-weight: 500;
  font-size: 0.875rem;
}

.feature-card.featured .feature-link {
  color: white;
}

.feature-link svg {
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-link svg {
  transform: translateX(3px);
}

/* How It Works */
.how-it-works {
  padding: 100px 2rem;
  background: white;
}

.roles-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.role-card {
  background: var(--bg-light);
  padding: 2rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.role-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.role-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.role-icon {
  font-size: 2rem;
}

.role-card h3 {
  color: var(--dark);
  font-size: 1.5rem;
  margin: 0;
}

.admin-role {
  border-top: 4px solid #ef4444;
}

.panitia-role {
  border-top: 4px solid #f59e0b;
}

.peserta-role {
  border-top: 4px solid #10b981;
}

.role-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--gradient-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.step-content h4 {
  color: var(--dark);
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.step-content p {
  color: var(--gray);
  font-size: 0.875rem;
  margin: 0;
}

/* About Section */
.about {
  padding: 100px 2rem;
  background: var(--bg-light);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text h2 {
  color: var(--dark);
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-weight: 800;
}

.about-text p {
  color: var(--gray);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.about-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.about-feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.about-feature svg {
  color: var(--primary);
  flex-shrink: 0;
}

.about-feature span {
  color: var(--dark);
}

.stats {
  display: flex;
  gap: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.stat h3 {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-weight: 800;
}

.stat p {
  color: var(--gray);
  margin: 0;
}

.visual-container {
  display: grid;
  gap: 1.5rem;
}

.visual-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.visual-card:hover {
  transform: translateX(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.card-1 {
  animation: slideIn 0.6s ease-out;
}

.card-2 {
  animation: slideIn 0.6s ease-out 0.2s backwards;
}

.card-3 {
  animation: slideIn 0.6s ease-out 0.4s backwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.visual-card h4 {
  color: var(--dark);
  margin-bottom: 0.5rem;
}

.visual-card p {
  color: var(--gray);
  font-size: 0.875rem;
  margin: 0;
}

/* CTA Section */
.cta {
  padding: 100px 2rem;
  background: var(--gradient-primary);
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.cta-content {
  position: relative;
  text-align: center;
  color: white;
  margin-bottom: 3rem;
}

.cta-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.cta-content p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background: white;
  color: var(--primary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.15);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: white;
}

.cta-visual {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.cta-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.cta-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.cta-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.cta-card p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.875rem;
}

/* Footer */
.landing-footer {
  background: var(--dark);
  color: white;
  padding: 80px 2rem 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.footer-logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.footer-logo h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
}

.footer-brand p {
  color: var(--gray-light);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--primary);
  transform: translateY(-3px);
}

.social-link svg {
  color: white;
}

.footer-section h4 {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
}

.footer-section a {
  display: block;
  color: var(--gray-light);
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
}

.footer-section a:hover {
  color: white;
  transform: translateX(5px);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.contact-item svg {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-item p {
  color: var(--gray-light);
  margin: 0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: var(--gray-light);
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: var(--gray-light);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

/* Scroll Animations */
.hero-text > * {
  animation: fadeInUp 0.8s ease-out backwards;
}

.hero-badge {
  animation-delay: 0.1s;
}

.hero-title {
  animation-delay: 0.2s;
}

.hero-description {
  animation-delay: 0.3s;
}

.hero-buttons {
  animation-delay: 0.4s;
}

.hero-stats {
  animation-delay: 0.5s;
}

/* Loading States */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-light);
}

::-webkit-scrollbar-thumb {
  background: var(--gradient-primary);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark);
}

/* Selection */
::selection {
  background: var(--primary);
  color: white;
}

/* Focus States */
a:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}

/* Utilities */
.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.shadow-primary {
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Dark Mode Support (Optional) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-light: #1e293b;
    --white: #0f172a;
    --dark: #f8fafc;
    --gray: #cbd5e1;
    --gray-light: #94a3b8;
  }
  
  .landing-nav {
    background: rgba(15, 23, 42, 0.8);
  }
  
  .feature-card,
  .visual-card {
    background: var(--dark-light);
  }
  
  .mobile-menu {
    background: var(--dark);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-visual {
    display: none;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .visual-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cta-visual {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .hero {
    min-height: auto;
    padding: 100px 1.5rem 60px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.125rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid,
  .roles-showcase {
    grid-template-columns: 1fr;
  }
  
  .stats {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    text-align: center;
  }
  
  .about-features {
    margin-bottom: 2rem;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .footer-content {
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 1rem;
  }
  
  .logo h2 {
    font-size: 1.25rem;
  }
  
  .hero {
    padding: 100px 1rem 60px;
  }
  
  .hero-badge {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
  
  .hero-title {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-primary-hero,
  .btn-secondary-hero {
    width: 100%;
    justify-content: center;
  }
  
  .hero-stats {
    gap: 2rem;
  }
  
  .hero-stat h4 {
    font-size: 1.5rem;
  }
  
  .section-header {
    margin-bottom: 3rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .features-grid {
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .role-card {
    padding: 1.5rem;
  }
  
  .role-header {
    flex-direction: column;
    text-align: center;
  }
  
  .step {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  
  .about-text h2 {
    font-size: 2rem;
  }
  
  .visual-card {
    padding: 1.25rem;
  }
  
  .cta {
    padding: 60px 1rem;
  }
  
  .cta-content h2 {
    font-size: 1.75rem;
  }
  
  .cta-content p {
    font-size: 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .footer-section {
    text-align: center;
  }
  
  .footer-brand {
    text-align: center;
  }
  
  .footer-logo {
    justify-content: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .contact-item {
    justify-content: center;
  }
}

/* Print Styles */
@media print {
  .landing-nav,
  .cta,
  .footer-links,
  .social-links {
    display: none;
  }
  
  .hero,
  .features,
  .how-it-works,
  .about {
    page-break-inside: avoid;
  }
  
  * {
    color: black !important;
    background: white !important;
  }
}

/* Accessibility */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .feature-card,
  .role-card,
  .visual-card {
    border: 2px solid currentColor;
  }
  
  .btn-primary-hero,
  .login-btn,
  .cta-button.primary {
    border: 2px solid currentColor;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .floating-element,
  .gradient-orb {
    animation: none;
  }
}

/* Additional Hover Effects */
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  opacity: 0;
  border-radius: inherit;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.feature-card:hover::before {
  opacity: 0.05;
}

/* Gradient Text Animation */
.hero-title .highlight {
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
}

/* Button Ripple Effect */
.btn-primary-hero,
.cta-button {
  position: relative;
  overflow: hidden;
}

.btn-primary-hero::after,
.cta-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-primary-hero:active::after,
.cta-button:active::after {
  width: 300px;
  height: 300px;
}

/* Card Tilt Effect */
.feature-card,
.visual-card {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.feature-card:hover,
.visual-card:hover {
  transform: translateY(-5px) rotateX(-5deg) rotateY(5deg);
}

/* Navigation Scroll Effect */
.landing-nav.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Mobile Menu Animation */
.mobile-menu-btn.active span:first-child {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:last-child {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Performance Optimizations */
.gradient-orb,
.floating-element {
  will-change: transform;
}

.feature-card,
.role-card,
.visual-card {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Final Touch - Smooth Page Load */
.landing-page {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>