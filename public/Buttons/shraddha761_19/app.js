gsap.registerPlugin(Physics2DPlugin);

document.querySelectorAll('.beer-like').forEach(button => {

    button.addEventListener('click', e => {
        if(!button.classList.contains('cheer')) {

            button.classList.add('cheer');

            setTimeout(() => {
                particles(button, 12, 44, 38, -110, -80)
                button.dataset.count = parseInt(button.dataset.count) + 1;
            }, 500);

            setTimeout(() => button.classList.remove('cheer'), 1000);

        }
    });

});

function particles(parent, quantity, x, y, minAngle, maxAngle) {
    let minSize = 20,
        maxSize = 60;
    for(let i = quantity - 1; i >= 0; i--) {
        let angle = minAngle + Math.random() * (maxAngle - minAngle),
            size = minSize + Math.random() * (maxSize - minSize),
            velocity = 70 + Math.random() * (120 - 80),
            dot = document.createElement('div');
        dot.className = Math.random() >= .5 ? 'dot-primary' : 'dot-secondary';
        parent.appendChild(dot);
        gsap.set(dot, {
            opacity: 1,
            x: x,
            y: y,
            scale: size / 40
        });
        gsap.timeline({
            onComplete() {
                dot.remove();
            }
        }).to(dot, 1.8, {
            physics2D: {
                angle: angle,
                velocity: velocity,
                gravity: 125
            }
        }).to(dot, 1, {
            opacity: 0
        }, .8);
    }
}