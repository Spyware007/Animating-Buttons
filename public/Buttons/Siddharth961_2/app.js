const btnel = document.querySelector("button")
const imgel = document.querySelector("img")

btnel.addEventListener("click", ()=>{
    btnel.innerText = "Order Placed!!"
    btnel.classList.remove("initial")
    btnel.classList.add("middle")
    imgel.classList.add("moving_class")

    setTimeout(()=>{
        
        btnel.classList.remove("middle")
        btnel.classList.add("initial")
        imgel.classList.remove("moving_class")
    },2500 )
})




