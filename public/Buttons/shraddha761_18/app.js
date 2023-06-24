var $ = (s, o = document) => o.querySelector(s);

$(".dl").addEventListener("click", function() {
  this.classList.add("run");
  setTimeout(() => this.classList.add("done"), 4000);
  setTimeout(() => this.classList.remove("done"), 5500);
  setTimeout(() => this.classList.remove("run"), 5500);
});