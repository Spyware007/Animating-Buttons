const allBtn = document.querySelectorAll(".akb-btn button:nth-child(2)");
allBtn.forEach(btn=>{
    btn.addEventListener("click",()=>{
        btn?.nextElementSibling.classList.toggle("akb-show-btn");
    });
});