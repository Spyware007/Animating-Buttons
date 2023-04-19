const myButton = document.querySelector('#myButton');

myButton.addEventListener('mouseenter', () => {
  myButton.style.backgroundColor = 'red';
  myButton.style.color = 'white';
});

myButton.addEventListener('mouseleave', () => {
  myButton.style.backgroundColor = 'white';
  myButton.style.color = 'black';
});