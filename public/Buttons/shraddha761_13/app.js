console.clear();
const hand = document.querySelector("#hand"),
coin = document.querySelector("#coin"),
btn = document.querySelector("#donation-btn"),
heart = document.querySelector("#heart"),
heartIcon = document.querySelector("#heart-icon"),
heartProgress = document.querySelector("#heart-progress"),
wallet = document.querySelector("#wallet"),
slider = document.querySelector(".slider"),
checkedBox = document.querySelector("#checked-box");
let isAnimationInAction = false;
let tl = new TimelineMax();
let hoverState = true;
btn.addEventListener("click", () => {
  if (isAnimationInAction) {
    return false;
  }
  isAnimationInAction = true;
  hoverOut();
  hoverState = false;
  startAnimation();
  heartFill();
});
let startAnimation = () => {
  tl.to(coin, 0.2, { scaleX: 0, transformOrigin: "center center" }, 0.4).
  to(hand, 0.6, { x: -800 }).
  to(heart, 0.6, { scale: 2, transformOrigin: "center 0" }, "<").
  to(slider, 0.6, { y: -60 }, ">").
  to(heartIcon, 0.4, { fill: "#ececec" }, 0.2);
};
let heartFill = () => {
  tl.to(heartProgress, 2.5, {
    attr: { y: 59.2 },
    transformOrigin: "center 0" }).

  to(wallet, 1, { ease: Power1.easeOut, y: -400 }).
  to(
  heart,
  0.4,
  {
    ease: Power1.easeOut,
    scale: 0.5,
    y: -200,
    transformOrigin: "center center" },

  "<").

  to(slider, 0.6, { ease: Power1.easeOut, y: -120 }, "<").
  to(heart, 0.8, { y: 0, scale: 0 }).
  fromTo(
  checkedBox,
  0.4,
  { scaleX: 0, scaleY: 0, transformOrigin: "center center" },
  {
    scaleX: 1,
    scaleY: 1,
    transformOrigin: "center center",
    onComplete: () => {
      setTimeout(() => {
        received();
      }, 2500);
    } });


};
let received = () => {
  tl.to(hand, 0.8, { x: 0 }).
  to(wallet, 0.4, { y: 0, transformOrigin: "center center" }, "<").
  to(slider, 0.6, { ease: Power1.easeOut, y: -180 }, ">").
  set(heart, { clearProps: "all" }).
  set(heartProgress, { attr: { y: 298 } }).
  set(slider, { y: 0 }).
  to(coin, 0.2, {
    scaleX: 1,
    transformOrigin: "center center",
    onComplete: function () {
      isAnimationInAction = false;
      hoverState = true;
      tl.clear();
    } });

};
function hoverIn() {
  btn.classList.add("dropped");
}
function hoverOut() {
  btn.classList.remove("dropped");
}
btn.addEventListener("mouseenter", function () {
  if (hoverState) {
    hoverIn();
  }
});
btn.addEventListener("mouseleave", hoverOut);