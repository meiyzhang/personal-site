// ============================================================
// Stories page: photo carousel arrow controls
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const row = document.querySelector('.story-card-row');
  const arrows = document.querySelectorAll('.carousel-arrow');
  if (!row || !arrows.length) return;

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
});
