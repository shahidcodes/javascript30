const video = document.querySelector("#video");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: 1 }).then(localStream => {
    console.log(localStream);
    video.srcObject = localStream;
  });
}

getVideo();

let manipulator = {
  negative: function(i, pixels) {
    pixels.data[i + 0] = 255 - pixels.data[i + 0]; // RED
    pixels.data[i + 1] = 255 - pixels.data[i + 1]; // GREEN
    pixels.data[i + 2] = 255 - pixels.data[i + 2]; // Blue
  },
  noise: function(i, pixels) {
    var rand = () => (0.5 - Math.random()) * 10;
    pixels.data[i + 0] = rand() + pixels.data[i + 0]; // RED
    pixels.data[i + 1] = rand() + pixels.data[i + 1]; // GREEN
    pixels.data[i + 2] = rand() + pixels.data[i + 2]; // Blue
  }
};

function doSomethingWithPixel(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    manipulator.noise(i, pixels);
  }
  pixels = greenScreen(pixels);
  return pixels;
}

function drawCanvas(e) {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    context.drawImage(video, 0, 0, width, height);
    // get pixels to mess with it
    let pixels = context.getImageData(0, 0, width, height);
    pixel = doSomethingWithPixel(pixels);
    // pixel = greenScreen(pixels);
    context.globalAlpha = 0.1;
    context.putImageData(pixels, 0, 0);
  }, 60);
}

function takePhoto(e) {
  let data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.download = "handsome";
  link.click();
}

let controls = document.querySelectorAll(".rgb input");

function greenScreen(pixels) {
  const levels = {};
  controls.forEach(input => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

video.addEventListener("canplay", drawCanvas);
