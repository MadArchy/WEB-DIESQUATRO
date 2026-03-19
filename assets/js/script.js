// ==================== NAVBAR SCROLL ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ==================== ACTIVE NAV LINK ====================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ==================== SCROLL REVEAL ====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Product cards stagger
const productCards = document.querySelectorAll('.producto-card');
const productObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 150);
      productObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

productCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
  productObserver.observe(card);
});



// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==================== HERO PARALLAX (subtle) ====================
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBgText.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

// ==================== COUNTER ANIMATION ====================
function animateCounters() {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const text = stat.textContent;
    if (/^\d+/.test(text)) {
      const target = parseInt(text);
      const suffix = text.replace(/^\d+/, '');
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        stat.textContent = Math.round(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
    }
  });
}
const heroSection = document.querySelector('.hero');
const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    counterObserver.disconnect();
  }
}, { threshold: 0.5 });
if (heroSection) counterObserver.observe(heroSection);

// ==================== 3D PRISM ANIMATION ====================
const prismScene = document.getElementById('prism-scene');
const prismContainer = document.getElementById('prism-container');
const prismLogoContent = document.getElementById('prism-logo-content');
const prismTextContent = document.getElementById('prism-text-content');
const prismUnderline = document.getElementById('prism-underline');

if (prismScene && prismContainer) {
  // 1. Mouse Tilt Effect
  prismScene.addEventListener('mousemove', (e) => {
    const rect = prismScene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Base viewing angle: 25deg Y, 15deg X
    const rotateX = 15 - (((y - centerY) / centerY) * 10); 
    const rotateY = 25 + (((x - centerX) / centerX) * 14);
    
    prismContainer.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });
  
  prismScene.addEventListener('mouseleave', () => {
    prismContainer.style.transform = `rotateY(25deg) rotateX(15deg)`;
  });
  
  // 2. Dynamic Designs cycler
  const designs = [
    // 0: Original Blue Design
    {
      color: '#00a8ff',
      logoHTML: '<div class="prism-logo-text" style="font-size: 2.8rem;">4D</div>',
      textHTML: 'DIESQU4TRO',
      line: false
    },
    // 1: Original Red Design
    {
      color: '#fc0000',
      logoHTML: '<div class="prism-logo-text" style="font-size: 3.5rem;">D</div>',
      textHTML: 'DIESQU4TRO',
      line: true
    },
    // 2: Premium Gold Design (DQ Logo)
    {
      color: '#c9a84c',
      logoHTML: '<img src="assets/img/logo.png" class="prism-logo-img" alt="DQ Logo" />',
      textHTML: 'DIES<span class="accent">QUATRO</span>',
      line: false
    },
    // 3: Green Glow Design (Top-Left Image)
    {
      color: '#00e676',
      logoHTML: '<img src="assets/img/logo.png" class="prism-logo-img" alt="DQ Logo" style="filter: invert(1) drop-shadow(0 0 10px #00e676);" />',
      textHTML: 'DIES<span class="accent">QUATRO</span>',
      line: false
    },
    // 4: Blue Metal Design 1 (Top-Right Image)
    {
      color: '#2980b9',
      logoHTML: '<div class="prism-logo-stack"><div class="logo-stack-top">D</div><div class="logo-stack-bottom">4D</div></div>',
      textHTML: '<span class="accent" style="text-shadow: none;">DIES</span>QUATRO',
      line: false
    },
    // 5: Blue Metal Design 2 (Bottom-Left Image)
    {
      color: '#0984e3',
      logoHTML: '<div class="prism-logo-stack"><div class="logo-stack-top">D</div><div class="logo-stack-bottom">4D</div></div>',
      textHTML: '<span class="outline-accent">DIES</span>QUATRO',
      line: false
    },
    // 6: Red Stack Design (Bottom-Right Image)
    {
      color: '#d63031',
      logoHTML: '<div class="prism-logo-stack"><div class="logo-stack-top" style="color: transparent; -webkit-text-stroke: 2px var(--prism-color); filter: drop-shadow(0 0 10px var(--prism-color));">DQ</div><div class="logo-stack-bottom">4D</div></div>',
      textHTML: 'DIES<span class="accent">QUATRO</span>',
      line: true
    }
  ];
  
  let currentDesign = 0;
  
  function applyDesign(index) {
    const d = designs[index];
    
    // Fade out
    prismLogoContent.style.opacity = '0';
    prismTextContent.style.opacity = '0';
    
    setTimeout(() => {
      // Update color and DOM
      document.documentElement.style.setProperty('--prism-color', d.color);
      prismLogoContent.innerHTML = d.logoHTML;
      prismTextContent.innerHTML = d.textHTML;
      prismUnderline.style.width = d.line ? '50%' : '0%';
      
      // Fade back in
      prismLogoContent.style.opacity = '1';
      prismTextContent.style.opacity = '1';
    }, 450);
  }
  
  // Initial load
  applyDesign(0);
  
  // Cycle every 4 seconds
  setInterval(() => {
    currentDesign = (currentDesign + 1) % designs.length;
    applyDesign(currentDesign);
  }, 4000);
}

// ==================== LOCATION MODAL ====================
const locationBtn = document.getElementById('contact-location');
const locationModal = document.getElementById('location-modal');
const closeLocationModal = document.getElementById('close-location-modal');
const closeLocationBtn = document.getElementById('close-location-btn');

if (locationBtn && locationModal) {
  locationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    locationModal.classList.add('active');
  });
  
  const closeModal = () => locationModal.classList.remove('active');
  
  if (closeLocationModal) closeLocationModal.addEventListener('click', closeModal);
  if (closeLocationBtn) closeLocationBtn.addEventListener('click', closeModal);
  
  locationModal.addEventListener('click', (e) => {
    if (e.target === locationModal) closeModal();
  });
}

// ==================== RANDOM WATERMARKS ====================
const productosSection = document.getElementById('productos');
if (productosSection) {
  const wmContainer = document.createElement('div');
  wmContainer.className = 'watermarks-container';
  
  const rows = 5;
  const cols = 3;
  const logos = [];
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wm = document.createElement('div');
      wm.className = 'wm-logo';
      
      // Divide el fondo en celdas para asegurar una distribución perfecta y uniforme
      const cellWidth = 100 / cols;
      const cellHeight = 100 / rows;
      
      // Posiciona la marca de agua con una ligera aleatoriedad dentro de su cuadrícula
      const topOffset = (r * cellHeight) + (Math.random() * (cellHeight * 0.6) + cellHeight * 0.2);
      const leftOffset = (c * cellWidth) + (Math.random() * (cellWidth * 0.6) + cellWidth * 0.2);
      
      wm.style.top = `${topOffset}%`;
      wm.style.left = `${leftOffset}%`;
      wm.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
      
      const img = document.createElement('img');
      img.src = 'assets/img/logo.png';
      img.alt = '';
      
      wm.appendChild(img);
      wmContainer.appendChild(wm);
      logos.push(wm);
    }
  }
  
  productosSection.insertBefore(wmContainer, productosSection.firstChild);
  
  // Random flashing
  setInterval(() => {
    // Pick a random logo that isn't already flashing
    const availableLogos = logos.filter(l => !l.classList.contains('flash'));
    if (availableLogos.length > 0) {
      const idx = Math.floor(Math.random() * availableLogos.length);
      const chosen = availableLogos[idx];
      chosen.classList.add('flash');
      
      // Remove class after animation (2000ms matches CSS + buffer)
      setTimeout(() => {
        chosen.classList.remove('flash');
      }, 2500);
    }
  }, 1200); // 1.2s between flashes
}

// ==================== PRODUCTOS SLIDESHOW ====================
const slideContainers = document.querySelectorAll('.slide-container');
slideContainers.forEach(container => {
  const slides = container.querySelectorAll('.producto-slider-img');
  if (slides.length > 1) {
    let currentSlide = 0;
    // Agregamos un pequeño retraso aleatorio para que cada carrusel
    // cambie en momentos distintos, haciéndolo lucir mucho más dinámico y natural.
    setTimeout(() => {
      setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 3500); // Cambiar la imagen cada 3.5 segundos con transición suave
    }, Math.random() * 2000);
  }
});
