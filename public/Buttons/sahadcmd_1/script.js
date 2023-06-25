window.addEventListener("DOMContentLoaded",() => {
	const d = new DeleteButton("#delete");
});

class DeleteButton {
	isRunning = false;

	constructor(el) {
		this.el = document.querySelector(el);
		this.init();
	}
	init() {
		this.el?.addEventListener("click",this.delete.bind(this));
		
		const resetTrigger = this.el?.querySelector("[data-anim]");
		resetTrigger?.addEventListener("animationend",this.reset.bind(this));
	}
	delete() {
		this.isRunning = true;
		this.displayState();
	}
	displayState() {
		this.el.disabled = this.isRunning;
		this.el.setAttribute("data-running",this.isRunning);
	}
	reset() {
		this.isRunning = false;
		this.displayState();
	}
}