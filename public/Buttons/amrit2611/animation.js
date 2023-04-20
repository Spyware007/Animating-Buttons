const myButton = document.querySelector("#myButton");

myButton.style.transform = "scale(2)";

// We create the smooth scaling animation using the transition property.
// Inside the transition property, we can mention all the properties that we want to be a part of the animation.
// This is a simple scaling animation in which the button changes its color and scale when hovered.

myButton.addEventListener("mouseenter", () => {
  myButton.style.boxShadow = "0px 5px 10px rgba(0, 0, 0, 0.3)";
  myButton.style.backgroundColor = "black";
  myButton.style.color = "white";
  myButton.style.transition =
    "transform 0.4s ease-in-out, background-color 0.25s ease-in-out";
  myButton.style.transform = "scale(2.5)";
});

// Below, we make the button go back to the initial state.

myButton.addEventListener("mouseleave", () => {
  myButton.style.backgroundColor = "white";
  myButton.style.color = "black";
  myButton.style.boxShadow = "none";
  myButton.style.transform = "scale(2)";
});
