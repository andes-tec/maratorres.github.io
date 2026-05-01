// ========== MENÚ HAMBURGUESA MEJORADO (suave y sin desplazamiento) ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Crear overlay dinámicamente si no existe
let overlay = document.querySelector('.nav-overlay');
if (!overlay && menuToggle) {
  overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
}

function closeMenu() {
  if (navLinks) navLinks.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openMenu() {
  if (navLinks) navLinks.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

if (menuToggle) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navLinks && navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', closeMenu);
}

if (navLinks) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
    closeMenu();
  }
});

// ========== ANIMACIONES SCROLL (fade-up) ==========
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
fadeElements.forEach(el => observer.observe(el));

// ========== CONTADOR DE ESTADÍSTICAS ==========
function animateNumbers() {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const update = () => {
      current += increment;
      if (current < target) {
        el.innerText = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }
    };
    update();
  });
}
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateNumbers();
    heroObserver.disconnect();
  }
}, { threshold: 0.5 });
const heroSection = document.querySelector('#home');
if (heroSection) heroObserver.observe(heroSection);

// ========== SLIDER TESTIMONIOS ==========
const wrapper = document.getElementById('testimonialWrapper');
const prevBtn = document.getElementById('prevTesti');
const nextBtn = document.getElementById('nextTesti');
const dotsContainer = document.getElementById('testiDots');
let currentIndex = 0;
let totalSlides = document.querySelectorAll('.testimonial-card').length;
let autoInterval;

function updateSlider() {
  if (wrapper) wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}
function goToSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  currentIndex = index;
  updateSlider();
  resetAutoPlay();
}
function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }
function resetAutoPlay() {
  if (autoInterval) clearInterval(autoInterval);
  autoInterval = setInterval(nextSlide, 5500);
}
if (prevBtn && nextBtn && totalSlides > 0) {
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  updateSlider();
  resetAutoPlay();
  wrapper.addEventListener('mouseenter', () => clearInterval(autoInterval));
  wrapper.addEventListener('mouseleave', resetAutoPlay);
}

// ========== SLIDER ARTÍSTICO (frases) ==========
const artisticSlides = document.querySelectorAll('.artistic-slide');
const artisticDotsContainer = document.getElementById('artisticDots');
let artisticIndex = 0;
let artisticInterval;

function updateArtisticSlide(index) {
  artisticSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  const dots = document.querySelectorAll('.artistic-dot');
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}
function nextArtisticSlide() {
  artisticIndex = (artisticIndex + 1) % artisticSlides.length;
  updateArtisticSlide(artisticIndex);
}
function startArtisticAuto() {
  if (artisticInterval) clearInterval(artisticInterval);
  artisticInterval = setInterval(nextArtisticSlide, 6000);
}
if (artisticSlides.length > 0) {
  artisticSlides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('artistic-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      artisticIndex = i;
      updateArtisticSlide(artisticIndex);
      startArtisticAuto();
    });
    artisticDotsContainer.appendChild(dot);
  });
  startArtisticAuto();
}

// ========== FAQ ACORDEÓN ==========
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// ========== SMOOTH SCROLL CON OFFSET ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  });
});