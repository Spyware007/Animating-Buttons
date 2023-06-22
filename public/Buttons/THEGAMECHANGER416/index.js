btns = document.getElementsByClassName("btn-primary")
onHover = (btn)=>{
  chars_btn = btn.innerText.split("")
  innerHTML = ""
  for(let i=0;i<chars_btn.length;i++){
    innerHTML += '<span>'+chars_btn[i]+'</span>'
  }
  btn.innerHTML=innerHTML
}
for(let i=0;i<btns.length;i++){
  onHover(btns[i])
}