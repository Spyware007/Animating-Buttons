document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', e => {
      button.classList.toggle('added');
  });
});