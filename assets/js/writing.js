// ============================================================
// Writing page — category filter
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sections = document.querySelectorAll('.writing-section');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      sections.forEach((section) => {
        const matches = filter === 'all' || section.dataset.category === filter;
        section.classList.toggle('is-hidden', !matches);
      });
    });
  });
});
