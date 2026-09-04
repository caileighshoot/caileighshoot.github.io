document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Slideshow (photo gallery)
const slideshow = document.querySelector('[data-slideshow]');
if (slideshow) {
  const slides = Array.from(slideshow.querySelectorAll('.slide'));
  const dotsWrap = slideshow.querySelector('.slide-dots');
  const prevBtn = slideshow.querySelector('.slide-prev');
  const nextBtn = slideshow.querySelector('.slide-next');
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  let touchStartX = null;
  const viewport = slideshow.querySelector('.slideshow-viewport');
  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  viewport.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) {
      goTo(delta < 0 ? current + 1 : current - 1);
    }
    touchStartX = null;
  });
}

// Generic card slider (e.g. Featured Projects)
document.querySelectorAll('[data-slider]').forEach((container) => {
  const slides = Array.from(container.querySelectorAll('.project-card-compact'));
  const controls = container.querySelector('[data-slider-controls]');
  const dotsWrap = container.querySelector('[data-slider-dots]');
  if (!slides.length || !controls || !dotsWrap) return;

  if (slides.length <= 1) {
    controls.classList.remove('has-multiple');
    return;
  }
  controls.classList.add('has-multiple');

  const prevBtn = container.querySelector('.proj-prev');
  const nextBtn = container.querySelector('.proj-next');
  let current = slides.findIndex((s) => s.classList.contains('is-active'));
  if (current < 0) current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to project ${i + 1}`);
    if (i === current) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
});
