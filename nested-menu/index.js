const multiLevelApi = (() => {
  let initListeners;
  const MILISECONDS = 250;
  const VISIBLE_CLASS = 'is-visible';

  function toggleMenu(domEl) {
    const style = window.getComputedStyle(domEl, 'display');
    if (style.display === 'none') {
      domEl.style.display = 'block';
      setTimeout(() => domEl.classList.add(VISIBLE_CLASS));
    } else {
      domEl.classList.remove(VISIBLE_CLASS);
      setTimeout(() => (domEl.style.display = 'none'), MILISECONDS);
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
