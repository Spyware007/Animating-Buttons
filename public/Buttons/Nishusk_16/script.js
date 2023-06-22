const southFace = document.querySelector('.btn_south-face');
const buttonText = document.querySelector('.btn-text');
const button = document.querySelector('.btn-3d');

const blueShadow = '#1bafa3';
const pinkShadow = '#EC97A8';

southFace.style.boxShadow = makeShadow(100, blueShadow);
buttonText.style.textShadow = makeShadow(70, pinkShadow);

button.addEventListener('mouseover', () => {
  southFace.style.boxShadow = makeShadow(60, blueShadow);

  button.addEventListener('mouseout', () => {
    southFace.style.boxShadow = makeShadow(100, blueShadow);
  });
});

button.addEventListener('mousedown', () => {
  southFace.style.boxShadow = makeShadow(0, blueShadow);

  button.addEventListener('mouseup', () => {
    southFace.style.boxShadow = makeShadow(60, blueShadow);
  });
});

function makeShadow(shadowLength, color) {
  let textShadow = '';

  for (let i = 1; i < shadowLength; i++) {
    textShadow += `${-i * 1.1}px ${i}px ${i * 0.1}px ${color}`;
    if (i != shadowLength - 1) {
      textShadow += ', ';
    }
  }

  return textShadow;
}

