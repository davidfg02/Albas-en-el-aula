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
  }, { threshold: 0.5});

// FILTRO DE MATERIALES
const filtros = document.querySelectorAll('.filtro-btn');
const materialesCards = document.querySelectorAll('.material-card');

filtros.forEach(btn => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtro = btn.dataset.filtro;

    materialesCards.forEach(card => {
      if (filtro === 'todos' || card.dataset.categoria === filtro) {
        card.classList.remove('oculta');
      } else {
        card.classList.add('oculta');
      }
    });
  });
});
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});