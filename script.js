/* ============================================================
   TransAndino — Logic & Interactivity
   ============================================================ */

// 1. BASE DE DATOS DE OFICINAS
const oficinas = [
  { id: 'chota', nombre: 'Chota', telefono: '51976877804', badge: 'Oficina Principal' },
  { id: 'cutervo', nombre: 'Cutervo', telefono: '51952117428', badge: 'Agencia' },
  { id: 'lacapilla', nombre: 'La Capilla', telefono: '51976877804', badge: 'Agencia' },
  { id: 'baguagrande', nombre: 'Bagua Grande', telefono: '51938965738', badge: 'Terminal' },
  { id: 'pedroruiz', nombre: 'Pedro Ruiz', telefono: '51976877804', badge: 'Agencia' },
  { id: 'pomacochas', nombre: 'Pomacochas', telefono: '51952856792', badge: 'Agencia' },
  { id: 'naranjillo', nombre: 'Naranjillo', telefono: '51975790400', badge: 'Agencia' },
  { id: 'naranjos', nombre: 'Naranjos', telefono: '51942444294', badge: 'Agencia' },
  { id: 'nuevacajamarca', nombre: 'Nueva Cajamarca', telefono: '51976877796', badge: 'Terminal' },
  { id: 'segundajerusalen', nombre: 'Segunda Jerusalén', telefono: '51908970134', badge: 'Agencia' },
  { id: 'rioja', nombre: 'Rioja', telefono: '51985795520', badge: 'Terminal' },
  { id: 'moyobamba', nombre: 'Moyobamba', telefono: '51966138011', badge: 'Terminal' },
  { id: 'tarapoto', nombre: 'Tarapoto', telefono: '51949001436', badge: 'Terminal Terrestre' },
  { id: 'chiclayo', nombre: 'Chiclayo', telefono: '51978569333', badge: 'Terminal Principal' },
  { id: 'cajamarca', nombre: 'Cajamarca', telefono: '51976877804', badge: 'Agencia Central' }
];

// 2. DEFINICIÓN DE RUTAS Y SUS ESCALAS
const rutasDefinidas = {
  'cajamarca-tarapoto': [
    'cajamarca', 'chota', 'cutervo', 'lacapilla', 'baguagrande', 
    'pedroruiz', 'pomacochas', 'naranjillo', 'naranjos', 
    'nuevacajamarca', 'segundajerusalen', 'rioja', 'moyobamba', 'tarapoto'
  ],
  'tarapoto-chiclayo': [
    'tarapoto', 'moyobamba', 'rioja', 'segundajerusalen', 'nuevacajamarca', 
    'naranjos', 'naranjillo', 'pomacochas', 'pedroruiz', 'baguagrande', 'chiclayo'
  ],
  'chota-chiclayo': [
    'chota', 'cutervo', 'chiclayo'
  ]
};

let rutaActiva = 'cajamarca-tarapoto';

// 3. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Configurar Tabs de Ruta
  const tabs = document.querySelectorAll('.route-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      rutaActiva = tab.dataset.route;
      cargarSelectores();
      actualizarEscalasVisuales();
      mostrarTodasOficinas(); // Resetear vista de oficinas al cambiar ruta
    });
  });

  // Hamburguesa móvil
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // Efecto Navbar Scroll
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Carga inicial
  cargarSelectores();
  actualizarEscalasVisuales();
  mostrarTodasOficinas();
  
  // Observador de revelación al scroll
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// 4. LÓGICA DE SELECTORES
function cargarSelectores() {
  const selectSalida = document.getElementById('ciudadSalida');
  const selectLlegada = document.getElementById('ciudadLlegada');
  const ciudadesRuta = rutasDefinidas[rutaActiva];

  // Limpiar y cargar Salida
  selectSalida.innerHTML = '<option value="">— Ciudad de Salida —</option>';
  ciudadesRuta.forEach(id => {
    const ciudad = oficinas.find(o => o.id === id);
    if (ciudad) {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = ciudad.nombre;
      selectSalida.appendChild(option);
    }
  });

  // Limpiar y cargar Llegada
  selectLlegada.innerHTML = '<option value="">— Ciudad de Llegada —</option>';
  ciudadesRuta.forEach(id => {
    const ciudad = oficinas.find(o => o.id === id);
    if (ciudad) {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = ciudad.nombre;
      selectLlegada.appendChild(option);
    }
  });
}

// 5. ACTUALIZAR CONTACTO
function actualizarContacto() {
  const salidaId = document.getElementById('ciudadSalida').value;
  const llegadaId = document.getElementById('ciudadLlegada').value;
  const grid = document.getElementById('oficinasGrid');
  const title = document.getElementById('contactoTitle');
  const subtitle = document.getElementById('contactoSubtitle');
  const verTodasBtn = document.getElementById('verTodasWrapper');

  actualizarEscalasVisuales();

  if (!salidaId || !llegadaId) {
    if (!salidaId && !llegadaId) mostrarTodasOficinas();
    return;
  }

  if (salidaId === llegadaId) {
    mostrarToast("La ciudad de salida y llegada no pueden ser la misma.");
    document.getElementById('ciudadLlegada').value = "";
    return;
  }

  // Filtrar oficinas relevantes (la de salida y la de llegada)
  const oficinaSalida = oficinas.find(o => o.id === salidaId);
  const oficinaLlegada = oficinas.find(o => o.id === llegadaId);

  title.textContent = "Oficinas para tu Viaje";
  subtitle.textContent = `Mostrando contactos para la ruta ${oficinaSalida.nombre} → ${oficinaLlegada.nombre}`;
  verTodasBtn.style.display = 'block';

  grid.innerHTML = "";
  
  // Renderizar primero la de salida (prioridad)
  renderOficinaCard(oficinaSalida, "Salida", true);
  renderOficinaCard(oficinaLlegada, "Llegada", false);

  // Scroll suave a los resultados
  scrollToSection('contacto');
}

// 6. RENDERIZAR TARJETA DE OFICINA
function renderOficinaCard(oficina, tipo, isHighlighted) {
  const grid = document.getElementById('oficinasGrid');
  const card = document.createElement('div');
  card.className = `oficina-card ${isHighlighted ? 'highlighted' : ''}`;
  
  const msgPasajes = `Hola, quiero información sobre pasajes desde ${oficina.nombre}.`;
  const msgEncomienda = `Hola, quiero cotizar el envío de una encomienda desde ${oficina.nombre}.`;

  card.innerHTML = `
    <div class="oficina-header">
      <div class="oficina-icon">
        <i data-lucide="${tipo === 'Salida' ? 'map-pin' : 'flag'}"></i>
      </div>
      <div class="oficina-info">
        <span class="oficina-badge">${tipo} • ${oficina.badge}</span>
        <h3 class="oficina-ciudad">${oficina.nombre}</h3>
        <div class="oficina-telefono">
          <i data-lucide="phone"></i>
          <span>+${oficina.telefono.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')}</span>
        </div>
      </div>
    </div>
    <div class="oficina-actions">
      <button class="btn-whatsapp" onclick="abrirWA('${oficina.telefono}', '${msgPasajes}')">
        <i data-lucide="message-circle"></i> WhatsApp Pasajes
      </button>
      <button class="btn-encomienda-card" onclick="abrirWA('${oficina.telefono}', '${msgEncomienda}')">
        <i data-lucide="package"></i> Encomiendas
      </button>
    </div>
  `;

  grid.appendChild(card);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// 7. MOSTRAR TODAS LAS OFICINAS
function mostrarTodasOficinas() {
  const grid = document.getElementById('oficinasGrid');
  const title = document.getElementById('contactoTitle');
  const subtitle = document.getElementById('contactoSubtitle');
  const verTodasBtn = document.getElementById('verTodasWrapper');

  title.textContent = "Nuestras Oficinas";
  subtitle.textContent = "Contáctanos directamente en cualquiera de nuestras sedes:";
  verTodasBtn.style.display = 'none';
  grid.innerHTML = "";

  // Filtrar oficinas que pertenecen a la ruta activa o todas si se prefiere
  const ciudadesRuta = rutasDefinidas[rutaActiva];
  
  oficinas.forEach(oficina => {
    // Solo mostrar las de la ruta actual para mantener relevancia
    if (ciudadesRuta.includes(oficina.id)) {
      renderOficinaCard(oficina, "Sede", false);
    }
  });
}

// 8. ESCALAS VISUALES (MAPA DE RUTA)
function actualizarEscalasVisuales() {
  const container = document.getElementById('escalasVisuales');
  const ciudadesRuta = rutasDefinidas[rutaActiva];
  const salidaId = document.getElementById('ciudadSalida').value;
  const llegadaId = document.getElementById('ciudadLlegada').value;

  container.innerHTML = "";
  const track = document.createElement('div');
  track.className = 'escalas-track';

  ciudadesRuta.forEach((id, index) => {
    const ciudad = oficinas.find(o => o.id === id);
    const isSalida = id === salidaId;
    const isLlegada = id === llegadaId;
    
    // Punto
    const punto = document.createElement('div');
    punto.className = 'escala-punto';
    
    const dot = document.createElement('div');
    dot.className = `escala-dot ${isSalida ? 'origin' : ''} ${isLlegada ? 'destino' : ''}`;
    
    const nombre = document.createElement('div');
    nombre.className = `escala-nombre ${isSalida ? 'origin' : ''} ${isLlegada ? 'destino' : ''}`;
    nombre.textContent = ciudad.nombre;

    punto.appendChild(dot);
    punto.appendChild(nombre);
    track.appendChild(punto);

    // Línea conector
    if (index < ciudadesRuta.length - 1) {
      const linea = document.createElement('div');
      linea.className = 'escala-linea';
      track.appendChild(linea);
    }
  });

  container.appendChild(track);
}

// 9. FUNCIONES DE UTILIDAD
function abrirWA(tel, msg) {
  const url = `https://wa.me/${tel}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function abrirWhatsAppGeneral() {
  abrirWA('51976877804', 'Hola TransAndino, necesito información general sobre sus servicios.');
}

function abrirWhatsAppEncomienda() {
  abrirWA('51976877804', 'Hola, quiero información para enviar una encomienda.');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80; // Altura del navbar
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');
}

function seleccionarRutaDirecta(rutaId) {
  const tab = document.querySelector(`.route-tab[data-route="${rutaId}"]`);
  if (tab) tab.click();
  scrollToSection('rutas');
}

function mostrarToast(mensaje) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 4000);
}
