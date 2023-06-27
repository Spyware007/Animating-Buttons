const btnel = document.querySelector('button')
const container = document.querySelector('.container')
const left  = document.querySelector('.left')
const right = document.querySelector('.right')

console.log(btnel)

btnel.addEventListener('click',()=>{
    left.classList.add('active')
    right.classList.add('active')
    btnel.classList.add('active')
    setTimeout(()=>{
        btnel.innerText = 'Change'
    },750)


})

