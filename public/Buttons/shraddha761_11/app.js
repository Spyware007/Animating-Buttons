"use strict";

const BTN_COLOR = "#ffffff";
const BTN_BACKGROUND_COLOR = "#0d5eff";
const BTN_WIDTH = 225;
const BTN_HEIGHT = 80;
const BTN_BORDER_RADIUS = "0.75em";
const BTN_SIZE = 180;
const ANIMATION_TIME = 0.4;
const UPLOADING_BACKGROUND_COLOR = "#ffffff";
const UPLOADING_WIDTH = 320;
const UPLOADING_HEIGHT = 30;
const DEFAULT_CONTAINER_BACKGROUND_COLOR = "#143982";
const DEFAULT_BTN_UPLOAD_BACKGROUND_COLOR = "#0d5eff";
const COMPLETE_CONTAINER_BACKGROUND_COLOR = "#005e02";
const COMPLETE_BTN_UPLOAD_BACKGROUND_COLOR = "#0fe600";
const COMPLETE_SIZE = 180;
const CHECK_WIDTH = "100%";
const CHECK_HEIGHT = "100%";
const PROGRESS_TIME = 2;
const container = document.querySelector("#container");
const btnUpload = document.querySelector("#btn_upload");
const progress = btnUpload.querySelector(".progress");
const check = btnUpload.querySelector(".check");
const check1 = btnUpload.querySelector(".check > span:first-child");
const check2 = btnUpload.querySelector(".check > span:last-child");
const tl = gsap.timeline();

let uploading = false;

function uploadStart() {
  // The button will become circle
  // The UPLOAD text will fade
  tl.to(btnUpload, {
    width: BTN_SIZE,
    height: BTN_SIZE,
    color: "transparent",
    fill: "transparent",
    borderRadius: "50%",
    duration: ANIMATION_TIME,
    ease: "elastic.out(1, 0.3)"
  });
  
  // The button will become a progress bar
  tl.to(btnUpload, {
    backgroundColor: UPLOADING_BACKGROUND_COLOR,
    width: UPLOADING_WIDTH,
    height: UPLOADING_HEIGHT,
    borderRadius: "0.25em",
    duration: ANIMATION_TIME,
    ease: "power2.out",
  });
  
  // Render the progress "speech bubble"
  tl.to(progress, {
    display: "flex"
  });
  
  // Show the progress "speech bubble" (Fade in)
  tl.to(progress, {
    opacity: 1,
    duration: ANIMATION_TIME
  });
}

function uploadProcess() {
  let uploadProgress = {
    val: 0
  };
  
  // Change the progress of upload
  tl.to(uploadProgress, PROGRESS_TIME, {
    val: 100,
    ease: "power4.inOut",
    onStart: function() {
      // Tilt the progress "speech bubble"
      tl.to(progress, {
        transform: "translateX(" + (progress.clientWidth / -2) + "px) rotate(12deg)",
        delay: 0,
        ease: "power2.out"
      }, "-=" + PROGRESS_TIME);
    },
    onUpdate: function() {
      let value = Math.floor(uploadProgress.val);
      
      // Increase the value of the progress (blue colored progress on progress bar)
      btnUpload.style.backgroundImage = "linear-gradient(to right, " +
        BTN_BACKGROUND_COLOR + " 0 " + value + "%, transparent " + value + "% 0)";
      
      // Change the text of the progress "speech bubble"
      progress.innerText = value + "%";
      
      // Change the position of the progress "speech bubble"
      progress.style.left = (UPLOADING_WIDTH * (value / 100)) + "px";
    },
    onComplete: function() {
      // Remove the tilting of the progress "speech bubble"
      tl.to(progress, {
        transform: "translateX(" + (progress.clientWidth / -2) + "px)",
      });
      
      uploadEnd();
    }
  });
}

function uploadEnd() {
  // Hide the progress "speech bubble" (Fade out)
  tl.to(progress, {
    opacity: 0,
    duration: ANIMATION_TIME,
    ease: "power2.out",
    onComplete: function() {
      btnUpload.style.backgroundImage = null;
      btnUpload.style.backgroundColor = BTN_BACKGROUND_COLOR;
    }
  });

  // Change the background color of the container
  tl.to(container, {
    backgroundColor: COMPLETE_CONTAINER_BACKGROUND_COLOR,
    duration: ANIMATION_TIME,
    ease: "power2.out",
  });

  // Change the background color, as well as the shape of the upload button
  // As the same time as the background color of the contaianer changes
  tl.to(btnUpload, {
    backgroundColor: COMPLETE_BTN_UPLOAD_BACKGROUND_COLOR,
    width: COMPLETE_SIZE,
    height: COMPLETE_SIZE,
    borderRadius: "50%",
    duration: ANIMATION_TIME,
    ease: "back.out",
    onComplete: function() {
      check.style.display = "block";
    }
  }, "-=" + ANIMATION_TIME);

  // Show the tail of the completed check mark
  tl.to(check1, {
    height: CHECK_HEIGHT,
    duration: ANIMATION_TIME,
    ease: "power2.out"
  });

  // Show the body of the completed check mark
  tl.to(check2, {
    width: CHECK_WIDTH,
    duration: ANIMATION_TIME,
    ease: "bounce.out",
    onComplete: function() {
      setTimeout(function() {
        // After 5000 milliseconds, return the button and
        // the container into original state
        initialize();
      }, 5000);
    }
  });
}

function initialize() {
  uploading = false;

  btnUpload.style.backgroundImage = null;

  progress.style.left = "0px";
  progress.innerText = "";
  
  tl.to(container, {
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND_COLOR,
    duration: ANIMATION_TIME,
    ease: "power2.out",
  });

  tl.to(btnUpload, {
    color: BTN_COLOR,
    fill: BTN_COLOR,
    backgroundColor: DEFAULT_BTN_UPLOAD_BACKGROUND_COLOR,
    width: BTN_WIDTH,
    height: BTN_HEIGHT,
    borderRadius: BTN_BORDER_RADIUS,
    duration: ANIMATION_TIME,
    ease: "bounce.out"
  }, "-=" + ANIMATION_TIME);

  tl.to(check, {
    opacity: 0,
    duration: ANIMATION_TIME,
    ease: "bounce.out",
    onComplete: function() {
      check.style.opacity = 1;
      check.style.display = "none";
      
      check1.style.height = "0px";
      
      check2.style.width = "0px";
    }
  }, "-=" + ANIMATION_TIME);
}

btnUpload.addEventListener("click", function() {
  if (uploading === true) {
    return;
  }
  
  uploading = true;
  
  this.classList.add("btn-upload-uploading");
  
  uploadStart();
  uploadProcess();
});