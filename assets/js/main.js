document.addEventListener("DOMContentLoaded", () => {

  // MENÚ HAMBURGUESA
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

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

  // SECCIÓN ACTIVA EN NAVBAR
  const secciones = document.querySelectorAll("section, footer");
  const navLinks = document.querySelectorAll(".nav-menu a");

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

  bannerCerrar.addEventListener("click", () => {
    banner.style.display = "none";
  });

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

      subfiltrosAula.classList.remove("visible");
      subfiltrosOposiciones.classList.remove("visible");

      subfiltroActivo = "todos";
      document.querySelectorAll(".subfiltro-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll('.subfiltro-btn[data-subfiltro="todos"]').forEach((b) => b.classList.add("active"));

      if (filtroActivo === "aula") {
        subfiltrosAula.classList.add("visible");
      } else if (filtroActivo === "oposiciones") {
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

  // BOTÓN VOLVER ARRIBA
  const btnTop = document.getElementById("btn-top");

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

  // POPUP NEWSLETTER
const popupOverlay = document.getElementById("popup-overlay");
const popupCerrar = document.getElementById("popup-cerrar");
const popupOmitir = document.getElementById("popup-omitir");

if (!localStorage.getItem("suscrito")) {
    setTimeout(() => {
        popupOverlay.classList.add("activo");
    }, 3000);
}

function cerrarPopup() {
    popupOverlay.classList.remove("activo");
}

popupCerrar.addEventListener("click", cerrarPopup);
popupOmitir.addEventListener("click", cerrarPopup);

popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) cerrarPopup();
});

document.getElementById("sib-form-popup").addEventListener("submit", () => {
    localStorage.setItem("suscrito", "true");
    setTimeout(() => cerrarPopup(), 1000);
});

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