const buttons = document.querySelectorAll("a");
buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    /*This line calculates the horizontal position of the click event
     relative to the left edge of the clicked button. e.clientX 
     represents the horizontal coordinate of the click event, and e.target.offsetLeft 
     represents the distance from the left edge of the button to its offset parent.
     */
    let x = e.clientX - e.target.offsetLeft;
    /*This line calculates the vertical position of the click event relative to the top 
    edge of the clicked button. e.clientY represents the vertical coordinate of the click event,
    and e.target.offsetTop represents the distance from the top edge of the button to its offset parent.*/
    let y = e.clientY - e.target.offSetTop;
    let ripples = document.createElement("span");
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    this.appendChild(ripples);
    setTimeout(() => {
      ripples.remove();
    }, 1000);
  });
});
