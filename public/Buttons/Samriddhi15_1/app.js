 btn = document.querySelector("button"),
      spinner = document.querySelector(".fa-circle-o-notch.fa-spin"),
      icon = document.querySelector("i"),
      btnText = document.querySelector(".btn-text");

      btn.onclick = function() {

        btn.style.cursor = "wait";
        btnText.textContent = "";
        btnText.style.margin = 0;
        icon.classList.remove("fa-check");
        icon.classList.add("fa-circle-o-notch", "fa-spin");

        setTimeout(() => {
          btn.style.pointerEvents = "none";
          btnText.textContent = "done"; 
          icon.classList.remove("fa-circle-o-notch", "fa-spin");
          icon.classList.add("fa-check", "checked");
        }, 4000);
      }
