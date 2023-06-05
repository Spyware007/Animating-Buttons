// document.getElementById("btn-download").click(function() {
//     this.classList.toggle("downloaded");
//   });

  const btn = document.getElementById("btn-download")
  btn.addEventListener("click" , ()=>{
    btn.classList.toggle("downloaded")
    
    // link a download  url 
    // window.open("https://www.youtube.com/")
  })