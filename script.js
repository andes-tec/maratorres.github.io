// ========== MENÚ HAMBURGUESA ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

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
    if (navLinks && navLinks.classList.contains('active')) closeMenu();
    else openMenu();
  });
}

if (overlay) overlay.addEventListener('click', closeMenu);
if (navLinks) {
  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) closeMenu();
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
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
fadeElements.forEach(el => observer.observe(el));

// ========== CONTADOR ESTADÍSTICAS ==========
function animateNumbers() {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const increment = target / 55;
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

// ========== TESTIMONIAL SLIDER ==========
const wrapper = document.getElementById('testimonialWrapper');
const prevBtn = document.getElementById('prevTesti');
const nextBtn = document.getElementById('nextTesti');
const dotsContainer = document.getElementById('testiDots');
let currentIndex = 0;
let totalSlides = document.querySelectorAll('.testimonial-card').length;
let autoInterval;
let startX = 0, isDragging = false;

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
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(autoInterval));
    wrapper.addEventListener('mouseleave', resetAutoPlay);
    wrapper.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; });
    wrapper.addEventListener('touchmove', (e) => { if (!isDragging) return; const diff = e.touches[0].clientX - startX; if (Math.abs(diff) > 50) { diff > 0 ? prevSlide() : nextSlide(); isDragging = false; } });
    wrapper.addEventListener('touchend', () => { isDragging = false; });
  }
}

// ========== ARTISTIC SLIDER ==========
const artisticSlides = document.querySelectorAll('.artistic-slide');
const artisticDotsContainer = document.getElementById('artisticDots');
let artisticIndex = 0;
let artisticInterval;

function updateArtisticSlide(index) {
  artisticSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
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

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  });
});

// ========== FORMULARIO WHATSAPP ==========
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if (!name || !message) {
      alert("Por favor, completa tu nombre y mensaje.");
      return;
    }
    // REEMPLAZAR CON EL NÚMERO REAL DE MARA (formato internacional sin +)
    const phoneNumber = "5493874433296";
    const whatsappText = `Hola Mara, soy ${name} - ${message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, '_blank');
    document.getElementById('contactName').value = '';
    document.getElementById('contactMessage').value = '';
  });
}

// ========== BOTÓN SCROLL TOP ==========
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) scrollBtn.classList.add('visible');
  else scrollBtn.classList.remove('visible');
});
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== EFECTO PARALLAX HERO (desktop) ==========
const heroImg = document.querySelector('.hero-image img');
if (heroImg && window.innerWidth > 768) {
  document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 10;
    const y = (e.clientY / window.innerHeight) * 10;
    heroImg.style.transform = `perspective(500px) rotateY(${x * 0.05}deg) rotateX(${y * -0.03}deg) translateY(-4px)`;
  });
  document.querySelector('.hero')?.addEventListener('mouseleave', () => {
    heroImg.style.transform = '';
  });
}

// ========== EFECTO PROFESIONAL PARA MÓVIL: resaltado de tarjetas con cambio de color al hacer scroll ==========
function initMobileCardHighlight() {
  if (window.innerWidth > 768) return;
  
  const cards = document.querySelectorAll('.service-card, .benefit-item, .step, .workshop-single-card');
  if (!cards.length) return;
  
  let ticking = false;
  const winHeight = window.innerHeight;
  
  const updateHighlights = () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardTop = rect.top;
      const cardBottom = rect.bottom;
      const isVisible = (cardTop < winHeight - 100 && cardBottom > 100);
      
      if (isVisible) {
        card.classList.add('card-highlight');
      } else {
        card.classList.remove('card-highlight');
      }
    });
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHighlights);
      ticking = true;
    }
  }, { passive: true });
  
  window.addEventListener('resize', () => { updateHighlights(); });
  updateHighlights();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileCardHighlight);
} else {
  initMobileCardHighlight();
}
