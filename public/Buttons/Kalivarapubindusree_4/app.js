window.addEventListener("DOMContentLoaded",() => {
    const btn = document.querySelector("button");
    var doneTimeout = null,
        resetTimeout = null;

    if (btn) {
        btn.addEventListener("click",function() {
            const runClass = "btn--running";
            const doneClass = "btn--done";
            // `.btn--running .btn__progress-fill` `stroke-dashoffset` duration in ms
            const submitDuration = 2000;
            const resetDuration = 1500;

            // fake the submission
            this.disabled = true;
            this.classList.add(runClass);

            clearTimeout(doneTimeout);
            clearTimeout(resetTimeout);

            doneTimeout = setTimeout(() => {
                this.classList.remove(runClass);
                this.classList.add(doneClass);
                
                // reset the button
                resetTimeout = setTimeout(() => {
                    this.disabled = false;
                    this.classList.remove(doneClass);
                }, resetDuration);

            }, 600 + submitDuration);
        });
    }
});