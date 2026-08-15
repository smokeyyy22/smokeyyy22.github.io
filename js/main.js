// ============ BOOT SEQUENCE ============
const bootLines = document.getElementById('bootLines');
const bootFill = document.getElementById('bootFill');
const bootPct = document.getElementById('bootPct');
const body = document.body;

const bootLog = [
  'establishing secure session…',
  'loading operative profile: salwa-drissi',
  'mounting skill tree…',
  'decrypting mission log…',
  'access granted.'
];

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function runBoot() {
  if (prefersReduced || !bootLines) {
    body.classList.remove('is-booting');
    return;
  }
  let lineIndex = 0;
  let pct = 0;

  const lineTimer = setInterval(() => {
    if (lineIndex < bootLog.length) {
      bootLines.textContent += (lineIndex > 0 ? '\n' : '') + '> ' + bootLog[lineIndex];
      lineIndex++;
    } else {
      clearInterval(lineTimer);
    }
  }, 260);

  const pctTimer = setInterval(() => {
    pct += Math.random() * 14 + 6;
    if (pct >= 100) {
      pct = 100;
      clearInterval(pctTimer);
      setTimeout(() => body.classList.remove('is-booting'), 350);
    }
    bootFill.style.width = pct + '%';
    bootPct.textContent = 'INITIALIZING… ' + Math.floor(pct) + '%';
  }, 180);
}

runBoot();
// Safety net: never trap the user on the boot screen
setTimeout(() => body.classList.remove('is-booting'), 3500);

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
  if (prefersReduced) { el.textContent = text; if (onDone) onDone(); return; }
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) { clearInterval(interval); if (onDone) onDone(); }
  }, 90);
}

if (cmdEl && outEl) {
  setTimeout(() => {
    typeText(cmdEl, command, 90, () => {
      setTimeout(() => { outEl.textContent = output; }, 300);
    });
  }, 2200);
}

// ============ SCROLL REVEAL ============
const revealTargets = document.querySelectorAll('.section, .case, .statcat, .stat-block');
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

// ============ XP BAR FILL ANIMATION ============
const xpFills = document.querySelectorAll('.xpbars__fill');
xpFills.forEach(fill => {
  fill.dataset.target = fill.style.width;
  fill.style.width = '0%';
  fill.style.transition = 'width 1.1s ease';
});
const xpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.xpbars__fill').forEach(fill => {
        fill.style.width = fill.dataset.target;
      });
      xpObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.statcat').forEach(el => xpObserver.observe(el));
