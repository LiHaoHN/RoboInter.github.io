/* =========== Smooth scroll for nav links =========== */
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 64; // offset for nav
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* =========== Fade-in on scroll =========== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('fade-in');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-section').forEach(node => observer.observe(node));

/* =========== Zoom / Lightbox behavior =========== */
const zoomTargets = document.querySelectorAll('.zoom-target');
const zoomOverlay = document.getElementById('zoom-overlay');
const zoomImg = document.getElementById('zoom-img');
const zoomClose = document.getElementById('zoom-close');

zoomTargets.forEach(img => {
  img.addEventListener('click', () => {
    // set src and show overlay
    zoomImg.src = img.src;
    zoomOverlay.style.display = 'flex';

    // prevent background scroll while open
    document.body.style.overflow = 'hidden';
  });
});

// close handlers
function closeZoom() {
  zoomOverlay.style.display = 'none';
  zoomImg.src = '';
  document.body.style.overflow = '';
}

zoomClose && zoomClose.addEventListener('click', closeZoom);
zoomOverlay && zoomOverlay.addEventListener('click', (e) => {
  if (e.target === zoomOverlay) closeZoom();
});

// close with ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && zoomOverlay.style.display === 'flex') closeZoom();
});