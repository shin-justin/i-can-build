const inputFieldAPI = (() => {
  let initListeners;

  function handleInput(evt) {
    const input = evt.target;
    const label = document.querySelector('.input-label');
    if (input.value.length) {
      label.classList.add('input-has-value');
    } else {
      label.classList.remove('input-has-value');
    }
  }
  initListeners = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const inputs = document.querySelectorAll('.input-box');
      inputs.forEach((input) => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) {
          // Check initial state of input incase input has a value
          handleInput({ target: input });
          input.addEventListener('input', handleInput);
        }
      });
    });
  };
  return {
    initListeners
  };
})();

inputFieldAPI.initListeners();
