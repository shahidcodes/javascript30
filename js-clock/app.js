function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(function() {
  function tranformHand(handPrefix, degrees) {
    let hand = document.querySelector(`.${handPrefix}-hand`);
    hand.style.transform = `rotate(${degrees + 90}deg)`;
  }
  function calculateTime() {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    if (currentHour > 12) currentHour = currentHour - 12;
    tranformHand("hour", currentHour * 30);
    let currentMinute = currentDate.getMinutes();
    tranformHand("minute", currentMinute * 6);
    let currentSecond = currentDate.getSeconds();
    tranformHand("second", currentSecond * 6);
  }
  calculateTime();
  setInterval(calculateTime, 1000);
});
