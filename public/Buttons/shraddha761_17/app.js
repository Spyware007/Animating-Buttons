gsap.registerPlugin(MorphSVGPlugin)

document.querySelectorAll('.dl-parachute').forEach(button => {
    let circle = button.querySelector('.circle path'),
        arrow = button.querySelector('.arrow path'),
        line = new Proxy({
            y: null
        }, {
            set(target, key, value) {
                target[key] = value
                if(target.y !== null) {
                    button.querySelector('.line').innerHTML = getPath(target.y, .2)
                }
                return true
            },
            get(target, key) {
                return target[key]
            }
        }),
        number = button.querySelector('.number span'),
        count = { number: 0 }
    line.y = 64.5

    button.addEventListener('click', e => {
        e.preventDefault()

        if(button.classList.contains('active')) {
            return
        }

        button.classList.add('active')

        gsap.timeline().to(circle, {
            morphSVG: 'M10 120.5C11.5 120.5 29.1914 120.5 61.5 120.5C78.5 120.5 108.054 120.777 140.5 120.5C172.67 120.225 201.5 120.5 218.5 120.5C250.397 120.5 268.5 120.5 270 120.5',
            duration: .15,
            onComplete() {
                gsap.set(button, {
                    '--circle-opacity': 0,
                    '--line-opacity': 1
                })
            }
        }).to(button, {
            '--svg-y': '120px',
            '--arrow-y': '44px',
            duration: .15
        }, 0).to(button, {
            '--arrow-y': '-72px',
            duration: .3,
            ease: 'power1.out'
        }).to(button, {
            '--arrow-y': '40px',
            '--line-progress': '0px',
            duration: 3,
            delay: .15,
            onStart() {
                gsap.to(button, {
                    '--line-progress-o': 1
                })
            }
        }).to(count, {
            number: 100,
            roundProps: 'number',
            duration: 3,
            onUpdate: () => number.innerHTML = count.number
        }, .6).to(button, {
            '--parachute-o': 0,
            '--parachute-y': '12px',
            duration: .2
        }).to(button, {
            '--arrow-y': '20px',
            duration: .7,
            ease: 'elastic.out(1, .8)'
        })

        gsap.to(button, {
            '--parachute-s': 1,
            '--number-o': 1,
            '--number-y': '0px',
            duration: .2,
            delay: .4
        })

        gsap.to(button, {
            ease: 'linear',
            keyframes: [{
                '--arrow-r': '190deg',
                '--arrow-x': '-12px',
                duration: .6,
                delay: .6
            }, {
                '--arrow-r': '170deg',
                '--arrow-x': '12px',
                duration: .6
            }, {
                '--arrow-r': '185deg',
                '--arrow-x': '-6px',
                duration: .7
            }, {
                '--arrow-r': '180deg',
                '--arrow-x': '0px',
                duration: .5
            }]
        })

        gsap.to(button, {
            '--arrow-r': '180deg',
            duration: .3
        })

        gsap.to(line, {
            keyframes: [{
                y: 24,
                duration: .15,
                delay: .125
            }, {
                y: 64.5,
                duration: .8,
                ease: 'elastic.out(1, .5)'
            }]
        })

        gsap.to(button, {
            '--success-o': 1,
            '--success-y': '0px',
            duration: .25,
            delay: 3.825
        })

        gsap.to(arrow, {
            morphSVG: 'M28.5858 10.0503C29.3669 9.2692 30.6332 9.2692 31.4142 10.0503L42.5 21.136C43.8807 22.5167 43.8807 24.7553 42.5 26.136C41.1193 27.5168 38.8807 27.5167 37.5 26.136L31.4142 20.0502C30.6332 19.2692 29.3669 19.2692 28.5858 20.0503L10.5 38.136C9.11931 39.5167 6.88073 39.5168 5.50002 38.136C4.11931 36.7553 4.11931 34.5167 5.50002 33.136L28.5858 10.0503Z',
            duration: .2,
            delay: 3.8
        })

    })
})


function getPoint(point, i, a, smoothing) {
    let cp = (current, previous, next, reverse) => {
            let p = previous || current,
                n = next || current,
                o = {
                    length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                    angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                },
                angle = o.angle + (reverse ? Math.PI : 0),
                length = o.length * smoothing;
            return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
        },
        cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing) {
    let points = [
            [10, 64.5],
            [140, update],
            [270, 64.5]
        ],
        d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
    return `<path d="${d}" /><path class="progress" d="${d}" />`;
}