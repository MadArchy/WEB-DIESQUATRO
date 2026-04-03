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
const catalogModal = document.getElementById('catalog-modal');
const closeCatalogModal = document.getElementById('close-catalog-modal');
const btnProductos = document.querySelectorAll('.btn-producto');
const catalogContainer = document.getElementById('polo-catalog-container');

const polosData = [
  { id: '101', name: 'Polo Clásico Blanco', price: '$35.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Blanco', h: '#f5f5f5', f: 'hue-rotate(0deg) brightness(1.2)' }, { n: 'Negro Élite', h: '#111', f: 'grayscale(100%) brightness(0.25)' }, { n: 'Gris Jaspe', h: '#888', f: 'grayscale(100%) brightness(0.7)' } ] },
  { id: '102', name: 'Polo Azul Marino', price: '$38.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'A. Marino', h: '#1b365d', f: 'hue-rotate(200deg) brightness(0.7) saturate(1.5)' }, { n: 'Celeste', h: '#00b4d8', f: 'hue-rotate(180deg) brightness(1.1) saturate(1.5)' }, { n: 'Zafiro', h: '#0047ab', f: 'hue-rotate(205deg) brightness(0.8) saturate(2)' } ] },
  { id: '103', name: 'Polo Verde Selva', price: '$35.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Botella', h: '#004b23', f: 'hue-rotate(140deg) brightness(0.6) saturate(1.5)' }, { n: 'Oliva', h: '#556b2f', f: 'hue-rotate(60deg) brightness(0.6) saturate(1.2)' }, { n: 'Esmeralda', h: '#50c878', f: 'hue-rotate(130deg) brightness(0.9) saturate(2)' } ] }
];

if (catalogContainer) {
  let html = '';
  polosData.forEach((p) => {
    const c0 = p.colors[0];
    const sizes = ['S','M','L','XL'];
    let sizesHtml = '';
    sizes.forEach((s, idx) => {
      sizesHtml += `<button class="size-btn ${idx===1?'active':''}" data-size="${s}">${s}</button>`;
    });
    let colorsHtml = '';
    p.colors.forEach((c, idx) => {
      colorsHtml += `<button class="color-btn ${idx===0?'active':''}" style="--btn-color:${c.h}" data-filter="${c.f}" data-cname="${c.n}"></button>`;
    });
    html += `<div class="catalog-item">
        <div class="catalog-img-wrap"><img src="${p.base}" class="polo-dyn-img" style="filter: ${c0.f};"></div>
        <div class="catalog-info">
          <h4>${p.name}</h4>
          <div class="catalog-options"><div class="size-selector">${sizesHtml}</div><div class="color-palette">${colorsHtml}</div></div>
          <a href="#" class="btn-catalog-wa dyn-wa-btn" data-ref="DQ-${p.id}" data-size="M" data-color="${c0.n}">Cotizar Ref.</a>
        </div>
      </div>`;
  });
  catalogContainer.innerHTML = html;
}

// ==================== BUTTON CLICK ROUTING ====================
// Premium Catalog button for Hombres - runs ALWAYS, independent of other modals
const hombresBtn = document.querySelector('#card-hombres .btn-producto');
if (hombresBtn) {
  hombresBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPremiumCatalog();
  });
}

// Default catalog modal for other sections
if (catalogModal) {
  btnProductos.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.closest('#card-hombres')) return; // Already handled above
      if (btn.id !== 'btn-download-catalog') {
        e.preventDefault();
        catalogModal.classList.add('active');
      }
    });
  });
  const closeCatalog = () => catalogModal.classList.remove('active');
  if (closeCatalogModal) closeCatalogModal.addEventListener('click', closeCatalog);
  catalogModal.addEventListener('click', (e) => { if (e.target === catalogModal) closeCatalog(); });
}

// ==================== RANDOM WATERMARKS ====================
const productosSection = document.getElementById('productos');
if (productosSection) {
  const wmContainer = document.createElement('div');
  wmContainer.className = 'watermarks-container';
  const rows = 5, cols = 3, logos = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wm = document.createElement('div');
      wm.className = 'wm-logo';
      wm.style.top = `${(r * 20) + 10}%`;
      wm.style.left = `${(c * 33) + 16}%`;
      const img = document.createElement('img');
      img.src = 'assets/img/logo.webp';
      wm.appendChild(img);
      wmContainer.appendChild(wm);
      logos.push(wm);
    }
  }
  productosSection.insertBefore(wmContainer, productosSection.firstChild);
}

// ==================== OFFICE HOURS STATUS ====================
(function() {
  const statusEl = document.getElementById('hours-status');
  if (!statusEl) return;
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  const day  = now.getDay(), hour = now.getHours() + now.getMinutes() / 60;
  let isOpen = (day >= 1 && day <= 5 && hour >= 8 && hour < 18) || (day === 6 && hour >= 8 && hour < 13);
  statusEl.textContent = isOpen ? 'Abierto ahora' : 'Cerrado ahora';
  statusEl.className = 'hours-status ' + (isOpen ? 'open' : 'closed');
})();

// ==================== SLIDESHOW ====================
const slideContainers = document.querySelectorAll('.slide-container');
slideContainers.forEach(container => {
  const slides = container.querySelectorAll('.producto-slider-img');
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 3500);
  }
});


// ==================== PREMIUM CATALOG LOGIC (HOMBRES) ====================
const CATALOGO_HOMBRES = [
  {
    id: 'polo-01',
    ref: 'DQ-H01',
    nombre: 'Polo Élite Executive',
    precio: 45000,
    baseFolder: 'assets/img/hombres/polo 1/',
    variantes: [
      { color: 'Classic White', img: 'WhatsApp Image 2026-03-24 at 7.00.54 PM.jpeg' },
      { color: 'Deep Black', img: 'WhatsApp Image 2026-03-24 at 7.00.54 PM (1).jpeg' },
      { color: 'Midnight Blue', img: 'WhatsApp Image 2026-03-24 at 7.00.54 PM (2).jpeg' },
      { color: 'Burgundy', img: 'WhatsApp Image 2026-03-24 at 7.00.54 PM (3).jpeg' }
    ]
  },
  {
    id: 'polo-02',
    ref: 'DQ-H02',
    nombre: 'Polo Urban Sport',
    precio: 38000,
    baseFolder: 'assets/img/hombres/polo 2/',
    variantes: [
      { color: 'Slate Grey', img: 'WhatsApp Image 2026-03-24 at 7.01.16 PM.jpeg' },
      { color: 'Navy', img: 'WhatsApp Image 2026-03-24 at 7.01.16 PM (1).jpeg' },
      { color: 'Forest Green', img: 'WhatsApp Image 2026-03-24 at 7.01.16 PM (2).jpeg' },
      { color: 'Crimson', img: 'WhatsApp Image 2026-03-24 at 7.01.16 PM (3).jpeg' }
    ]
  },
  {
    id: 'polo-03',
    ref: 'DQ-H03',
    nombre: 'Polo Performance Pro',
    precio: 42000,
    baseFolder: 'assets/img/hombres/polo 3/',
    variantes: [
      { color: 'Azure', img: 'WhatsApp Image 2026-03-24 at 7.07.22 PM.jpeg' },
      { color: 'Olive', img: 'WhatsApp Image 2026-03-24 at 7.07.22 PM (1).jpeg' },
      { color: 'Silver', img: 'WhatsApp Image 2026-03-24 at 7.07.22 PM (2).jpeg' }
    ]
  },
  {
    id: 'polo-04',
    ref: 'DQ-H04',
    nombre: 'Polo Legacy Edition',
    precio: 48000,
    baseFolder: 'assets/img/hombres/polo 4/',
    variantes: [
      { color: 'Variant 1', img: 'WhatsApp Image 2026-03-24 at 7.08.00 PM.jpeg' },
      { color: 'Variant 2', img: 'WhatsApp Image 2026-03-24 at 7.08.00 PM (1).jpeg' },
      { color: 'Variant 3', img: 'WhatsApp Image 2026-03-24 at 7.08.00 PM (2).jpeg' },
      { color: 'Variant 4', img: 'WhatsApp Image 2026-03-24 at 7.08.00 PM (3).jpeg' },
      { color: 'Variant 5', img: 'WhatsApp Image 2026-03-24 at 7.08.00 PM (4).jpeg' }
    ]
  },
  {
    id: 'polo-05',
    ref: 'DQ-H05',
    nombre: 'Polo Essential Minimal',
    precio: 35000,
    baseFolder: 'assets/img/hombres/polo 5/',
    variantes: [
      { color: 'Neutral', img: 'WhatsApp Image 2026-03-24 at 7.10.30 PM.jpeg' },
      { color: 'Charcoal', img: 'WhatsApp Image 2026-03-24 at 7.10.30 PM (1).jpeg' }
    ]
  },
  {
    id: 'polo-06',
    ref: 'DQ-H06',
    nombre: 'Polo Signature Gold',
    precio: 50000,
    baseFolder: 'assets/img/hombres/polo 6/',
    variantes: [
      { color: 'Onyx', img: 'WhatsApp Image 2026-03-24 at 7.02.08 PM.jpeg' },
      { color: 'Teal', img: 'WhatsApp Image 2026-03-24 at 7.02.08 PM (1).jpeg' },
      { color: 'Amber', img: 'WhatsApp Image 2026-03-24 at 7.02.08 PM (2).jpeg' },
      { color: 'Ivory', img: 'WhatsApp Image 2026-03-24 at 7.02.08 PM (3).jpeg' }
    ]
  }
];

const pcOverlay = document.getElementById('premium-catalog-overlay');
const pcGrid = document.getElementById('pc-grid');
const pcLoader = document.getElementById('pc-loader');
const pcCloseBtn = document.getElementById('pc-close-btn');

function openPremiumCatalog() {
  pcOverlay.classList.add('active');
  pcLoader.classList.remove('fade-out');
  setTimeout(() => {
    pcLoader.classList.add('fade-out');
    renderPremiumCards();
  }, 1200);
}

function renderPremiumCards() {
  pcGrid.innerHTML = '';
  CATALOGO_HOMBRES.forEach((prod) => {
    const card = document.createElement('div');
    card.className = 'pc-card';
    const swatchesHTML = prod.variantes.map((v, i) => `
      <div class="pc-swatch ${i===0?'active':''}" 
           style="background-image: url('${prod.baseFolder}${v.img}')" 
           data-img="${prod.baseFolder}${v.img}"
           data-color="${v.color}"></div>
    `).join('');

    card.innerHTML = `
      <div class="pc-card-inner">
        <div class="pc-img-box"><img src="${prod.baseFolder}${prod.variantes[0].img}" class="pc-main-img"></div>
        <div class="pc-info">
          <span class="pc-category">${prod.ref}</span>
          <h3 class="pc-name">${prod.nombre}</h3>
          <div class="pc-bottom"><span class="pc-price">$${prod.precio.toLocaleString()}</span><div class="pc-swatches">${swatchesHTML}</div></div>
        </div>
      </div>`;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const rx = (y - rect.height/2) / 10, ry = (rect.width/2 - x) / 10;
      card.querySelector('.pc-card-inner').style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.querySelector('.pc-card-inner').style.transform = `rotateX(0) rotateY(0)`; });

    card.querySelectorAll('.pc-swatch').forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.stopPropagation();
        card.querySelectorAll('.pc-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        const img = card.querySelector('.pc-main-img');
        img.style.opacity = '0';
        setTimeout(() => { img.src = swatch.dataset.img; img.style.opacity = '1'; }, 300);
      });
    });
    card.addEventListener('click', () => openPremiumDetail(prod));
    pcGrid.appendChild(card);
  });
}

const pcDetailModal = document.getElementById('pc-detail-modal');
const pcDetailContent = document.getElementById('pc-detail-content');

function openPremiumDetail(prod) {
  const gridCard = Array.from(document.querySelectorAll('.pc-card')).find(c => c.querySelector('.pc-name').innerText === prod.nombre);
  const activeSwatch = gridCard ? gridCard.querySelector('.pc-swatch.active') : null;
  const currentImg = activeSwatch ? activeSwatch.dataset.img : `${prod.baseFolder}${prod.variantes[0].img}`;
  
  pcDetailContent.innerHTML = `
    <div class="pc-detail-img-box"><img src="${currentImg}" style="width:100%; height:100%; object-fit:cover;"></div>
    <div class="pc-detail-content">
      <span class="pc-category">${prod.ref}</span>
      <h2 style="color:#fff; font-size:2.5rem; margin-bottom:1rem;">${prod.nombre}</h2>
      <p style="color:#888; margin-bottom:2rem;">Confección premium con los más altos estándares de calidad.</p>
      <div style="font-size:1.5rem; color:#fff; font-weight:800; margin-bottom:2rem;">$${prod.precio.toLocaleString()}</div>
      <div style="display:flex; gap:1rem; margin-bottom:2rem;">${['S','M','L','XL'].map(s => `<button class="pc-close-btn" style="flex:1;">${s}</button>`).join('')}</div>
      <a href="https://wa.me/573142253136?text=${encodeURIComponent('Hola, me interesa: ' + prod.nombre)}" target="_blank" class="pc-whatsapp-btn">COTIZA POR WHATSAPP</a>
      <button class="pc-close-btn" style="margin-top:1rem; width:100%;" onclick="closePremiumDetail()">VOLVER</button>
    </div>`;
  pcDetailModal.classList.add('active');
}

window.closePremiumDetail = () => pcDetailModal.classList.remove('active');
pcCloseBtn.addEventListener('click', () => pcOverlay.classList.remove('active'));


// Initial setup for the Premium Catalog
document.addEventListener('DOMContentLoaded', () => {
  // We already handled the click in the main loop above, 
  // but if we needed any other init here, we'd add it.
  console.log('Premium Catalog Initialized');
});
