let button = document.querySelector(".button");
let buttonText = document.querySelector(".button p");
let thankText = document.querySelector(".button p:last-child");

let timeLine = new TimelineMax({
	paused: false
});

button.addEventListener("click", () => {
	timeLine
		.to(buttonText, 0.6, {
			opacity: 0
		})
		.to(button, 0.8, {
			height: 0.2,
			opacity: 0.5,
			boxShadow: "0px 0px 35px 7px #cd28fa",
			delay: 0.25
		})
		.to(button, 0.1, {
			opacity: 0.5,
			background: "#26ff92"
		})
		.to(button, 0, {
			width: 1,
			delay: 0.2
		})
		.to(button, 0.1, {
			boxShadow: "0px 0px 100px 55px #fa2856",
			y: 90,
			height: 100,
			delay: 0.23
		})
		.to(button, 0.3, {
			height: 1000,
			y: -1500,
			boxShadow: "0px 0px 85px 17px #fa2856",
			delay: 0.2
		})
		.to(".thank", 1, {
			opacity: 1,
			delay: 0.3
		});
});