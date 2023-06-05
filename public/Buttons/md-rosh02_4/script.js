const submit_btn = document.querySelector(".submitbtn");
        submit_btn.addEventListener("click", () => {
            submit_btn.classList.add("submiting");
            submit_btn.innerHTML = "";
            setTimeout(() => {
                submit_btn.classList.remove("submiting");
                submit_btn.innerHTML = "Done!";
            },3000)
        });
