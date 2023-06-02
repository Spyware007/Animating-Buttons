const btnel = document.querySelector("button")
const one = document.querySelector(".wave1");
const two = document.querySelector(".wave2");

btnel.addEventListener("mouseover", ()=>{    
    one.classList.add("one")
    two.classList.add("two")
  
    
})
btnel.addEventListener("mouseout", ()=>{    
    one.classList.remove("one")
    two.classList.remove("two")
    
  
    
})



