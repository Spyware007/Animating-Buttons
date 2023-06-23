let button = document.querySelector('.button');
button.addEventListener('mousemove', (e) => {
    let x = e.offsetX
    let y = e.offsetY
    let width = button.clientWidth
    let height = button.clientHeight
    let moveX = (x - width/2)
    let moveY = (y - height/2)
    button.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
})

button.addEventListener('mouseout', (e) => {
    button.style.transform = ``;
})