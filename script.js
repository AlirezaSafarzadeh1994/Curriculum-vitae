const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

document.documentElement.dataset.theme = initialTheme;
updateThemeIcon(initialTheme);

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (navLinks) {
  navLinks.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      document.body.classList.remove('nav-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;

  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
