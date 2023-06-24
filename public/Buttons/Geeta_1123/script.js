var btn = document.getElementById("btn");
var btnText = document.getElementById("btnText");

btn.onmouseover = function(){
    if(!btn.classList.contains("active"))
    btnText.innerHTML = "Click Me";
}
btn.onmouseleave = function(){
    if(!btn.classList.contains("active"))
    btnText.innerHTML = "Download";
}
btn.onclick = function(){
    btnText.innerHTML = "Thankyou";
    btn.classList.add("active");
}