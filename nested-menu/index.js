const multiLevelApi = (() => {
  let initListeners;

  function toggleMenu(domEl) {
    const style = window.getComputedStyle(domEl, 'display');
    if (style.display === 'none') {
      domEl.style.display = 'block';
    } else {
      domEl.style.display = 'none';
    }
  }

  initListeners = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const root = document.querySelector('.root');
      root.addEventListener('click', (event) => {
        const submenu = event.target.querySelector('.submenu');
        if (submenu) {
          toggleMenu(submenu);
        }
      });
    });
  };

  return {
    initListeners
  };
})();

multiLevelApi.initListeners();
