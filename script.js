// =========================================
//  Portfolio Script — Amir Hamza (Ultra Pro Edition)
// =========================================

// ======= Utility Shortcuts =======
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ======= Navigation Toggle =======
const navToggle = $('#navToggle');
const nav = $('#nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    navToggle.classList.toggle('active');
    navToggle.textContent = navToggle.classList.contains('active') ? '✖' : '☰';
  });

  $$('.nav a').forEach((link) =>
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navToggle.classList.remove('active');
      navToggle.textContent = '☰';
    })
  );
}

// ======= Smooth Scroll =======
$$('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  });
});

// ======= Active Section Highlight =======
const sections = $$('section');
const navLinks = $$('.nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop && scrollY < sectionTop + section.offsetHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) =>
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
  );
});

// ======= Scroll Progress Bar =======
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
  const percent =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = `${percent}%`;
});

// ======= Header Shrink on Scroll =======
const header = $('.site-header');
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.classList.toggle('shrink', current > 80);
  header.classList.toggle('hide', current > lastScrollTop);
  lastScrollTop = current <= 0 ? 0 : current;
});

// ======= Scroll Animations (Sections + Footer) =======
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.2 }
);
$$('section, .footer-container > div').forEach((el) => observer.observe(el));

// ======= Dark/Light Mode Toggle + System Sync =======
const modeToggle = document.createElement('button');
modeToggle.className = 'theme-toggle';
document.body.appendChild(modeToggle);

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const defaultTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

const setTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  modeToggle.innerHTML =
    theme === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
};

setTheme(defaultTheme);
modeToggle.addEventListener('click', () => {
  const newTheme =
    document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// ======= Typing Animation in Hero =======
const heroSubtitle = document.querySelector('.hero h2');
if (heroSubtitle) {
  const roles = [
    'Front-End Developer',
    'UI/UX Designer',
    'Web Animator',
    'Creative Technologist',
  ];
  let i = 0;
  heroSubtitle.style.opacity = 1;
  setInterval(() => {
    heroSubtitle.style.opacity = 0;
    setTimeout(() => {
      heroSubtitle.textContent = roles[i];
      heroSubtitle.style.opacity = 1;
      i = (i + 1) % roles.length;
    }, 400);
  }, 2500);
}

// ======= Newsletter Form with Custom Popup =======
const newsletter = document.querySelector('.newsletter');
if (newsletter) {
  newsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletter.querySelector('input');
    const email = input.value.trim();
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

    const popup = document.createElement('div');
    popup.className = 'newsletter-popup';
    popup.innerHTML = pattern.test(email)
      ? '<i class="fas fa-check-circle"></i> Subscribed successfully! 🎉'
      : '<i class="fas fa-exclamation-circle"></i> Please enter a valid email.';
    document.body.appendChild(popup);
    popup.classList.add('show');
    setTimeout(() => popup.remove(), 3000);
    if (pattern.test(email)) input.value = '';
  });
}

// ======= Footer Signature Glow =======
const signature = document.querySelector('.site-footer h3');
if (signature) {
  signature.classList.add('footer-glow');
}

// ======= Footer Year =======
const yearEl = $('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
// ======= Ultra Premium Cursor =======
const cursor = document.createElement("div");
const follower = document.createElement("div");
cursor.className = "cursor-dot";
follower.className = "cursor-outline";
document.body.appendChild(cursor);
document.body.appendChild(follower);

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateCursor() {
  posX += (mouseX - posX) * 0.15;
  posY += (mouseY - posY) * 0.15;

  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;

  requestAnimationFrame(updateCursor);
}
updateCursor();

// Add hover scaling
document.querySelectorAll("a, button, .card, .clickable").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
    follower.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
    follower.classList.remove("active");
  });
});
// ===== Page Load Fade-In =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===== Scroll Reveal Trigger =====
const animatedSections = document.querySelectorAll('section, .footer-container > div');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

animatedSections.forEach(sec => revealObserver.observe(sec));
