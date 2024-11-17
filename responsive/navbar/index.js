const responsiveMenuApi = (() => {
  const BREAKPOINT = 768;
  let initListeners;
  let responsiveMenu;
  let isMenuOpen = false;

  function hideMenu(menuEl) {
    menuEl.style.display = 'none';
    isMenuOpen = false;
  }

  function showMenu(menuEl) {
    menuEl.style.display = 'flex';
    isMenuOpen = true;
  }

  function toggleMenu() {
    const elStyle = window.getComputedStyle(responsiveMenu);
    if (elStyle.display === 'flex') {
      hideMenu(responsiveMenu);
    } else {
      showMenu(responsiveMenu);
    }
  }

  initListeners = () => {
    document.addEventListener('DOMContentLoaded', () => {
      responsiveMenu = document.querySelector('.responsive-menu');
      const hamburgerMenu = document.querySelector('.hamburger');
      hamburgerMenu.addEventListener('click', toggleMenu);
      window.addEventListener('resize', () => {
        if (isMenuOpen && window.innerWidth > BREAKPOINT) {
          hideMenu(responsiveMenu);
        }
      });
    });
  };

  return {
    initListeners
  };
})();

responsiveMenuApi.initListeners();
