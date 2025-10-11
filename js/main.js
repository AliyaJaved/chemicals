// Mobile Menu Toggle
const hamburgerButton = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburgerButton && navMenu) {
  hamburgerButton.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerButton.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });
}

// Sticky header background on scroll
const header = document.getElementById('header');
const toggleHeaderScrolled = () => {
  if (!header) return;
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
toggleHeaderScrolled();
window.addEventListener('scroll', toggleHeaderScrolled, { passive: true });

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement && target.hash && target.getAttribute('href')?.startsWith('#')) {
    const el = document.querySelector(target.hash);
    if (el) {
      e.preventDefault();
      const headerOffset = header?.offsetHeight || 0;
      const rect = el.getBoundingClientRect();
      const offsetTop = rect.top + window.pageYOffset - (headerOffset - 1);
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      if (navMenu?.classList.contains('open')) {
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    }
  }
});

// Product filter functionality
const filterSelect = document.getElementById('product-filter');
const productGrid = document.getElementById('product-grid');
const applyProductFilter = (value) => {
  if (!productGrid) return;
  const cards = Array.from(productGrid.querySelectorAll('.product-card'));
  cards.forEach((card) => {
    const category = card.getAttribute('data-category');
    const shouldShow = value === 'all' || category === value;
    card.toggleAttribute('hidden', !shouldShow);
  });
};
if (filterSelect instanceof HTMLSelectElement) {
  applyProductFilter(filterSelect.value);
  filterSelect.addEventListener('change', (e) => {
    const value = (e.target).value;
    applyProductFilter(value);
  });
}

// Lightbox gallery with keyboard navigation
const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
let galleryItems = [];
let activeIndex = -1;

function openLightbox(index) {
  if (!lightbox || !lightboxImg) return;
  activeIndex = index;
  const src = galleryItems[activeIndex].getAttribute('src');
  const alt = galleryItems[activeIndex].getAttribute('alt') || 'Preview';
  lightboxImg.setAttribute('src', src);
  lightboxImg.setAttribute('alt', alt);
  lightbox.removeAttribute('hidden');
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.setAttribute('hidden', '');
  activeIndex = -1;
}
function showPrev() {
  if (activeIndex <= 0) activeIndex = galleryItems.length - 1; else activeIndex -= 1;
  openLightbox(activeIndex);
}
function showNext() {
  if (activeIndex >= galleryItems.length - 1) activeIndex = 0; else activeIndex += 1;
  openLightbox(activeIndex);
}

if (galleryGrid) {
  galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
  galleryItems.forEach((img, idx) => {
    img.addEventListener('click', () => openLightbox(idx));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); } });
  });
}
lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', showPrev);
lightboxNext?.addEventListener('click', showNext);
document.addEventListener('keydown', (e) => {
  if (lightbox && !lightbox.hasAttribute('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  }
});
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// Contact form client-side validation
const contactForm = document.getElementById('contact-form');
const errName = document.getElementById('error-name');
const errEmail = document.getElementById('error-email');
const errPhone = document.getElementById('error-phone');
const errMessage = document.getElementById('error-message');
const successMsg = document.getElementById('form-success');

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function validatePhone(value) {
  return /^[+()\-\s\d]{7,20}$/.test(value);
}

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  let valid = true;
  if (!name) { errName.textContent = 'Please enter your name.'; valid = false; } else errName.textContent = '';
  if (!email || !validateEmail(email)) { errEmail.textContent = 'Please enter a valid email.'; valid = false; } else errEmail.textContent = '';
  if (!phone || !validatePhone(phone)) { errPhone.textContent = 'Please enter a valid phone.'; valid = false; } else errPhone.textContent = '';
  if (!message || message.length < 10) { errMessage.textContent = 'Please provide a message (min 10 chars).'; valid = false; } else errMessage.textContent = '';

  if (!valid) return;

  // Replace with your form handling: email service, backend API, etc.
  // For now, just show a success message.
  successMsg?.removeAttribute('hidden');
  form.reset();
});

// Auto-update year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// Download brochure: native download attribute (better for touch devices)
// No JS interception needed; keep id for styling/test hooks

// Inline guidance for replacements (dev notes):
// - Replace logo at assets/logo.svg (header and footer img src)
// - Replace hero background at assets/landing-page.jpg (set via .hero-media in css)
// - Replace about image at assets/about.svg
// - Replace product images at assets/product-*.svg
// - Replace gallery images at assets/gallery-*.svg
// - Replace brochure at assets/brochure.pdf
// - Replace contact details and Google Maps embed in index.html

// About: Vision/Mission toggle (buttons #48 and #28)
const btnVision = document.getElementById('48');
const btnMission = document.getElementById('28');
const panelVision = document.getElementById('vision-content');
const panelMission = document.getElementById('mission-content');
function setAboutTab(which) {
  const isVision = which === 'vision';
  btnVision?.setAttribute('aria-expanded', String(isVision));
  btnMission?.setAttribute('aria-expanded', String(!isVision));
  if (panelVision && panelMission) {
    panelVision.toggleAttribute('hidden', !isVision);
    panelMission.toggleAttribute('hidden', isVision);
  }
}
btnVision?.addEventListener('click', () => setAboutTab('vision'));
btnMission?.addEventListener('click', () => setAboutTab('mission'));
// default to Vision visible
if (btnVision && btnMission) setAboutTab('vision');

// Impact: count-up animation when visible
const impactValues = Array.from(document.querySelectorAll('.impact .impact-value'));
function animateCount(el) {
  const target = Number(el.getAttribute('data-target') || '0');
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1200; // ms
  const start = performance.now();
  const from = 0;
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(from + (target - from) * eased);
    el.textContent = `${value}${suffix ? ' ' + suffix : ''}`.trim();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if (impactValues.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  impactValues.forEach((el) => observer.observe(el));
}

// Map reveal animation on visibility
const mapWrap = document.querySelector('.map-animate');
if (mapWrap) {
  const mo = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.disconnect();
      }
    });
  }, { threshold: 0.2 });
  mo.observe(mapWrap);
}


