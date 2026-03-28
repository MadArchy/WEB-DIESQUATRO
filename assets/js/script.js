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

// ==================== CATALOG MODAL POLOS ====================
const catalogModal = document.getElementById('catalog-modal');
const closeCatalogModal = document.getElementById('close-catalog-modal');
const btnProductos = document.querySelectorAll('.btn-producto');
const catalogContainer = document.getElementById('polo-catalog-container');

// 15 Polos mock data con 3 variables de color usando HUE rotations sobre base neutra y combinaciones
const polosData = [
  { id: '101', name: 'Polo Clásico Blanco', price: '$35.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Blanco', h: '#f5f5f5', f: 'hue-rotate(0deg) brightness(1.2)' }, { n: 'Negro Élite', h: '#111', f: 'grayscale(100%) brightness(0.25)' }, { n: 'Gris Jaspe', h: '#888', f: 'grayscale(100%) brightness(0.7)' } ] },
  { id: '102', name: 'Polo Azul Marino', price: '$38.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'A. Marino', h: '#1b365d', f: 'hue-rotate(200deg) brightness(0.7) saturate(1.5)' }, { n: 'Celeste', h: '#00b4d8', f: 'hue-rotate(180deg) brightness(1.1) saturate(1.5)' }, { n: 'Zafiro', h: '#0047ab', f: 'hue-rotate(205deg) brightness(0.8) saturate(2)' } ] },
  { id: '103', name: 'Polo Verde Selva', price: '$35.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Botella', h: '#004b23', f: 'hue-rotate(140deg) brightness(0.6) saturate(1.5)' }, { n: 'Oliva', h: '#556b2f', f: 'hue-rotate(60deg) brightness(0.6) saturate(1.2)' }, { n: 'Esmeralda', h: '#50c878', f: 'hue-rotate(130deg) brightness(0.9) saturate(2)' } ] },
  { id: '104', name: 'Polo Fuego', price: '$35.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Rojo', h: '#d90429', f: 'hue-rotate(350deg) brightness(0.9) saturate(2)' }, { n: 'Vinotinto', h: '#8b0000', f: 'hue-rotate(330deg) brightness(0.8) saturate(2)' }, { n: 'Naranja', h: '#f77f00', f: 'hue-rotate(20deg) brightness(1) saturate(1.5)' } ] },
  { id: '105', name: 'Polo Sol Mágico', price: '$38.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Mostaza', h: '#ffb703', f: 'hue-rotate(45deg) brightness(1.1) saturate(2)' }, { n: 'Amarillo', h: '#ffd166', f: 'hue-rotate(50deg) brightness(1.3) saturate(2)' }, { n: 'Crema', h: '#fefae0', f: 'hue-rotate(40deg) brightness(1.4) saturate(0.5)' } ] },
  { id: '106', name: 'Polo Imperial', price: '$40.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Púrpura', h: '#7209b7', f: 'hue-rotate(270deg) brightness(0.8) saturate(1.5)' }, { n: 'Lila', h: '#c8b6ff', f: 'hue-rotate(260deg) brightness(1.2) saturate(1)' }, { n: 'Uva', h: '#3c096c', f: 'hue-rotate(280deg) brightness(0.5) saturate(2)' } ] },
  { id: '107', name: 'Polo Tierra', price: '$35.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Café', h: '#5c4033', f: 'hue-rotate(25deg) brightness(0.5) saturate(1.2)' }, { n: 'Beige', h: '#dcd1b4', f: 'hue-rotate(30deg) brightness(1.2) saturate(0.4)' }, { n: 'Arena', h: '#ebd5b3', f: 'hue-rotate(28deg) brightness(1.3) saturate(0.5)' } ] },
  { id: '108', name: 'Polo Rosé', price: '$36.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Rosado', h: '#ffafcc', f: 'hue-rotate(310deg) brightness(1.2) saturate(1.2)' }, { n: 'Fucsia', h: '#f15bb5', f: 'hue-rotate(300deg) brightness(1) saturate(2)' }, { n: 'Palo Rosa', h: '#e5989b', f: 'hue-rotate(330deg) brightness(1) saturate(0.8)' } ] },
  { id: '109', name: 'Polo Menta', price: '$38.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Menta', h: '#a3b18a', f: 'hue-rotate(80deg) brightness(1.1) saturate(0.6)' }, { n: 'Turquesa', h: '#00f5d4', f: 'hue-rotate(150deg) brightness(1.2) saturate(1.5)' }, { n: 'Aqua', h: '#48cae4', f: 'hue-rotate(170deg) brightness(1.1) saturate(1.8)' } ] },
  { id: '110', name: 'Polo Profundo', price: '$40.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Carbón', h: '#333333', f: 'grayscale(100%) brightness(0.4)' }, { n: 'Plata', h: '#c0c0c0', f: 'grayscale(100%) brightness(1.1)' }, { n: 'Acero', h: '#71797e', f: 'hue-rotate(200deg) brightness(0.8) saturate(0.1)' } ] },
  { id: '111', name: 'Polo Neón', price: '$35.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Lima', h: '#ccff00', f: 'hue-rotate(60deg) brightness(1.3) saturate(3)' }, { n: 'Cian', h: '#00ffff', f: 'hue-rotate(160deg) brightness(1.3) saturate(3)' }, { n: 'Magenta', h: '#ff00ff', f: 'hue-rotate(280deg) brightness(1.3) saturate(3)' } ] },
  { id: '112', name: 'Polo Pastel', price: '$35.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Hielo', h: '#e0fbfc', f: 'hue-rotate(180deg) brightness(1.4) saturate(0.3)' }, { n: 'Lavanda', h: '#e0c3fc', f: 'hue-rotate(260deg) brightness(1.3) saturate(0.5)' }, { n: 'Durazno', h: '#ffe5d9', f: 'hue-rotate(5deg) brightness(1.4) saturate(0.4)' } ] },
  { id: '113', name: 'Polo Océano', price: '$38.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Indigo', h: '#3f37c9', f: 'hue-rotate(220deg) brightness(0.8) saturate(2)' }, { n: 'Cobalto', h: '#4361ee', f: 'hue-rotate(215deg) brightness(0.9) saturate(2.5)' }, { n: 'Cielo', h: '#4cc9f0', f: 'hue-rotate(185deg) brightness(1.1) saturate(2)' } ] },
  { id: '114', name: 'Polo Ejecutivo', price: '$40.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Bordo', h: '#450920', f: 'hue-rotate(330deg) brightness(0.4) saturate(1.5)' }, { n: 'Moztaza Oscuro', h: '#a53860', f: 'hue-rotate(320deg) brightness(0.7) saturate(1.2)' }, { n: 'Tinto', h: '#660708', f: 'hue-rotate(350deg) brightness(0.5) saturate(1.8)' } ] },
  { id: '115', name: 'Polo Élite Gold', price: '$45.000', base: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', colors: [ { n: 'Oro', h: '#eebfa5', f: 'hue-rotate(30deg) brightness(1.1) saturate(1.5)' }, { n: 'Bronce', h: '#cd7f32', f: 'hue-rotate(20deg) brightness(0.9) saturate(1.8)' }, { n: 'Platino', h: '#e5e4e2', f: 'grayscale(100%) brightness(1.2)' } ] }
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
      colorsHtml += `<button class="color-btn ${idx===0?'active':''}" style="--btn-color:${c.h}" data-filter="${c.f}" data-cname="${c.n}" aria-label="Color ${c.n}"></button>`;
    });

    html += `
      <div class="catalog-item" id="item-${p.id}">
        <div class="catalog-img-wrap">
          <img src="${p.base}" alt="${p.name}" class="polo-dyn-img" style="filter: ${c0.f};">
        </div>
        <div class="catalog-info">
          <div class="catalog-meta">
            <span class="ref">REF: DQ-${p.id}</span>
            <span class="catalog-price">${p.price}</span>
          </div>
          <h4>${p.name}</h4>
          
          <div class="catalog-options">
            <div class="size-selector">${sizesHtml}</div>
            <div class="color-palette">${colorsHtml}</div>
          </div>

          <a href="#" class="btn-catalog-wa dyn-wa-btn" 
             data-ref="DQ-${p.id}" 
             data-size="M" 
             data-color="${c0.n}">
             <span class="wa-icon-btn"></span> Cotizar Ref.
          </a>
        </div>
      </div>
    `;
  });
  catalogContainer.innerHTML = html;

  // Interacciones Dinámicas
  const items = document.querySelectorAll('.catalog-item');
  items.forEach(item => {
    const sizeBtns = item.querySelectorAll('.size-btn');
    const colorBtns = item.querySelectorAll('.color-btn');
    const img = item.querySelector('.polo-dyn-img');
    const waBtn = item.querySelector('.dyn-wa-btn');

    // Mange Size Clicks
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        waBtn.setAttribute('data-size', btn.getAttribute('data-size'));
        updateWaLink(waBtn);
      });
    });

    // Manage Color Clicks
    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        img.style.filter = btn.getAttribute('data-filter');
        waBtn.setAttribute('data-color', btn.getAttribute('data-cname'));
        updateWaLink(waBtn);
      });
    });

    updateWaLink(waBtn);
  });
}

function updateWaLink(btn) {
  const ref = btn.getAttribute('data-ref');
  const size = btn.getAttribute('data-size');
  const color = btn.getAttribute('data-color');
  const msg = `Hola DiesQuatro, me interesa pedir la REFERENCIA: ${ref}. Detalles -> Talla: ${size} | Color: ${color}.`;
  btn.href = `https://wa.me/573142253136?text=${encodeURIComponent(msg)}`;
  btn.target = "_blank";
}

if (catalogModal) {
  btnProductos.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Evitar que el modal se abra si presionan el botón de PDF que tiene la misma clase
      if(btn.id !== 'btn-download-catalog') {
        e.preventDefault();
        catalogModal.classList.add('active');
      }
    });
  });

  const closeCatalog = () => catalogModal.classList.remove('active');
  if (closeCatalogModal) closeCatalogModal.addEventListener('click', closeCatalog);
  catalogModal.addEventListener('click', (e) => {
    if (e.target === catalogModal) closeCatalog();
  });
}

// Lógica del botón Descargar Catálogo PDF
const btnDownloadCatalog = document.getElementById('btn-download-catalog');
if (btnDownloadCatalog) {
  btnDownloadCatalog.addEventListener('click', (e) => {
    e.preventDefault();
    const originalText = btnDownloadCatalog.innerHTML;
    btnDownloadCatalog.innerHTML = 'Generando Memoria PDF...';
    btnDownloadCatalog.style.opacity = '0.7';
    
    // Simulación de carga y "descarga"
    setTimeout(() => {
      alert("Catálogo preparándose. Esta función puede conectar a un generador PDF (jsPDF) o lanzar la descarga de un archivo pre-hecho como /assets/docs/catalogo_diesquatro.pdf.");
      btnDownloadCatalog.innerHTML = originalText;
      btnDownloadCatalog.style.opacity = '1';
    }, 1500);
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
      img.src = 'assets/img/logo.webp';
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

// ==================== PRODUCTOS SLIDESHOW (PERFORMANCE OPTIMIZED) ====================
const slideContainers = document.querySelectorAll('.slide-container');

// Creamos un observador para detener la animación de los sliders si no están en pantalla
const sliderObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Usamos el dataset para pausar/reanudar
    entry.target.dataset.playing = entry.isIntersecting ? "true" : "false";
  });
}, { threshold: 0.1 });

// Solo inicializamos si hay contenedores
if (slideContainers.length > 0) {
  slideContainers.forEach(container => {
    sliderObserver.observe(container); // Iniciar la observación
    const slides = container.querySelectorAll('.producto-slider-img');
    
    if (slides.length > 1) {
      let currentSlide = 0;
      setTimeout(() => {
        setInterval(() => {
          // Solo se ejecuta la animación si el carrito de slide está en el area visible
          if (container.dataset.playing === "true") {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
          }
        }, 3500);
      }, Math.random() * 2000); // Retraso natural
    }
  });
}
// ==================== OFFICE HOURS STATUS ====================
(function() {
  const statusEl = document.getElementById('hours-status');
  if (!statusEl) return;

  // Colombia is always UTC-5 (no daylight saving)
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  const day  = now.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
  const hour = now.getHours() + now.getMinutes() / 60;

  let isOpen = false;
  if (day >= 1 && day <= 5 && hour >= 8 && hour < 18) isOpen = true;  // Mon-Fri 8am-6pm
  if (day === 6 && hour >= 8 && hour < 13) isOpen = true;              // Sat 8am-1pm

  statusEl.textContent = isOpen ? 'Abierto ahora' : 'Cerrado ahora';
  statusEl.className = 'hours-status ' + (isOpen ? 'open' : 'closed');
})();
