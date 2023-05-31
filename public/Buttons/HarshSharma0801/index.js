const button1 = document.getElementById("button");
button1.addEventListener('click',function(){
        button1.innerHTML="";
        button1.classList.add("loading");
        setTimeout(function(){
            button1.classList.remove("loading");
            button1.classList.remove("btn");
            button1.classList.add("display");
            button1.innerHTML="✔";
            button1.classList.add("tick");
        },2000);
       
})



