const walletBtn = document.getElementById("wallet-btn")
const circle = document.createElement("span")

walletBtn.addEventListener("click", (e) => {
    const x = e.clientX
    const y = e.clientY
    const buttonTop = e.target.offsetTop
    const buttonLeft = e.target.offsetLeft

    const xInside = x - buttonLeft
    const yInside = y - buttonTop

    circle.classList.add("circle")

    circle.style.top = yInside + "px"
    circle.style.left = xInside + "px"

    e.target.appendChild(circle)

    setTimeout(() => {
        circle.remove()
    }, 10000)
})
