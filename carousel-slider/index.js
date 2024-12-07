const slideCollection = document.querySelector('.container').children;
const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');

// Logic

function rotateLeft(collection) {
  collection = Array.from(collection);
  collection = [...collection.slice(1), collection[0]];
  const nextSlide = collection[collection.length - 1];

  toggleVisibility(nextSlide);

  // read dom elements with updated order
  const container = document.querySelector('.container');

  collection.forEach((slide) => {
    container.appendChild(slide);
  });
}

function rotateRight(collection) {
  collection = Array.from(slideCollection);
  collection = [collection[collection.length - 1], ...collection.slice(0, -1)];

  // read dom elements
  const container = document.querySelector('.container');

  collection.forEach((slide) => container.appendChild(slide));
}

leftButton.addEventListener('click', () => {
  rotateLeft(slideCollection);
});

rightButton.addEventListener('click', () => {
  rotateRight(slideCollection);
});

function toggleVisibility(nextSlide) {
  nextSlide.classList.add('hide');
  setTimeout(() => {
    nextSlide.classList.add('reveal');
    nextSlide.classList.remove('hide', 'reveal');
  }, 500);
}
