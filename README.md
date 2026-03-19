# DiesQuatro | Confección Textil Premium

**DiesQuatro** es una plataforma web B2B orientada al performance, diseñada para la exhibición premium de catálogos y captación de ventas mayoristas de prendas textiles en Colombia. 

## 🚀 Tecnologías Core
El proyecto está construido sobre una arquitectura "Zero-Dependency", priorizando la velocidad de carga y evitando el sobrecosto de frameworks innecesarios.

* **HTML5 Semántico:** Estructuras de accesibilidad estrictas y SEO-friendly.
* **Componentes CSS3 Nativos:** Uso extensivo de variables (`--var`), `CSS Grid`, `Flexbox`, efectos *Glassmorphism* (desenfoque de cristal) y transformaciones 3D aceleradas por GPU (`preserve-3d`).
* **JavaScript ES6 (Vanilla):** Interactividad delegada a scripts nativos y altamente optimizados. Renderizados en cola y uso de `IntersectionObserver` para desencadenar animaciones que interactúan con el scroll ("Scroll Reveal").
* **Tipografía Auto-hospedada (Self-Hosted):** Descarga modular local de fuentes modernas ([Outfit](https://fonts.google.com/specimen/Outfit) e [Inter](https://fonts.google.com/specimen/Inter)) en formato ultraligero `.woff2` para evitar peticiones HTTP tercerizadas, bloqueos de renderizado y proteger la privacidad.

## 📂 Arquitectura del Proyecto
El código sigue una estricta separación de responsabilidades para favorecer la mantenibilidad y la escalabilidad de sus recursos estáticos (*Assets Strategy*).

```text
📁 DiesQuatro/
 ├── 📄 index.html             # Estructura principal y plantillas de la UI
 ├── 📄 README.md              # Documentación técnica
 ├── 📄 .gitignore             # Archivos de caché o temporales excluidos
 └── 📁 assets/                # Directorio de recursos modulares
      ├── 📁 css/              
      │    ├── style.css       # Motor central de estilos, variables y reglas globales
      │    └── fonts.css       # Declaraciones locales de tipografía
      ├── 📁 js/               
      │    └── script.js       # Control de modales, carruseles, observadores y generador de partículas
      ├── 📁 img/              # Elementos gráficos e iconografía
      ├── 📁 video/            # Archivos multimedia optimizados de hero/background
      └── 📁 fonts/            # Archivos locales tipográficos nativos
```

## ✨ Características Técnicas Principales
1. **Sistema de Carruseles Asíncronos Multiplexados:** Implementación matemática con JavaScript generativo de 4 galerías iterativas diferentes, donde cada cuadrícula tiene un desfase aleatorio para garantizar que nunca ocurran parpadeos simultáneos y se mantenga una interfaz orgánica en el catálogo de productos.
2. **Partículas de Marca de Agua:** Lógica inyectada dinámicamente mediante JS que clona, distribuye, rota y espacia logotipos como marca de agua en un algoritmo de cuadrícula invisible, dotándolos a intervalos asíncronos con destellos y brillo puntual usando animaciones basadas en destellos luminosos fotográficos (CSS Box-Shadow Filter).
3. **Prisma 3D Rotativo:** Geometría abstracta de 4 lados renderizada puramente con nodos HTML y animada infinitesimalmente para funcionar como eje visual flotante del inicio de la UI.
4. **Optimización de Recursos Multimedia:** Despliegue de un video "hero" ambiental en bloque que es gestionado por el navegador utilizando `playsinline` con consumo asincrónico por hardware sin afectar el hilo principal.
5. **Modos Modulares Integrados:** Ventana flotante de navegación controlada sin interferir con las dimensiones del body para incorporar el IFRAME del mapa geolocalizado en vivo de las instalaciones físicas (Maps API).

## 🛠️ Despliegue y Ejecución
Al ser una Progressive Zero-Dependency SPA (Single Page Architecture), no requiere pasos de compilación en compiladores de Node o paquetes (`npm`). 

Simplemente haz `git clone` del repositorio y sirve el único archivo index principal `index.html` en el servidor estático deseado, contenedor en la nube, bucket S3 o extensión como *Live Server*.
