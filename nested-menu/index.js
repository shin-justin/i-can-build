const grandparent = document.querySelector('.grandparent').children;
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

function toggleFirstMenu() {
  const style = window.getComputedStyle(parent, 'display');

  if (style.display === 'none') {
    parent.style.display = 'block';
  } else {
    parent.style.display = 'none';
  }
}

function toggleSecondMenu() {
  const style = window.getComputedStyle(child, 'display');

  if (style.display === 'none') {
    child.style.display = 'block';
  } else {
    child.style.display = 'none';
  }
}

grandparent[grandparent.length - 1].addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('lvl-2')) {
    toggleFirstMenu();
  }
});

// parent.lastElementChild.addEventListener('click', toggleSecondMenu());
