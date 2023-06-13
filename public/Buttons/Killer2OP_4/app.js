$(() => {
    var $sendBtn = $(".send-button"),
        $iWrapper = $(".icon-wrapper"),
        $i1 = $(".icon-1"),
        $i2 = $(".icon-2");

    function animationEvent() {
      var t,
          el = document.createElement("fakeelement");

      var animations = {
        animation: "animationend",
        OAnimation: "oAnimationEnd",
        MozAnimation: "animationend",
        WebkitAnimation: "webkitAnimationEnd"
      };

      for (t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    }

    $sendBtn.on("click", (e) => {
      $iWrapper.css("color", "#66bb6a");
      $iWrapper.addClass("icon-wrapper-animation");
      $sendBtn.addClass("clicked");
      $i1.delay(900);
      $i1.fadeTo(300, 0);
      $i2.delay(900);
      $i2.fadeTo(300, 1);
    });

    $sendBtn.on(animationEvent(), (e) => {
      if (e.originalEvent.animationName == "input-shadow") {
        $sendBtn.removeClass("clicked");
      }
    });

    $iWrapper.on(animationEvent(), (e) => {
      if (e.originalEvent.animationName == "icon-animation") {
        $iWrapper.removeClass("icon-wrapper-animation");
        setTimeout(reset, 1200);
      }
    });

    function reset() {
      $i1.fadeTo(250, 1);
      $i2.fadeTo(250, 0);
      $iWrapper.css("color", "#f8bbd0");
    }
  });