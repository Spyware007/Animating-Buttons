const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";
  
    hours = hours % 12 || 12;
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);
  
    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
  };
  
  updateTime();
  setInterval(updateTime, 1000);
  
  $("#stopwatch-btn").click(function () {
    $(".main-container > div").slideUp();
    $(".stopwatch").slideDown();
    $(".type").html("Stopwatch");
  });
  
  $("#timer-btn").click(function () {
    $(".main-container > div").slideUp();
    $(".timer").slideDown();
    $(".type").html("Timer");
  });
  
  $(".back-btn").click(function () {
    $(".main-container > div").slideUp();
    $(".clock").slideDown();
    $(".type").html("Clock");
  });
  
  let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;
  
  function stopwatch() {
    stopwatchMiliSeconds++;
    if (stopwatchMiliSeconds === 100) {
      stopwatchMiliSeconds = 0;
      stopwatchSeconds++;
    }
    if (stopwatchSeconds === 60) {
      stopwatchSeconds = 0;
      stopwatchMinutes++;
    }
    if (stopwatchMinutes === 60) {
      stopwatchMinutes = 0;
      stopwatchHours++;
    }
  
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
  }
  
  function startStopwatch() {
    if (!stopwatchRunning) {
      stopwatchInterval = setInterval(stopwatch, 10);
      stopwatchRunning = true;
    }
  }
  
  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
  }
  
  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    laps = 0;
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
  }
  
  $(".start-stopwatch").click(function () {
    startStopwatch();
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
  });
  
  $(".lap-stopwatch").click(function () {
    laps++;
    $(".lap").removeClass("active");
    $(".laps").prepend(
      ` <div class="lap active">
        <p>Lap ${laps}</p>
        <p>
          ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(
        stopwatchMinutes
      )} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
        stopwatchMiliSeconds
      )}
        </p>
      </div>
     `
    );
  });
  
  $(".reset-stopwatch").click(function () {
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
    $(".laps").html("");
  });
  
  function addTrailingZero(number) {
    return number < 10 ? "0" + number : number;
  }
  
  let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerRunning = false,
    timerInterval;
  
  function getTime() {
    time = prompt("Enter time in minutes");
    time = time * 60;
    setTime();
  }
  function setTime() {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);
    timerMiliseconds = 0;
  
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));
  }
  
  function timer() {
    timerMiliseconds--;
    if (timerMiliseconds === -1) {
      timerMiliseconds = 99;
      timerSeconds--;
    }
    if (timerSeconds === -1) {
      timerSeconds = 59;
      timerMinutes--;
    }
    if (timerMinutes === -1) {
      timerMinutes = 59;
      timerHours--;
    }
  
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));
  
    timeUp();
  }
  
  function startTimer() {
    if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
      getTime();
    } else {
      timerInterval = setInterval(timer, 10);
      timerRunning = true;
      $(".start-timer").hide();
      $(".stop-timer").show();
    }
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    $(".start-timer").show();
    $(".stop-timer").hide();
  }
  
  function resetTimer() {
    stopTimer();
    time = 0;
    setTime();
  }
  
  function timeUp() {
    if (
      timerHours === 0 &&
      timerMinutes === 0 &&
      timerSeconds === 0 &&
      timerMiliseconds === 0
    ) {
      stopTimer();
      alert("Time's up!");
  
      setTime();
    }
  }
  
  $(".start-timer").click(startTimer);
  
  $(".stop-timer").click(stopTimer);
  
  $(".reset-timer").click(function () {
    resetTimer();
    if (!timerRunning) {
      $(".start-timer").show();
      $(".stop-timer").hide();
    }
  });