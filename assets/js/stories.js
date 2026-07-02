// ============================================================
// Stories page: photo carousel arrow controls + lightbox gallery
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const row = document.querySelector('.story-card-row');
  const arrows = document.querySelectorAll('.carousel-arrow');
  if (row && arrows.length) {
    function scrollByCard(dir) {
      const card = row.querySelector('.story-card');
      const gap = parseFloat(getComputedStyle(row).columnGap || 24);
      const step = card ? card.getBoundingClientRect().width + gap : row.clientWidth * 0.8;
      row.scrollBy({ left: step * dir, behavior: 'smooth' });
    }
    arrows.forEach((btn) => {
      btn.addEventListener('click', () => scrollByCard(parseInt(btn.dataset.dir, 10)));
    });
    function updateArrowState() {
      const [prevBtn, nextBtn] = arrows;
      const maxScroll = row.scrollWidth - row.clientWidth - 1;
      if (prevBtn) prevBtn.disabled = row.scrollLeft <= 0;
      if (nextBtn) nextBtn.disabled = row.scrollLeft >= maxScroll;
    }
    row.addEventListener('scroll', updateArrowState, { passive: true });
    window.addEventListener('resize', updateArrowState);
    updateArrowState();
  }

  /* ================= LIGHTBOX GALLERY ================= */
  const galleries = {
    'psaros-ny': {
      title: 'Psaros FinPolicy Trek — New York',
      items: [
        { type: 'image', src: 'assets/img/stories/psaros-ny/01.jpg', caption: '[ caption ]' },
        { type: 'image', src: 'assets/img/stories/psaros-ny/02.jpg', caption: '[ caption ]' },
        { type: 'image', src: 'assets/img/stories/psaros-ny/03.jpg', caption: 'A quiet moment outside Morgan Stanley.' },
        { type: 'image', src: 'assets/img/stories/psaros-ny/04.jpg', caption: '[ caption ]' },
        { type: 'image', src: 'assets/img/stories/psaros-ny/05.jpg', caption: 'Prepping with the Neuberger Berman market outlook — and a very full notebook.' },
        { type: 'image', src: 'assets/img/stories/psaros-ny/06.jpg', caption: 'A floor-side selfie at the NYSE.' },
        { type: 'image', src: 'assets/img/stories/psaros-ny/07.jpg', caption: 'The whole cohort, live from the news desk.' },
        { type: 'image', src: 'assets/img/stories/psaros-ny/08.jpg', caption: 'Swag from the Optiver visit.' },
        { type: 'image', src: 'assets/img/stories/psaros-ny/09.jpg', caption: 'Front pages on the conference table.' },
        { type: 'image', src: 'assets/img/stories/psaros-ny/10.jpg', caption: 'Tea and notes at JPMorgan.' },
        { type: 'video', src: 'assets/video/psaros-ny/clip-01.mp4', poster: 'assets/img/stories/psaros-ny/clip-01-poster.jpg', caption: '[ caption ]' },
        { type: 'video', src: 'assets/video/psaros-ny/clip-02.mp4', poster: 'assets/img/stories/psaros-ny/clip-02-poster.jpg', caption: 'The trip, recapped.' },
      ],
    },
  };

  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const mediaEl = document.getElementById('lightboxMedia');
  const captionEl = document.getElementById('lightboxCaption');
  const countEl = document.getElementById('lightboxCount');
  const dotsEl = document.getElementById('lightboxDots');
  const prevBtn = lightbox.querySelector('[data-lightbox-prev]');
  const nextBtn = lightbox.querySelector('[data-lightbox-next]');
  const closeEls = lightbox.querySelectorAll('[data-lightbox-close]');

  let currentGallery = null;
  let currentIndex = 0;
  let lastFocusedEl = null;

  function renderItem() {
    const items = currentGallery.items;
    const item = items[currentIndex];

    mediaEl.innerHTML = '';
    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      video.controls = true;
      video.playsInline = true;
      if (item.poster) video.poster = item.poster;
      mediaEl.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption && !item.caption.startsWith('[') ? item.caption : (currentGallery.title || '');
      mediaEl.appendChild(img);
    }

    captionEl.textContent = item.caption || '';
    countEl.textContent = `${currentIndex + 1} / ${items.length}`;

    dotsEl.innerHTML = '';
    items.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'lightbox-dot' + (i === currentIndex ? ' is-active' : '');
      dotsEl.appendChild(dot);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === items.length - 1;
  }

  function stopMedia() {
    const video = mediaEl.querySelector('video');
    if (video) video.pause();
  }

  function goTo(index) {
    const items = currentGallery.items;
    if (index < 0 || index >= items.length) return;
    stopMedia();
    currentIndex = index;
    renderItem();
  }

  function openGallery(id, startIndex = 0) {
    const gallery = galleries[id];
    if (!gallery) return;
    currentGallery = gallery;
    currentIndex = startIndex;
    lastFocusedEl = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    renderItem();
    lightbox.querySelector('.lightbox-close').focus();
  }

  function closeGallery() {
    stopMedia();
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { lightbox.hidden = true; mediaEl.innerHTML = ''; }, 350);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.querySelectorAll('[data-gallery]').forEach((el) => {
    el.addEventListener('click', () => openGallery(el.dataset.gallery));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGallery(el.dataset.gallery);
      }
    });
  });

  closeEls.forEach((el) => el.addEventListener('click', closeGallery));
  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  /* swipe support */
  let touchStartX = null;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 45) goTo(currentIndex + (dx < 0 ? 1 : -1));
    touchStartX = null;
  }, { passive: true });
});
