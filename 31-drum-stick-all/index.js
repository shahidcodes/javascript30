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

function onkeypress(keyCode) {
  let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  audio.currentTime = 0;
  audio.play();
}

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  console.log("key down", e);
  setKey(e.key);
  let keyCode = getKeyCode();
  onkeypress(keyCode);
});
