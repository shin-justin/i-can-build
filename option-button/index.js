const CheckboxAPI = (() => {
  let toggleCheckbox;
  let initListeners;

  toggleCheckbox = (event) => {
    const optionButton = event.currentTarget;
    const checkbox = optionButton.firstElementChild;
    optionButton.classList.toggle('checked-container');
    checkbox.classList.toggle('checked');
  };

  initListeners = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const checkboxContainers = document.querySelectorAll('.option-button');
      checkboxContainers.forEach((container) => {
        container.addEventListener('click', toggleCheckbox);
      });
    });
  };

  // Expose functions
  return {
    toggleCheckbox: toggleCheckbox,
    initListeners: initListeners
  };
})();

CheckboxAPI.initListeners();
