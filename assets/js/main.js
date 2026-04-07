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