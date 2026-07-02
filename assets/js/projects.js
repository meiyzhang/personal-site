// ============================================================
// Projects page — "See More" expands the gallery card detail
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.see-more');

  buttons.forEach((btn) => {
    const card = btn.closest('.gallery-card');
    const detail = card.querySelector('.gallery-detail');
    const inner = detail.querySelector('.gallery-detail-inner');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.textContent = isOpen ? 'See More' : 'See Less';
      detail.style.maxHeight = isOpen ? '0px' : inner.scrollHeight + 'px';
    });
  });

  window.addEventListener('resize', () => {
    buttons.forEach((btn) => {
      if (btn.getAttribute('aria-expanded') === 'true') {
        const detail = btn.closest('.gallery-card').querySelector('.gallery-detail');
        const inner = detail.querySelector('.gallery-detail-inner');
        detail.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
});
