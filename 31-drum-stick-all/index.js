let lastKeyCode;
const keyCodes = [97, 100, 102, 103, 104, 106, 107, 108, 115];
const getKeyCode = () => {
  const keyCode = keyCodes[Math.floor(Math.random() * keyCodes.length)];
  if (keyCode === lastKeyCode) return getKeyCode();
  return keyCode;
};

const keyEl = document.querySelector("#keyEl");

function setKey(key) {
  keyEl.innerHTML = `${key === " " ? " Space" : key}`;
}

function onkeypress(e) {
  setKey(e.key);
  let keyCode = getKeyCode();
  let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  audio.currentTime = 0;
  audio.play();
}

function throttle(callback, limit) {
  var wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}
const debouncedKeyPress = throttle(function (e) {
  onkeypress(e);
}, 300);

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  debouncedKeyPress(e);
});
