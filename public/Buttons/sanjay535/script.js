const btn = document.getElementById('btn');
const btnText = document.getElementById('btn-text');

btn.addEventListener('click', () => {
  document.querySelector('.lds-ring').style.display = 'inline-block';
  btnText.innerHTML = 'Loading...';
  setTimeout(() => {
    document.querySelector('.lds-ring').style.display = 'none';
    btnText.innerHTML = 'SUBMIT';
  }, 3000);
});
