// ============================================================
// Bookshelf page — spine click opens review modal
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.book-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.book-modal-close');
  const backdrop = modal.querySelector('.book-modal-backdrop');
  const titleEl = modal.querySelector('.book-modal-title');
  const authorEl = modal.querySelector('.book-modal-author');
  const statusEl = modal.querySelector('.book-modal-status');
  const ratingEl = modal.querySelector('.book-modal-rating');
  const reviewEl = modal.querySelector('.book-modal-review');

  const spines = document.querySelectorAll('.book-spine');

  function openModal(spine) {
    titleEl.textContent = spine.dataset.title || '';
    authorEl.textContent = spine.dataset.author ? `by ${spine.dataset.author}` : '';
    statusEl.textContent = spine.dataset.status || '';
    ratingEl.textContent = spine.dataset.rating || '';
    reviewEl.textContent = spine.dataset.review || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  spines.forEach((spine) => {
    spine.addEventListener('click', () => openModal(spine));
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
});
