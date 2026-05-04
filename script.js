const WHATSAPP_GENERAL = "51976877804";

const offices = {
  Cajamarca: {
    phone: "51976877804",
    region: "Cajamarca",
    label: "Oficina Cajamarca",
    image: "Fotos/oficina-cajamarca.jpg"
  },
  Chota: {
    phone: "51976877804",
    region: "Cajamarca",
    label: "Chota Principal",
    image: "Fotos/oficina-principal.jpg"
  },
  Cochabamba: {
    phone: "51976877804",
    region: "Cajamarca",
    label: "Cochabamba",
    image: "Fotos/oficina-principal.jpg"
  },
  Cutervo: {
    phone: "51952117428",
    region: "Cajamarca",
    label: "Oficina Cutervo",
    image: "Fotos/oficina-cutervo.jpg"
  },
  "La Capilla": {
    phone: "51976877804",
    region: "Cajamarca",
    label: "La Capilla",
    image: "Fotos/oficina-lacapilla.jpg"
  },
  "Bagua Grande": {
    phone: "51938965738",
    region: "Amazonas",
    label: "Oficina Bagua Grande",
    image: "Fotos/oficina-baguagrande.jpg"
  },
  "Pedro Ruiz": {
    phone: "51976877804",
    region: "Amazonas",
    label: "Pedro Ruiz",
    image: "Fotos/oficina-pedroruiz.jpg"
  },
  Pomacochas: {
    phone: "51952856792",
    region: "Amazonas",
    label: "Oficina Pomacochas",
    image: "Fotos/oficina-pomacochas.jpg"
  },
  Naranjillo: {
    phone: "51975790400",
    region: "San Martin",
    label: "Oficina Naranjillo",
    image: "Fotos/oficina-naranjillo.jpg"
  },
  Naranjos: {
    phone: "51942444294",
    region: "San Martin",
    label: "Oficina Naranjos",
    image: "Fotos/oficina-naranjos.jpg"
  },
  "Nueva Cajamarca": {
    phone: "51976877796",
    region: "San Martin",
    label: "Oficina Nueva Cajamarca",
    image: "Fotos/oficina-nuevacajamarca.jpg"
  },
  "Segunda Jerusal\u00e9n": {
    phone: "51908970134",
    region: "San Martin",
    label: "Oficina Segunda Jerusal\u00e9n",
    image: "Fotos/oficina-segundajerusalen.jpg"
  },
  Rioja: {
    phone: "51985795520",
    region: "San Martin",
    label: "Oficina Rioja",
    image: "Fotos/oficina-rioja.jpg"
  },
  Moyobamba: {
    phone: "51966138011",
    region: "San Martin",
    label: "Oficina Moyobamba",
    image: "Fotos/oficina-moyobamba.jpg"
  },
  Tarapoto: {
    phone: "51949001436",
    region: "San Martin",
    label: "Oficina Tarapoto",
    image: "Fotos/oficina-tarapoto.jpg"
  },
  Chiclayo: {
    phone: "51978569333",
    region: "Lambayeque",
    label: "Oficina Chiclayo",
    image: "Fotos/oficina-chiclayo.jpg"
  }
};

const routes = {
  rutaA: {
    id: "rutaA",
    name: "Ruta A",
    title: "Cajamarca - Tarapoto",
    detail: "Cajamarca, Chota, Cutervo, Bagua Grande, Moyobamba y Tarapoto (ida y vuelta)",
    icon: "mountain",
    cities: [
      "Cajamarca",
      "Chota",
      "Cochabamba",
      "Cutervo",
      "La Capilla",
      "Bagua Grande",
      "Pedro Ruiz",
      "Pomacochas",
      "Naranjillo",
      "Naranjos",
      "Nueva Cajamarca",
      "Segunda Jerusal\u00e9n",
      "Rioja",
      "Moyobamba",
      "Tarapoto"
    ]
  },
  rutaB: {
    id: "rutaB",
    name: "Ruta B",
    title: "Chiclayo - Tarapoto",
    detail: "Chiclayo, Bagua Grande, Pedro Ruiz, Pomacochas, Nueva Cajamarca, Rioja y Tarapoto (ida y vuelta)",
    icon: "map",
    cities: [
      "Chiclayo",
      "Bagua Grande",
      "Pedro Ruiz",
      "Pomacochas",
      "Naranjillo",
      "Naranjos",
      "Nueva Cajamarca",
      "Segunda Jerusal\u00e9n",
      "Rioja",
      "Moyobamba",
      "Tarapoto"
    ]
  },
  rutaC: {
    id: "rutaC",
    name: "Ruta C",
    title: "Chota - Chiclayo",
    detail: "Chota, Cochabamba y Chiclayo (ida y vuelta)",
    icon: "route",
    cities: ["Chota", "Cochabamba", "Chiclayo"]
  }
};

let activeRouteId = "rutaA";

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  renderRouteTabs();
  populateSelects();
  renderRouteLine();
  setGlobalWhatsappLinks();
  refreshIcons();
});

function cacheElements() {
  els.header = document.getElementById("siteHeader");
  els.menuToggle = document.getElementById("menuToggle");
  els.mobileNav = document.getElementById("mobileNav");
  els.routeTabs = document.getElementById("routeTabs");
  els.routeForm = document.getElementById("routeForm");
  els.origin = document.getElementById("originSelect");
  els.destination = document.getElementById("destinationSelect");
  els.swap = document.getElementById("swapButton");
  els.routeLine = document.getElementById("routeLine");
  els.result = document.getElementById("contactResult");
  els.headerWhatsapp = document.getElementById("headerWhatsapp");
  els.footerWhatsapp = document.getElementById("footerWhatsapp");
  els.floatingWhatsapp = document.getElementById("floatingWhatsapp");
  els.encomiendaWhatsapp = document.getElementById("encomiendaWhatsapp");
}

function bindEvents() {
  window.addEventListener("scroll", () => {
    els.header.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });

  els.menuToggle.addEventListener("click", () => {
    const isOpen = els.mobileNav.classList.toggle("is-open");
    els.menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  els.mobileNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      els.mobileNav.classList.remove("is-open");
      els.menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  els.origin.addEventListener("change", handleSelectionChange);
  els.destination.addEventListener("change", handleSelectionChange);
  els.swap.addEventListener("click", swapCities);
  els.routeForm.addEventListener("submit", (event) => event.preventDefault());
}

function renderRouteTabs() {
  els.routeTabs.innerHTML = Object.values(routes).map((route) => `
    <button class="route-tab route-tab--${route.id} ${route.id === activeRouteId ? "is-active" : ""}" type="button" data-route="${route.id}" aria-pressed="${route.id === activeRouteId}">
      <span class="route-icon"><i data-lucide="${route.icon || "bus-front"}"></i></span>
      <span>
        <strong>${route.name}: ${route.title}</strong>
        <span>${route.detail}</span>
      </span>
    </button>
  `).join("");

  els.routeTabs.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      activeRouteId = button.dataset.route;
      populateSelects();
      renderRouteTabs();
      renderRouteLine();
      hideResult();
      refreshIcons();
    });
  });
}

function populateSelects() {
  const route = routes[activeRouteId];
  const options = route.cities.map((city) => `<option value="${city}">${city}</option>`).join("");
  els.origin.innerHTML = `<option value="">Selecciona origen</option>${options}`;
  els.destination.innerHTML = `<option value="">Selecciona destino</option>${options}`;
}

function handleSelectionChange() {
  const origin = els.origin.value;
  const destination = els.destination.value;
  renderRouteLine(origin, destination);

  if (!origin || !destination || origin === destination) {
    hideResult();
    return;
  }

  renderContactResult(origin, destination);
}

function swapCities() {
  const origin = els.origin.value;
  const destination = els.destination.value;
  els.origin.value = destination;
  els.destination.value = origin;
  handleSelectionChange();
}

function renderRouteLine(origin = "", destination = "") {
  const route = routes[activeRouteId];
  const originIndex = route.cities.indexOf(origin);
  const destinationIndex = route.cities.indexOf(destination);
  const hasSegment = originIndex >= 0 && destinationIndex >= 0 && origin !== destination;
  const start = hasSegment ? Math.min(originIndex, destinationIndex) : -1;
  const end = hasSegment ? Math.max(originIndex, destinationIndex) : -1;

  els.routeLine.innerHTML = route.cities.map((city, index) => {
    const selected = city === origin || city === destination;
    const between = hasSegment && index > start && index < end;
    return `<span class="route-stop ${selected ? "is-selected" : ""} ${between ? "is-between" : ""}">${city}</span>`;
  }).join("");
}

function renderContactResult(origin, destination) {
  const route = routes[activeRouteId];
  const originIndex = route.cities.indexOf(origin);
  const destinationIndex = route.cities.indexOf(destination);
  const segmentCities = getSegmentCities(route.cities, originIndex, destinationIndex);
  const contactCities = unique([origin, destination]);
  const routeText = `${origin} - ${destination}`;
  const directionText = originIndex <= destinationIndex ? "ida" : "vuelta";

  const officeRows = contactCities.map((city) => {
    const office = offices[city];
    const passengerLink = makeWhatsappLink(
      office.phone,
      buildPassengerMessage(route, directionText, origin, destination, segmentCities)
    );
    const parcelLink = makeWhatsappLink(
      office.phone,
      buildParcelMessage(route, directionText, origin, destination, segmentCities)
    );

    return `
      <article class="office-row">
        <div class="office-top">
          <img src="${office.image}" alt="${office.label}" />
          <div>
            <strong>${city}</strong>
            <span>${office.label} - ${office.region}</span>
            <span class="office-phone"><i data-lucide="phone"></i>${formatPhone(office.phone)}</span>
          </div>
        </div>
        <div class="office-actions">
          <a class="passenger-link" href="${passengerLink}" target="_blank" rel="noopener noreferrer">
            <i data-lucide="message-circle"></i>
            Pasajeros
          </a>
          <a class="parcel-link" href="${parcelLink}" target="_blank" rel="noopener noreferrer">
            <i data-lucide="package"></i>
            Encomiendas
          </a>
        </div>
      </article>
    `;
  }).join("");

  els.result.hidden = false;
  els.result.innerHTML = `
    <div class="contact-shell">
      <div class="contact-head">
        <span>${route.name}</span>
        <h3>${routeText}</h3>
      </div>
      <div class="office-list">${officeRows}</div>
      <p class="route-note">
        Tramo seleccionado: ${segmentCities.join(" / ")}.
      </p>
    </div>
  `;
  setEncomiendaWhatsapp(origin, destination);
  refreshIcons();
}

function hideResult() {
  els.result.hidden = true;
  els.result.innerHTML = "";
  setEncomiendaWhatsapp();
}

function getSegmentCities(cities, originIndex, destinationIndex) {
  if (originIndex < 0 || destinationIndex < 0) return [];
  const start = Math.min(originIndex, destinationIndex);
  const end = Math.max(originIndex, destinationIndex);
  const segment = cities.slice(start, end + 1);
  return originIndex > destinationIndex ? segment.reverse() : segment;
}

function setGlobalWhatsappLinks() {
  const general = makeWhatsappLink(
    WHATSAPP_GENERAL,
    "Hola, deseo informacion de rutas, horarios y tarifas de Transportes Torres."
  );
  els.headerWhatsapp.href = general;
  els.footerWhatsapp.href = general;
  els.floatingWhatsapp.href = general;
  setEncomiendaWhatsapp();
}

function setEncomiendaWhatsapp(origin = "", destination = "") {
  const phone = origin && offices[origin] ? offices[origin].phone : WHATSAPP_GENERAL;
  const route = routes[activeRouteId];
  const routeText = origin && destination ? `${origin} - ${destination}` : route.title;
  const directionText = origin && destination
    ? (route.cities.indexOf(origin) <= route.cities.indexOf(destination) ? "ida" : "vuelta")
    : "ida o vuelta";
  els.encomiendaWhatsapp.href = makeWhatsappLink(
    phone,
    `Hola Transportes Torres, deseo cotizar una encomienda en la ruta ${routeText} (${directionText}).`
  );
}

function buildPassengerMessage(route, directionText, origin, destination, segmentCities) {
  return `Hola Transportes Torres, quiero viajar en la ruta ${route.title}, tramo ${origin} -> ${destination}. Me comparten horario de salida, precio y disponibilidad, por favor.`;
}

function buildParcelMessage(route, directionText, origin, destination, segmentCities) {
  return `Hola Transportes Torres, deseo enviar una encomienda en la ruta ${route.title}, tramo ${origin} -> ${destination}. Me indican tarifa, horarios y tiempo estimado de entrega, por favor.`;
}

function makeWhatsappLink(phone, message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function formatPhone(phone) {
  return `+${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 8)} ${phone.slice(8)}`;
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
