let animateButton = function (e) {
    console.log("YEss")
    // e.preventDefault();
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function () {
        e.target.classList.remove('animate');
    }, 500);
};

const bubblyButtons = document.getElementsByClassName("bubbly-button");

for (let i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}