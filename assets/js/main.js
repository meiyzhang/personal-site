// ============================================================
// Shared site behavior: loader, nav, scroll reveals
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- loader ---- */
  const loader = document.querySelector('.loader');
  if (loader) {
    const dismiss = () => loader.classList.add('hidden');
    // Minimum show time so the rabbit always gets to hop at least
    // a couple times, even on a fast connection/cache hit.
    const minShow = new Promise((res) => setTimeout(res, 900));
    const ready = new Promise((res) => {
      if (document.readyState === 'complete') res();
      else window.addEventListener('load', res, { once: true });
    });
    Promise.all([minShow, ready]).then(dismiss);
    // Safety net in case something hangs.
    setTimeout(dismiss, 3500);
  }

  /* ---- mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

});
