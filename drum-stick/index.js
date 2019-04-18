function onkeypress(keyCode) {
  let btn = document.querySelector(`div[data-key="${keyCode}"]`);
  if (!btn) return;
  let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  audio.currentTime = 0;
  audio.play();
  btn.classList.add("playing");
}

document.addEventListener("keypress", e => {
  let keyCode = e.keyCode;
  onkeypress(keyCode);
});

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

let divs = Array.from(document.querySelectorAll(".box"));
divs.forEach(key => {
  key.addEventListener("transitionend", removeTransition);
  let keyCode = key.getAttribute("data-key");
  key.addEventListener("click", () => onkeypress(keyCode));
});
