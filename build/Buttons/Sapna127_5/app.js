document.querySelector('.btn').addEventListener('click', (evt) => {
    evt.target.classList.add('loading')
  
    setTimeout(() => {
      evt.target.classList.remove('loading')
    }, 3000);
  })