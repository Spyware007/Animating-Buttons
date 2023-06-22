document
  .querySelector(".left-click-trigger")
  .addEventListener("click", function () {
    document.querySelector(".button").classList.add("off");
  });

document
  .querySelector(".right-click-trigger")
  .addEventListener("click", function () {
    document.querySelector(".button").classList.remove("off");
  });