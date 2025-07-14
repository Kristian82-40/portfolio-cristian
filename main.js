// Typing effect for subtitle
const typingElement = document.getElementById('typing');
if (typingElement) {
  const phrases = [
    'Analista de Datos',
    'Desarrollador Web'
  ];
  let phraseIndex = 0, letterIndex = 0, typing = true;

  function type() {
    if (typing) {
      if (letterIndex < phrases[phraseIndex].length) {
        typingElement.textContent += phrases[phraseIndex][letterIndex++];
        setTimeout(type, 80);
      } else {
        typing = false;
        setTimeout(erase, 1200);
      }
    }
  }
  function erase() {
    if (!typing) {
      if (letterIndex > 0) {
        typingElement.textContent = phrases[phraseIndex].slice(0, --letterIndex);
        setTimeout(erase, 40);
      } else {
        typing = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 600);
      }
    }
  }
  type();
}

// Navbar mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  menuToggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navLinks.classList.toggle('open');
    }
  });
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 260) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Dark mode toggle
const darkModeBtn = document.getElementById('toggleDarkMode');
const darkModeIcon = document.getElementById('darkModeIcon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function setDarkMode(on) {
  document.body.classList.toggle('dark-mode', on);
  if (darkModeIcon) darkModeIcon.textContent = on ? '☀️' : '🌙';
  localStorage.setItem('darkMode', on ? 'on' : 'off');
}
// Init
const saved = localStorage.getItem('darkMode');
setDarkMode(saved === 'on' || (saved === null && prefersDark));
if (darkModeBtn) {
  darkModeBtn.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark-mode'));
  });
}

// Fade-in animation on load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.add('show');
  });
});
