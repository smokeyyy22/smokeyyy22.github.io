// ============ MOBILE NAV ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ TERMINAL TYPING EFFECT ============
const cmdEl = document.getElementById('typedCmd');
const outEl = document.getElementById('typedOut');

const command = 'whoami';
const output = "salwa-drissi\n> cybersecurity engineering student\n> offensive + defensive security";

function typeText(el, text, speed, onDone) {
  let i = 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.textContent = text;
    if (onDone) onDone();
    return;
  }
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (onDone) onDone();
    }
  }, speed);
}

if (cmdEl && outEl) {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      typeText(cmdEl, command, 90, () => {
        setTimeout(() => {
          outEl.textContent = output;
        }, 300);
      });
    }, 500);
  });
}

// ============ SCROLL REVEAL ============
const revealTargets = document.querySelectorAll('.section, .case, .skillcat, .stat');
revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
