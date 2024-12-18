// script.js
document.addEventListener('DOMContentLoaded', () => {
  const rootGrid = document.querySelector('.root-grid-container');
  const toggleSidebarButton = document.getElementById('toggle-sidebar');

  toggleSidebarButton.addEventListener('click', () => {
    rootGrid.classList.toggle('sidebar-visible');
  });
});
