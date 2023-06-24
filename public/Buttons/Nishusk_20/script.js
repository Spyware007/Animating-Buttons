// Check my site -> volkov.at :)

const btnBg = document.querySelectorAll('.btn1_bg');
const btn1 = document.querySelector('.btn1_cover');
const btnBg2 = document.querySelectorAll('.btn2_bg');
const btn2 = document.querySelector('.btn2_cover');

btnBg.forEach(btn => {
  btn.addEventListener('click', function() {
    btn1.classList.toggle('active');
       setTimeout(() => {
      btn1.classList.remove('active');
    }, 200);
  });
});
btnBg2.forEach(btn => {
  btn.addEventListener('click', function() {
    btn2.classList.toggle('active');
       setTimeout(() => {
      btn2.classList.remove('active');
    }, 200);
  });
});
 
