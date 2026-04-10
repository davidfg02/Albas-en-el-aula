document.addEventListener('DOMContentLoaded', () => {

  // MENÚ HAMBURGUESA
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // SECCIÓN ACTIVA EN NAVBAR
const secciones = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.nav-menu a');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('activo');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('activo');
        }
      });
    }
  });
}, { threshold: 0.4 });

secciones.forEach(seccion => observerNav.observe(seccion));

  // SCROLL ANIMATIONS
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
        entry.target.classList.add('hidden');
      }
    });
  }, { threshold: 0.25});

  // BANNER
const banner = document.getElementById('banner');
const bannerCerrar = document.getElementById('banner-cerrar');

bannerCerrar.addEventListener('click', () => {
  banner.style.display = 'none';
});

// FILTROS Y SUBFILTROS DE MATERIALES
const filtros = document.querySelectorAll('.filtro-btn');
const subfiltros = document.querySelectorAll('.subfiltro-btn');
const materialesCards = document.querySelectorAll('.material-card');

let filtroActivo = 'todos';
let subfiltroActivo = 'todos';

function aplicarFiltros() {
  materialesCards.forEach(card => {
    const categoria = card.dataset.categoria;
    const subfiltro = card.dataset.subfiltro;

    const pasaCategoria = filtroActivo === 'todos' || categoria === filtroActivo;
    const pasaSubfiltro = subfiltroActivo === 'todos' || subfiltro === subfiltroActivo;

    if (pasaCategoria && pasaSubfiltro) {
      card.classList.remove('oculta');
    } else {
      card.classList.add('oculta');
    }
  });
}

filtros.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtroActivo = btn.dataset.filtro;
    aplicarFiltros();
  });
});

subfiltros.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    subfiltros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    subfiltroActivo = btn.dataset.subfiltro;
    aplicarFiltros();
  });
});

// BOTÓN VOLVER ARRIBA
const btnTop = document.getElementById('btn-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    btnTop.classList.add('visible');
  } else {
    btnTop.classList.remove('visible');
  }
});

btnTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// FORMULARIO SUSCRIPCIÓN
const btnSuscribir = document.getElementById('btn-suscribir');
const emailInput = document.getElementById('email-input');
const formularioMensaje = document.getElementById('formulario-mensaje');

btnSuscribir.addEventListener('click', () => {
  const email = emailInput.value.trim();

  if (!email || !email.includes('@')) {
    formularioMensaje.textContent = '⚠️ Introduce un email válido.';
    formularioMensaje.style.color = '#e76f51';
    return;
  }

  formularioMensaje.textContent = '✅ ¡Gracias! Te avisaremos cuando haya novedades.';
  formularioMensaje.style.color = '#2a6a7a';
  emailInput.value = '';
});
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// POPUP NEWSLETTER
const popupOverlay = document.getElementById('popup-overlay');
const popupCerrar = document.getElementById('popup-cerrar');
const popupOmitir = document.getElementById('popup-omitir');
const popupBtn = document.getElementById('popup-btn');
const popupEmail = document.getElementById('popup-email');
const popupMensaje = document.getElementById('popup-mensaje');

setTimeout(() => {
  popupOverlay.classList.add('activo');
}, 3000);

function cerrarPopup() {
  popupOverlay.classList.remove('activo');
}

popupCerrar.addEventListener('click', cerrarPopup);
popupOmitir.addEventListener('click', cerrarPopup);

popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) cerrarPopup();
});

popupBtn.addEventListener('click', () => {
  const email = popupEmail.value.trim();

  if (!email || !email.includes('@')) {
    popupMensaje.textContent = '⚠️ Introduce un email válido.';
    popupMensaje.style.color = '#e76f51';
    return;
  }

  popupMensaje.textContent = '✅ ¡Gracias! Te avisaremos de todas las novedades.';
  popupMensaje.style.color = '#2a6a7a';
  popupEmail.value = '';

  setTimeout(() => cerrarPopup(), 2000);
});
