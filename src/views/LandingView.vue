<template>
  <div class="landing-page">
    <!-- Navigation -->
    <nav class="landing-nav">
      <div class="nav-container">
        <div class="logo">
          <h2>Eventure</h2>
        </div>
        <div class="nav-links">
          <a href="#features">Fitur</a>
          <a href="#about">Tentang</a>
          <a href="#contact">Kontak</a>
          <RouterLink to="/login" class="login-btn">Login</RouterLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Kelola Event Anda dengan <span class="highlight">Eventure</span>
        </h1>
        <p class="hero-description">
          Platform manajemen event terlengkap untuk mengelola acara, peserta, dan laporan dalam satu sistem terintegrasi
        </p>
        <div class="hero-buttons">
          <RouterLink to="/login" class="btn-primary-hero">
            Mulai Sekarang
          </RouterLink>
          <a href="#features" class="btn-secondary-hero">
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
      <div class="hero-image">
        <div class="hero-illustration">
          <div class="floating-card card-1">📅 Event</div>
          <div class="floating-card card-2">👥 Peserta</div>
          <div class="floating-card card-3">📊 Laporan</div>
          <div class="floating-card card-4">✅ Verifikasi</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <div class="container">
        <h2 class="section-title">Fitur Unggulan</h2>
        <p class="section-subtitle">
          Semua yang Anda butuhkan untuk mengelola event dengan efisien
        </p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">👤</div>
            <h3>Multi-Role System</h3>
            <p>Tiga role berbeda: Admin, Panitia, dan Peserta dengan akses yang disesuaikan</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📅</div>
            <h3>Manajemen Event</h3>
            <p>Buat, edit, dan kelola event dengan mudah melalui dashboard intuitif</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📝</div>
            <h3>Registrasi Online</h3>
            <p>Peserta dapat mendaftar event secara online dengan proses yang simpel</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">✅</div>
            <h3>Verifikasi Digital</h3>
            <p>Panitia dapat memverifikasi kehadiran peserta secara real-time</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Laporan Lengkap</h3>
            <p>Generate laporan event dengan statistik lengkap dan export ke CSV</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Keamanan Terjamin</h3>
            <p>Sistem autentikasi yang aman dengan akses berbasis role</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title">Bagaimana Cara Kerjanya?</h2>
        
        <div class="roles-showcase">
          <div class="role-card admin-role">
            <h3>Untuk Admin</h3>
            <div class="role-steps">
              <div class="step">
                <span class="step-number">1</span>
                <p>Login sebagai Admin</p>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <p>Buat event baru</p>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <p>Kelola peserta</p>
              </div>
              <div class="step">
                <span class="step-number">4</span>
                <p>Generate laporan</p>
              </div>
            </div>
          </div>
          
          <div class="role-card panitia-role">
            <h3>Untuk Panitia</h3>
            <div class="role-steps">
              <div class="step">
                <span class="step-number">1</span>
                <p>Login sebagai Panitia</p>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <p>Pilih event</p>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <p>Verifikasi peserta</p>
              </div>
              <div class="step">
                <span class="step-number">4</span>
                <p>Lihat statistik</p>
              </div>
            </div>
          </div>
          
          <div class="role-card peserta-role">
            <h3>Untuk Peserta</h3>
            <div class="role-steps">
              <div class="step">
                <span class="step-number">1</span>
                <p>Login sebagai Peserta</p>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <p>Lihat event tersedia</p>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <p>Daftar event</p>
              </div>
              <div class="step">
                <span class="step-number">4</span>
                <p>Cek status</p>
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
            <h2>Tentang Eventure</h2>
            <p>
              Eventure adalah platform manajemen event modern yang dirancang untuk 
              memudahkan pengelolaan acara dari skala kecil hingga besar. Dengan 
              fitur lengkap dan antarmuka yang user-friendly, Eventure membantu 
              Anda fokus pada kesuksesan event Anda.
            </p>
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
              <div class="feature-showcase">
                <div class="showcase-item">
                  <div class="showcase-icon">📱</div>
                  <span>Mobile Friendly</span>
                </div>
                <div class="showcase-item">
                  <div class="showcase-icon">⚡</div>
                  <span>Real-time Updates</span>
                </div>
                <div class="showcase-item">
                  <div class="showcase-icon">🎯</div>
                  <span>Easy to Use</span>
                </div>
                <div class="showcase-item">
                  <div class="showcase-icon">🔧</div>
                  <span>Customizable</span>
                </div>
              </div>
              <div class="visual-decoration">
                <div class="decoration-circle circle-1"></div>
                <div class="decoration-circle circle-2"></div>
                <div class="decoration-circle circle-3"></div>
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
          <RouterLink to="/login" class="cta-button">
            Login Sekarang
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contact" class="landing-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Eventure</h3>
            <p>Platform manajemen event terpercaya untuk semua kebutuhan acara Anda.</p>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <a href="#features">Fitur</a>
            <a href="#about">Tentang</a>
            <a href="#contact">Kontak</a>
          </div>
          <div class="footer-section">
            <h4>Kontak</h4>
            <p>Email: info@eventure.com</p>
            <p>Phone: (021) 1234-5678</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Eventure. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// Smooth scroll for anchor links
const smoothScroll = (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
    e.preventDefault()
    const targetId = e.target.getAttribute('href')
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

onMounted(() => {
  document.addEventListener('click', smoothScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', smoothScroll)
})
</script>

<style scoped>
/* Landing Page Styles */
.landing-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Navigation */
.landing-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.75rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #3498db;
}

.login-btn {
  padding: 0.5rem 1.5rem;
  background-color: #3498db;
  color: white !important;
  border-radius: 25px;
  transition: all 0.3s;
}

.login-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

/* Hero Section */
.hero {
  padding: 120px 2rem 80px;
  display: flex;
  align-items: center;
  min-height: 90vh;
  max-width: 1200px;
  margin: 0 auto;
  gap: 4rem;
}

.hero-content {
  flex: 1;
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.highlight {
  background: linear-gradient(135deg, #3498db, #2980b9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary-hero,
.btn-secondary-hero {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary-hero {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 20px rgba(52, 152, 219, 0.3);
}

.btn-primary-hero:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 30px rgba(52, 152, 219, 0.4);
}

.btn-secondary-hero {
  border: 2px solid #3498db;
  color: #3498db;
}

.btn-secondary-hero:hover {
  background-color: #3498db;
  color: white;
}

/* Hero Illustration */
.hero-image {
  flex: 1;
  position: relative;
  height: 400px;
}

.hero-illustration {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-card {
  position: absolute;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  animation: float 3s ease-in-out infinite;
}

.card-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 10%;
  right: 20%;
  animation-delay: 0.5s;
}

.card-3 {
  bottom: 30%;
  right: 10%;
  animation-delay: 1s;
}

.card-4 {
  bottom: 20%;
  left: 30%;
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Features Section */
.features {
  padding: 80px 2rem;
  background-color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 15px;
  background-color: #f8f9fa;
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* How It Works */
.how-it-works {
  padding: 80px 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.roles-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.role-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.role-card h3 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.admin-role h3 {
  color: #e74c3c;
}

.panitia-role h3 {
  color: #f39c12;
}

.peserta-role h3 {
  color: #27ae60;
}

.role-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.step-number {
  width: 30px;
  height: 30px;
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

/* About Section */
.about {
  padding: 80px 2rem;
  background-color: white;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.about-text p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.stats {
  display: flex;
  gap: 2rem;
}

.stat h3 {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.stat p {
  color: #666;
  margin: 0;
}

.about-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-container {
  position: relative;
  width: 400px;
  height: 400px;
}

.feature-showcase {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.showcase-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #2c3e50;
  transition: all 0.3s ease;
  animation: slideIn 0.8s ease-out;
}

.showcase-item:nth-child(1) { animation-delay: 0.1s; }
.showcase-item:nth-child(2) { animation-delay: 0.2s; }
.showcase-item:nth-child(3) { animation-delay: 0.3s; }
.showcase-item:nth-child(4) { animation-delay: 0.4s; }

.showcase-item:hover {
  transform: translateX(10px);
  box-shadow: 0 8px 30px rgba(52, 152, 219, 0.3);
}

.showcase-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 50%;
  color: white;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.visual-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.1));
  animation: pulse 4s ease-in-out infinite;
}

.circle-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
  animation-delay: 1s;
}

.circle-3 {
  width: 60px;
  height: 60px;
  bottom: 15%;
  left: 20%;
  animation-delay: 2s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.1;
  }
}

/* CTA Section */
.cta {
  padding: 80px 2rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  padding: 1rem 3rem;
  background-color: white;
  color: #3498db;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Footer */
.landing-footer {
  background-color: #2c3e50;
  color: white;
  padding: 60px 2rem 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
}

.footer-section a {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 100px 1rem 60px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-image {
    display: none;
  }
  
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .visual-container {
    width: 100%;
    height: 300px;
  }
  
  .showcase-item {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-links {
    display: none;
  }
  
  .stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>