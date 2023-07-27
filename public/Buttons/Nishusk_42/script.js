const btn = document.querySelector(".place-order");

btn.addEventListener("click", () => {
  btn.classList.remove("place-order--default");
  btn.classList.add("place-order--placing");
  setTimeout(() => {
    btn.classList.remove("place-order--placing");
    btn.classList.add("place-order--done");
  }, 4000);
  setTimeout(() => {
    btn.classList.remove("place-order--done");
    btn.classList.add("place-order--default");
  }, 6000);
})