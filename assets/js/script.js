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
    // 0: D4 DiesQuatro (Bold & Clean)
    {
      color: '#00a8ff',
      logoHTML: '<div class="prism-logo-text" style="font-weight: 800; font-size: 3rem;">D4</div>',
      textHTML: '<span style="font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">DIES<span class="accent">QUATRO</span></span>',
      line: false
    },
    // 1: DQ DiesQuatro (Premium Modern)
    {
      color: '#00e676',
      logoHTML: '<div class="prism-logo-text" style="font-weight: 900; font-size: 3.2rem; letter-spacing: -2px;">DQ</div>',
      textHTML: '<span style="font-family: var(--font-display); font-weight: 900; text-transform: uppercase; letter-spacing: 0;">DIES<span class="accent">QUATRO</span></span>',
      line: true
    },
    // 2: DiesQuatro (Elegant Capitalized)
    {
      color: '#c9a84c',
      logoHTML: '',
      textHTML: '<span style="font-family: var(--font-display); font-weight: 600; text-transform: none; letter-spacing: 0.02em;">Dies<span class="accent">Quatro</span></span>',
      line: false
    },
    // 3: dies4uatro (Minimal Lowercase)
    {
      color: '#fc0000',
      logoHTML: '',
      textHTML: '<span style="font-family: var(--font-display); font-weight: 500; text-transform: lowercase; letter-spacing: 0.08em;">dies<span class="accent">4</span>uatro</span>',
      line: false
    },
    // 4: Official Logo + Geometric Uppercase
    {
      color: '#2980b9',
      logoHTML: '<img src="assets/img/logo.webp" class="prism-logo-img" alt="DQ Logo" />',
      textHTML: '<span style="font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">DIES<span class="accent">QUATRO</span></span>',
      line: false
    },
    // 5: DQ DiesQuatro (Thin & Sleek)
    {
      color: '#0984e3',
      logoHTML: '<div class="prism-logo-text" style="font-weight: 300; font-size: 3rem;">DQ</div>',
      textHTML: '<span style="font-family: var(--font-display); font-weight: 300; text-transform: uppercase; letter-spacing: 0.25em;">DIES<span class="accent">QUATRO</span></span>',
      line: false
    },
    // 6: D4 DiesQuatro (Outline style highly modern)
    {
      color: '#d63031',
      logoHTML: '<div class="prism-logo-text outline-accent" style="font-weight: 900; font-size: 3rem;">D4</div>',
      textHTML: '<span style="font-family: var(--font-display); font-weight: 900; text-transform: uppercase; letter-spacing: 0;"><span class="outline-accent" style="text-shadow: none;">DIES</span>QUATRO</span>',
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

// ==================== CATALOG MODAL POLOS (DEFAULT) ====================
// ==================== CATALOGO DATA (UNIFIED) ====================
const CATALOGO = {
  hombres: [
    {
      id: 'h-01', ref: 'DQ-H01', nombre: 'Polo Élite 1', precio: 45000,
      descripcion: 'Corte clásico con acabados de primera. Desarrollado para durabilidad extrema y uso diario.',
      variantes: [
        { color: 'Estilo 1', img: 'assets/img/catalogo de hombre/polo 1/WhatsApp Image 2026-03-24 at 7.00.54 PM (1).jpeg' },
        { color: 'Estilo 2', img: 'assets/img/catalogo de hombre/polo 1/WhatsApp Image 2026-03-24 at 7.00.54 PM (2).jpeg' },
        { color: 'Estilo 3', img: 'assets/img/catalogo de hombre/polo 1/WhatsApp Image 2026-03-24 at 7.00.54 PM (3).jpeg' },
        { color: 'Estilo 4', img: 'assets/img/catalogo de hombre/polo 1/WhatsApp Image 2026-03-24 at 7.00.54 PM.jpeg' }
      ]
    },
    {
      id: 'h-02', ref: 'DQ-H02', nombre: 'Polo Élite 2', precio: 45000,
      descripcion: 'Diseño minimalista con alto confort térmico y textura suave al tacto.',
      variantes: [
        { color: 'Estilo 1', img: 'assets/img/catalogo de hombre/polo 2/WhatsApp Image 2026-03-24 at 7.01.16 PM (1).jpeg' },
        { color: 'Estilo 2', img: 'assets/img/catalogo de hombre/polo 2/WhatsApp Image 2026-03-24 at 7.01.16 PM (2).jpeg' },
        { color: 'Estilo 3', img: 'assets/img/catalogo de hombre/polo 2/WhatsApp Image 2026-03-24 at 7.01.16 PM (3).jpeg' },
        { color: 'Estilo 4', img: 'assets/img/catalogo de hombre/polo 2/WhatsApp Image 2026-03-24 at 7.01.16 PM.jpeg' }
      ]
    },
    {
      id: 'h-03', ref: 'DQ-H03', nombre: 'Polo Élite 3', precio: 45000,
      descripcion: 'Silueta semi-ajustada ideal para proyectar una imagen formal e impecable.',
      variantes: [
        { color: 'Estilo 1', img: 'assets/img/catalogo de hombre/polo 3/WhatsApp Image 2026-03-24 at 7.07.22 PM (1).jpeg' },
        { color: 'Estilo 2', img: 'assets/img/catalogo de hombre/polo 3/WhatsApp Image 2026-03-24 at 7.07.22 PM (2).jpeg' },
        { color: 'Estilo 3', img: 'assets/img/catalogo de hombre/polo 3/WhatsApp Image 2026-03-24 at 7.07.22 PM.jpeg' }
      ]
    },
    {
      id: 'h-04', ref: 'DQ-H04', nombre: 'Polo Élite 4', precio: 45000,
      descripcion: 'Textura microperforada en zonas estratégicas para mayor transpirabilidad.',
      variantes: [
        { color: 'Estilo 1', img: 'assets/img/catalogo de hombre/polo 4/WhatsApp Image 2026-03-24 at 7.08.00 PM (1).jpeg' },
        { color: 'Estilo 2', img: 'assets/img/catalogo de hombre/polo 4/WhatsApp Image 2026-03-24 at 7.08.00 PM (2).jpeg' },
        { color: 'Estilo 3', img: 'assets/img/catalogo de hombre/polo 4/WhatsApp Image 2026-03-24 at 7.08.00 PM (3).jpeg' },
        { color: 'Estilo 4', img: 'assets/img/catalogo de hombre/polo 4/WhatsApp Image 2026-03-24 at 7.14.07 PM.jpeg' }
      ]
    },
    {
      id: 'h-05', ref: 'DQ-H05', nombre: 'Polo Élite 5', precio: 45000,
      descripcion: 'Cuello rígido y puños reforzados, diseñado para máxima resistencia al uso diario continuo.',
      variantes: [
        { color: 'Estilo 1', img: 'assets/img/catalogo de hombre/polo 5/WhatsApp Image 2026-03-24 at 7.10.30 PM (1).jpeg' },
        { color: 'Estilo 2', img: 'assets/img/catalogo de hombre/polo 5/WhatsApp Image 2026-03-24 at 7.10.30 PM.jpeg' }
      ]
    },
    {
      id: 'h-06', ref: 'DQ-H06', nombre: 'Polo Élite 6', precio: 45000,
      descripcion: 'Estilo bicolor con detalles premium en botones y costuras. Auténtica calidad de exportación.',
      variantes: [
        { color: 'Estilo 1', img: 'assets/img/catalogo de hombre/polo 6/WhatsApp Image 2026-03-24 at 7.02.08 PM (1).jpeg' },
        { color: 'Estilo 2', img: 'assets/img/catalogo de hombre/polo 6/WhatsApp Image 2026-03-24 at 7.02.08 PM (2).jpeg' },
        { color: 'Estilo 3', img: 'assets/img/catalogo de hombre/polo 6/WhatsApp Image 2026-03-24 at 7.02.08 PM (3).jpeg' },
        { color: 'Estilo 4', img: 'assets/img/catalogo de hombre/polo 6/WhatsApp Image 2026-03-24 at 7.02.08 PM.jpeg' }
      ]
    }
  ],
  mujer: [
    {
      id: 'w-01', ref: 'DQ-W01', nombre: 'Polo Signature Mujer', precio: 42000,
      descripcion: 'Corte entallado que realza la silueta. 100% elegancia y confort premium.',
      variantes: [
        { color: 'Diseño 1', img: 'assets/img/catalogo de mujer/hombres_2.png' },
        { color: 'Diseño 2', img: 'assets/img/catalogo de mujer/mujer_polo_1_1774728833602.png' },
        { color: 'Diseño 3', img: 'assets/img/catalogo de mujer/mujer_polo_2_1774728855014.png' },
        { color: 'Diseño 4', img: 'assets/img/catalogo de mujer/mujer_polo_design.png' }
      ]
    }
  ],
  ninos: [
    {
      id: 'k-01', ref: 'DQ-K01', nombre: 'Polo Kids Premium', precio: 28000,
      descripcion: 'Máxima resistencia y suavidad para los más pequeños. Fibras transpirables.',
      variantes: [
        { color: 'Estilo 1', img: 'assets/img/catalogo de niños/mujer_polo_3_1774728880085.png' },
        { color: 'Estilo 2', img: 'assets/img/catalogo de niños/ninos_3.png' },
        { color: 'Estilo 3', img: 'assets/img/catalogo de niños/ninos_polo_1_1774728589424.png' },
        { color: 'Estilo 4', img: 'assets/img/catalogo de niños/ninos_polo_3_1774728633632.png' }
      ]
    }
  ],
  accesorios: [
    {
      id: 'a-01', ref: 'DQ-A01', nombre: 'Gorra Elite DQ', precio: 25000,
      descripcion: 'Bordado 3D de alta precisión y ajuste ergonómico, el complemento ideal.',
      variantes: [
        { color: 'Visera Playa', img: 'assets/img/catalogo de gorras/gorra_visera_1774729333727.png' },
        { color: 'Logo Especial', img: 'assets/img/catalogo de gorras/gorras_ejemplo_parecida_1774729275453.png' },
        { color: 'Premium', img: 'assets/img/catalogo de gorras/gorras_premium.png' },
        { color: 'Sombrero', img: 'assets/img/catalogo de gorras/sombrero_dq_1774729299508.png' }
      ]
    }
  ],
  playa: [
    {
      id: 's-01', ref: 'DQ-S01', nombre: 'Swimwear Pro', precio: 55000,
      descripcion: 'Línea Summer DiesQuatro. Secado ultra rápido y diseños que resaltan tu outfit.',
      variantes: [
        { color: 'Ocean', img: 'assets/img/catalogo de traje de  baño/traje_bano_1_1774730772528.png' },
        { color: 'Navy', img: 'assets/img/catalogo de traje de  baño/traje_bano_2_1774730796168.png' },
        { color: 'Tropical', img: 'assets/img/catalogo de traje de  baño/traje_bano_3_1774730821676.png' },
        { color: 'GoldEdition', img: 'assets/img/catalogo de traje de  baño/traje_bano_premium.png' }
      ]
    }
  ],
  cuero: [
    {
      id: 'l-01', ref: 'DQ-L01', nombre: 'Cinto Legítimo DQ', precio: 65000,
      descripcion: 'Piel genuina con acabados 100% artesanales y hebilla de aleación reforzada.',
      variantes: [
        { color: 'Café Claro', img: 'assets/img/catalogo de correas/correas_1_1774730995836.png' },
        { color: 'Café Oscuro', img: 'assets/img/catalogo de correas/correas_2_1774731019971.png' },
        { color: 'Diseño Relieve', img: 'assets/img/catalogo de correas/correas_3_1774731045485.png' },
        { color: 'Minimal', img: 'assets/img/catalogo de correas/correas_cuero.png' }
      ]
    }
  ]
};


// ==================== PREMIUM CATALOG ENGINE ====================
const pcOverlay = document.getElementById('premium-catalog-overlay');
const pcGrid = document.getElementById('pc-grid');
const pcLoader = document.getElementById('pc-loader');
const pcCloseBtn = document.getElementById('pc-close-btn');
const pcDetailModal = document.getElementById('pc-detail-modal');
const pcDetailContent = document.getElementById('pc-detail-content');

let activeRotations = new Map();

function getCategoryTitle(cat) {
  const titles = { hombres: "HOMMES ÉLITE", mujer: "WOMEN PREMIUM", ninos: "KIDS EDITION", accesorios: "ACCESORIOS", playa: "SUMMER LINE", cuero: "CUERO LEGÍTIMO" };
  return titles[cat] || cat.toUpperCase();
}

function openPremiumCatalog(categoria = 'hombres') {
  pcOverlay.classList.add('active');
  pcLoader.classList.remove('fade-out');
  
  // Limpiar estados previos
  activeRotations.forEach(interval => clearInterval(interval));
  activeRotations.clear();

  // Actualizar Título
  const titleEl = document.getElementById('pc-header-title');
  if (titleEl) titleEl.innerText = getCategoryTitle(categoria);
  
  // Actualizar Filtros Activos
  document.querySelectorAll('.pc-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === categoria);
  });

  setTimeout(() => {
    pcLoader.classList.add('fade-out');
    renderCatalog(categoria);
  }, 1000);
}

function renderCatalog(categoria) {
  pcGrid.innerHTML = '';
  const productos = CATALOGO[categoria] || [];
  
  productos.forEach((prod, index) => {
    const card = document.createElement('div');
    card.className = 'pc-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    const swatchesHTML = prod.variantes.map((v, i) => `
      <div class="pc-swatch ${i===0?'active':''}" 
           style="background-image: url('${v.img}')" 
           data-img="${v.img}"
           data-color="${v.color}"></div>
    `).join('');

    card.innerHTML = `
      <div class="pc-card-inner">
        <div class="pc-img-box">
          <img src="${prod.variantes[0].img}" class="pc-main-img">
          <div class="pc-badge">${prod.ref}</div>
          <button class="slide-arrow prev" aria-label="Anterior"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
          <button class="slide-arrow next" aria-label="Siguiente"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
        </div>
        <div class="pc-info">
          <span class="pc-category">${categoria.toUpperCase()}</span>
          <h3 class="pc-name">${prod.nombre}</h3>
          <div class="pc-bottom">
            <span class="pc-price">$${prod.precio.toLocaleString()}</span>
            <div class="pc-swatches">${swatchesHTML}</div>
          </div>
        </div>
      </div>`;

    // Animación de entrada (Staggering)
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);

    let currentIdx = 0;

    const navigateVariant = (direction) => {
      stopVariantRotation(prod.id);
      currentIdx = (currentIdx + direction + prod.variantes.length) % prod.variantes.length;
      const v = prod.variantes[currentIdx];
      updateCardVariant(card, v.img, v.color);
      const swatches = card.querySelectorAll('.pc-swatch');
      swatches.forEach(s => s.classList.remove('active'));
      swatches[currentIdx].classList.add('active');
    };

    const slidePrev = card.querySelector('.slide-arrow.prev');
    const slideNext = card.querySelector('.slide-arrow.next');
    if (slidePrev) slidePrev.addEventListener('click', (e) => { e.stopPropagation(); navigateVariant(-1); });
    if (slideNext) slideNext.addEventListener('click', (e) => { e.stopPropagation(); navigateVariant(1); });

    // Touch Swipe Support
    let touchStartX = 0;
    const imgBox = card.querySelector('.pc-img-box');
    imgBox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
    imgBox.addEventListener('touchend', e => { 
      let touchEndX = e.changedTouches[0].screenX; 
      if(touchEndX < touchStartX - 40) { navigateVariant(1); e.stopPropagation(); } // Swiped left
      if(touchEndX > touchStartX + 40) { navigateVariant(-1); e.stopPropagation(); } // Swiped right
    }, {passive: true});

    card.addEventListener('mouseleave', () => { 
      stopVariantRotation(prod.id);
    });

    card.addEventListener('mouseenter', () => {
      if (prod.variantes.length <= 1) return;
      const interval = setInterval(() => {
        navigateVariant(1);
      }, 2000);
      activeRotations.set(prod.id, interval);
    });

    // Swatches interactivity
    card.querySelectorAll('.pc-swatch').forEach((swatch, sIdx) => {
      swatch.addEventListener('click', (e) => {
        e.stopPropagation();
        stopVariantRotation(prod.id);
        currentIdx = sIdx;
        updateCardVariant(card, swatch.dataset.img, swatch.dataset.color);
        card.querySelectorAll('.pc-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
      });
    });

    card.addEventListener('click', () => openPremiumDetail(prod, card));
    pcGrid.appendChild(card);
  });
}

function updateCardVariant(card, imgSrc, colorName) {
  const img = card.querySelector('.pc-main-img');
  img.classList.add('changing');
  setTimeout(() => {
    img.src = imgSrc;
    img.classList.remove('changing');
  }, 350);
}

function startVariantRotation(card, prod) {
  // Ahora manejado internamente en renderCatalog para conservar el estado
}

function stopVariantRotation(prodId) {
  if (activeRotations.has(prodId)) {
    clearInterval(activeRotations.get(prodId));
    activeRotations.delete(prodId);
  }
}

function openPremiumDetail(prod, card) {
  const activeImg = card.querySelector('.pc-main-img').src;
  const activeColor = card.querySelector('.pc-swatch.active').dataset.color;
  
  pcDetailContent.innerHTML = `
    <div class="pc-detail-img-box">
      <img src="${activeImg}" id="detail-main-img">
    </div>
    <div class="pc-detail-content">
      <div class="pc-detail-header">
        <span class="pc-category">${prod.ref}</span>
        <h2>${prod.nombre}</h2>
      </div>
      <p class="pc-detail-desc">${prod.descripcion}</p>
      <div class="pc-detail-price">$${prod.precio.toLocaleString()}</div>
      
      <div class="pc-detail-options">
        <div class="pc-option-group">
          <label>Talla</label>
          <div class="pc-size-selector">
            ${['S','M','L','XL'].map(s => `<button class="size-opt ${s==='M'?'active':''}" onclick="selectSize(this, '${s}')">${s}</button>`).join('')}
          </div>
        </div>
        <div class="pc-option-group">
          <label>Color: <span id="detail-color-name">${activeColor}</span></label>
          <div class="pc-swatches">
            ${prod.variantes.map(v => `
              <div class="pc-swatch ${activeImg.includes(v.img)?'active':''}" 
                   style="background-image: url('${v.img}')" 
                   onclick="updateDetailVariant('${v.img}', '${v.color}', this)"></div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <a href="#" id="wa-checkout-btn" class="pc-whatsapp-btn" onclick="checkoutWA('${prod.nombre}', '${prod.ref}')">
        CONSULTAR DISPONIBILIDAD
      </a>
      <button class="pc-close-btn" style="margin-top:1.5rem; width:100%;" onclick="closePremiumDetail()">VOLVER AL CATÁLOGO</button>
    </div>`;
  
  pcDetailModal.classList.add('active');
}

// Global scope helpers for template literals
window.selectSize = (btn, size) => {
  document.querySelectorAll('.size-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  window.selectedSize = size;
};

window.updateDetailVariant = (imgSrc, colorName, swatch) => {
  const img = document.getElementById('detail-main-img');
  img.classList.add('changing');
  document.getElementById('detail-color-name').innerText = colorName;
  swatch.parentElement.querySelectorAll('.pc-swatch').forEach(s => s.classList.remove('active'));
  swatch.classList.add('active');
  window.selectedColor = colorName;
  setTimeout(() => {
    img.src = imgSrc;
    img.classList.remove('changing');
  }, 350);
};

window.checkoutWA = (nombre, ref) => {
  const size = window.selectedSize;
  const sizeSelector = document.querySelector('.pc-size-selector');
  
  if (!size && sizeSelector) {
    sizeSelector.style.animation = 'shake 0.4s ease-in-out';
    setTimeout(() => sizeSelector.style.animation = '', 400);
    alert('Oops! Por favor, selecciona una talla antes de consultar.');
    return;
  }
  
  const color = window.selectedColor || document.getElementById('detail-color-name').innerText;
  const sizeText = size ? size : 'Talla Única';
  const msg = `Hola DiesQuatro, me interesa el producto:\n*${nombre}*\nRef: ${ref}\nColor: ${color}\nTalla: ${sizeText}\n¿Tienen disponibilidad?`;
  window.open(`https://wa.me/573142253136?text=${encodeURIComponent(msg)}`, '_blank');
};

window.closePremiumDetail = () => pcDetailModal.classList.remove('active');
if (pcCloseBtn) pcCloseBtn.addEventListener('click', () => pcOverlay.classList.remove('active'));

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('DiesQuatro Premium Engine Loaded');
  
  // Lógica de Filtros en Overlay
  document.querySelectorAll('.pc-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCat = btn.dataset.cat;
      const titleEl = document.getElementById('pc-header-title');
      if (titleEl) titleEl.innerText = getCategoryTitle(targetCat);

      document.querySelectorAll('.pc-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Limpiar estados previos de rotación
      activeRotations.forEach(interval => clearInterval(interval));
      activeRotations.clear();
      
      // Transición suave
      pcGrid.style.opacity = '0';
      setTimeout(() => {
        renderCatalog(targetCat);
        pcGrid.style.opacity = '1';
      }, 300);
    });
  });
  
  // Re-bind all catalog buttons to the new engine
  document.querySelectorAll('.btn-producto').forEach(btn => {
    btn.removeAttribute('href');
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.producto-card');
      let cat = 'hombres';
      if (card.id === 'card-ninos') cat = 'ninos';
      if (card.id === 'card-mujer') cat = 'mujer';
      if (card.id === 'card-gorras') cat = 'accesorios';
      if (card.id === 'card-trajes') cat = 'playa';
      if (card.id === 'card-correas') cat = 'cuero';
      openPremiumCatalog(cat);
    });
  });

  // ==================== AUTO SLIDER & ARROWS (PORTAL CARDS) ====================
  const imgWraps = document.querySelectorAll('.producto-img-wrap');
  imgWraps.forEach(wrap => {
    const images = wrap.querySelectorAll('.producto-slider-img');
    if (images.length > 1) {
      let currentIndex = 0;
      let timer;

      function goTo(index) {
        images[currentIndex].classList.remove('active');
        currentIndex = (index + images.length) % images.length;
        images[currentIndex].classList.add('active');
        resetTimer();
      }

      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => goTo(currentIndex + 1), 5000);
      }

      const prevBtn = wrap.querySelector('.slide-arrow.prev');
      const nextBtn = wrap.querySelector('.slide-arrow.next');
      if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goTo(currentIndex - 1); });
      if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goTo(currentIndex + 1); });

      // Touch Swipe Support
      let touchStartX = 0;
      wrap.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
      wrap.addEventListener('touchend', e => { 
        let touchEndX = e.changedTouches[0].screenX; 
        if(touchEndX < touchStartX - 40) goTo(currentIndex + 1); // Swiped left -> next
        if(touchEndX > touchStartX + 40) goTo(currentIndex - 1); // Swiped right -> prev
      }, {passive: true});

      resetTimer();
    }
  });

});

