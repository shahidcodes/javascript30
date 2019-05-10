let playBtn = document.querySelector(".play_btn");
let videoPlayer = document.querySelector("video");
let skipBtn = document.querySelectorAll("[data-skip]");
let volume = document.querySelector("input[name='volume']");
let playbackRate = document.querySelector("input[name='playbackRate']");
let progressBar = document.querySelector(".progress_bar");
let progress = document.querySelector(".progress");

function toggleBtn(e) {
  let method = videoPlayer.paused ? "play" : "pause";
  videoPlayer[method]();
}

function changePlayIcon(e) {
  const icon = this.paused ? "►" : "❚❚";
  playBtn.textContent = icon;
}

function handleSkip(e) {
  videoPlayer.currentTime += parseFloat(this.dataset.skip);
}

function handleSlider(e) {
  videoPlayer[this.name] = this.value;
}

function handleProgress() {
  let { currentTime, duration } = videoPlayer;
  let seekPercentage = currentTime / duration;
  progressBar.style.flexGrow = `${seekPercentage}`;
}

function handleSeek(e) {
  let seekPercentage = e.offsetX / progress.offsetWidth;
  progressBar.style.flexGrow = seekPercentage;
  videoPlayer.currentTime = seekPercentage * videoPlayer.duration;
}

playBtn.addEventListener("click", toggleBtn);
videoPlayer.addEventListener("pause", changePlayIcon);
videoPlayer.addEventListener("play", changePlayIcon);
videoPlayer.addEventListener("click", toggleBtn);
videoPlayer.addEventListener("timeupdate", handleProgress);
skipBtn.forEach(btn => btn.addEventListener("click", handleSkip));
volume.addEventListener("input", handleSlider);
playbackRate.addEventListener("input", handleSlider);
progress.addEventListener("click", handleSeek);
