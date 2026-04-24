document.addEventListener("DOMContentLoaded", () => {

  // MENÚ HAMBURGUESA
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("open");
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("open");
      });
    });
  }

  // SECCIÓN ACTIVA EN NAVBAR
  const secciones = document.querySelectorAll("section, footer");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (secciones.length && navLinks.length) {
    const observerNav = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("activo");
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("activo");
            }
          });
        }
      });
    }, { threshold: 0.4 });

    secciones.forEach((seccion) => observerNav.observe(seccion));
  }

  // SCROLL ANIMATIONS
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
        entry.target.classList.add("hidden");
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // BANNER
  const banner = document.getElementById("banner");
  const bannerCerrar = document.getElementById("banner-cerrar");

  if (banner && bannerCerrar) {
    bannerCerrar.addEventListener("click", () => {
      banner.style.display = "none";
    });
  }

  // FILTROS Y SUBFILTROS DE MATERIALES
  const filtros = document.querySelectorAll(".filtro-btn");
  const subfiltrosAula = document.getElementById("subfiltros-aula");
  const subfiltrosOposiciones = document.getElementById("subfiltros-oposiciones");
  const materialesCards = document.querySelectorAll(".material-card");

  let filtroActivo = "todos";
  let subfiltroActivo = "todos";

  function aplicarFiltros() {
    materialesCards.forEach((card) => {
      const categoria = card.dataset.categoria;
      const subfiltro = card.dataset.subfiltro;

      const esSoloCategoria = card.classList.contains("solo-categoria") && filtroActivo === "todos";
      const esSoloSubfiltro = card.classList.contains("solo-subfiltro") && subfiltroActivo !== card.dataset.subfiltro;

      if (esSoloCategoria || esSoloSubfiltro) {
        card.classList.add("oculta");
        return;
      }

      const pasaCategoria = filtroActivo === "todos" || categoria === filtroActivo;
      const pasaSubfiltro = subfiltroActivo === "todos" || subfiltro === subfiltroActivo;

      if (pasaCategoria && pasaSubfiltro) {
        card.classList.remove("oculta");
      } else {
        card.classList.add("oculta");
      }
    });
  }

  filtros.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      filtros.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filtroActivo = btn.dataset.filtro;

      if (subfiltrosAula) subfiltrosAula.classList.remove("visible");
      if (subfiltrosOposiciones) subfiltrosOposiciones.classList.remove("visible");

      subfiltroActivo = "todos";
      document.querySelectorAll(".subfiltro-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll('.subfiltro-btn[data-subfiltro="todos"]').forEach((b) => b.classList.add("active"));

      if (filtroActivo === "aula" && subfiltrosAula) {
        subfiltrosAula.classList.add("visible");
      } else if (filtroActivo === "oposiciones" && subfiltrosOposiciones) {
        subfiltrosOposiciones.classList.add("visible");
      }

      aplicarFiltros();
    });
  });

  document.querySelectorAll(".subfiltro-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".subfiltro-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      subfiltroActivo = btn.dataset.subfiltro;
      aplicarFiltros();
    });
  });

  aplicarFiltros();

  // FAQ ACORDEÓN
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  item.querySelector('.faq-pregunta').addEventListener('click', () => {
    const estaAbierto = item.classList.contains('abierto');
    faqItems.forEach(i => i.classList.remove('abierto'));
    if (!estaAbierto) {
      item.classList.add('abierto');
    }
  });
});

  // BOTÓN VOLVER ARRIBA
  const btnTop = document.getElementById("btn-top");

  if (btnTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btnTop.classList.add("visible");
      } else {
        btnTop.classList.remove("visible");
      }
    });

    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

 // POPUP NEWSLETTER
const popupOverlay = document.getElementById("popup-overlay");
const popupCerrar = document.getElementById("popup-cerrar");
const popupOmitir = document.getElementById("popup-omitir");
const abrirPopupNewsletter = document.getElementById("abrir-popup-newsletter");
const formularioNewsletter = document.getElementById("sib-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

function abrirPopup() {
  if (popupOverlay) {
    popupOverlay.classList.add("activo");
  }
}

function cerrarPopup() {
  if (popupOverlay) {
    popupOverlay.classList.remove("activo");
  }
}

// Mostrar automáticamente a los 3 segundos si el usuario no se ha suscrito
if (popupOverlay && !localStorage.getItem("suscrito")) {
  setTimeout(() => {
    abrirPopup();
  }, 3000);
}

// Abrir popup al pulsar el botón del footer
if (abrirPopupNewsletter) {
  abrirPopupNewsletter.addEventListener("click", abrirPopup);
}

// Cerrar con la X
if (popupCerrar) {
  popupCerrar.addEventListener("click", cerrarPopup);
}

// Cerrar con "Ahora no"
if (popupOmitir) {
  popupOmitir.addEventListener("click", cerrarPopup);
}

// Cerrar al hacer click fuera del popup
if (popupOverlay) {
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      cerrarPopup();
    }
  });
}

// No cerrar el popup inmediatamente al enviar
if (formularioNewsletter) {
  formularioNewsletter.addEventListener("submit", () => {
    // No cerramos aquí.
    // Esperamos a que Brevo muestre éxito o error.
  });
}

// Detectar éxito real de Brevo
if (successMessage) {
  const observerSuccess = new MutationObserver(() => {
    const estaVisible =
      successMessage.style.display !== "none" &&
      successMessage.offsetParent !== null;

    if (estaVisible) {
      localStorage.setItem("suscrito", "true");

      setTimeout(() => {
        cerrarPopup();
      }, 4000);
    }
  });

  observerSuccess.observe(successMessage, {
    attributes: true,
    attributeFilter: ["style", "class"]
  });
}

// Detectar error real de Brevo
if (errorMessage) {
  const observerError = new MutationObserver(() => {
    const estaVisible =
      errorMessage.style.display !== "none" &&
      errorMessage.offsetParent !== null;

    if (estaVisible) {
      // No cerramos el popup.
      // Lo dejamos abierto para que el usuario vea el error.
    }
  });

  observerError.observe(errorMessage, {
    attributes: true,
    attributeFilter: ["style", "class"]
  });
}

  // FLIP EN MÓVIL
  const isMobile = () => window.innerWidth <= 768;

  document.querySelectorAll(".material-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!isMobile()) return;
      if (e.target.classList.contains("btn")) return;
      e.stopPropagation();

      if (card.classList.contains("flipped")) {
        card.classList.remove("flipped");
      } else {
        card.classList.add("flipped");
      }
    });
  });

});