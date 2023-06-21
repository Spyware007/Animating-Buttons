const { to, set, from, fromTo, registerPlugin } = gsap

registerPlugin(MotionPathPlugin);

document.querySelectorAll('.pay-button').forEach(button => {
    button.addEventListener('pointerdown', e => {
        if(button.classList.contains('animating')) {
            return
        }
        to(button, {
            '--scale': .975,
            duration: .15
        })
    })
    button.addEventListener('pointerup', e => {
        if(button.classList.contains('animating')) {
            return
        }
        to(button, {
            '--scale': 1,
            duration: .15
        })
    })
    button.addEventListener('pointerleave', e => {
        if(button.classList.contains('animating')) {
            return
        }
        to(button, {
            '--scale': 1,
            duration: .15
        })
    })
    button.addEventListener('click', e => {

        e.preventDefault()

        button.classList.add('animating')

        if(button.classList.contains('done')) {
            to(button, {
                '--success-o': 0,
                duration: .15
            })
            to(button, {
                '--default-o': 1,
                duration: .4,
                clearProps: true,
                onComplete() {
                    button.classList.remove('animating', 'done')
                }
            })
            return
        }

        to(button, {
            '--rotate': '-90deg',
            '--y': '25px',
            '--default-o': 0,
            duration: .2
        })

        to(button, {
            keyframes: [{
                '--light-opacity': 1,
                duration: .3,
                delay: .15,
                onComplete() {
                    from(button.querySelectorAll('.icon'), {
                        stagger: .2,
                        opacity: 0,
                        duration: .15
                    })
                    set(button.querySelectorAll('.icon'), {
                        x: gsap.utils.random(-100, -80),
                        y: gsap.utils.random(-80, -60)
                    })
                    to(button.querySelectorAll('.icon'), {
                        stagger: .2,
                        duration: .5,
                        motionPath: {
                            path: [{
                                x: gsap.utils.random(-60, -40),
                                y: gsap.utils.random(-10, -30),
                            }, {
                                x: 0,
                                y: 0
                            }],
                            curviness: .5
                        },
                        rotation: `-=${gsap.utils.random(-720, 720)}`,
                    })
                }
            }, {
                '--truck-y': '1px',
                duration: .1,
                delay: .2
            }, {
                '--truck-y': '0px',
                duration: .1
            }, {
                '--truck-y': '1px',
                duration: .1,
            }, {
                '--truck-y': '0px',
                duration: .1
            }, {
                '--truck-y': '1px',
                duration: .1,
            }, {
                '--truck-y': '0px',
                duration: .1
            }, {
                '--truck-y': '1px',
                duration: .1
            }, {
                '--truck-y': '0px',
                duration: .1
            }],
            onComplete() {
                to(button, {
                    keyframes: [{
                        '--truck-base-x': '-4px',
                        duration: .4
                    }, {
                        '--truck-base-x': '60px',
                        duration: 1
                    }, {
                        '--truck-base-x': '20px',
                        duration: .6
                    }, {
                        '--truck-base-x': '300px',
                        duration: .4
                    }],
                    onComplete() {
                        button.classList.add('done')
                        button.classList.remove('animating')
                        to(button, {
                            keyframes: [{
                                '--rotate': '0deg',
                                '--y': '0px',
                                duration: .2
                            }, {
                                '--success-offset': '0px',
                                '--success-o': 1,
                                duration: .2
                            }]
                        })
                    }
                })
            }
        })

    })
})