const commandText = document.querySelector("p.command");
const resultText = document.querySelector("p.result");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const engine = new SpeechRecognition();
engine.interimResults = true;
console.log(engine);
class CommandExecutor {
  startWith(str) {
    if (str) this.say(str);
    return this;
  }

  run(command) {
    switch (command.toLowerCase()) {
      case "weather":
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Hyderabad,IN&appid=0eaf14848f19ad65407867fcbf3b43e6"
        )
          .then(res => res.json())
          .then(json => {
            this.result = `Weather in ${
              json.name
            } is ${this.convertKelvinToCelsius(json.main.temp).toFixed(
              2
            )} celsius`;
            resultText.textContent = this.result;
            this.say(this.result);
          });
        break;
      case "time":
        let date = new Date().toLocaleString("en-US", {
          hour: "numeric",
          hour12: true
        });
        this.result = `Its ${date}`;
        resultText.textContent = this.result;
        this.say(this.result);
        break;
      case "about":
        this.result = `I am Xalda. I am still learning to be cool. Nice to meet you.`;
        resultText.textContent = this.result;
        this.say(this.result);
        break;
      case "name":
        this.result = `I am Xalda. Your digial assistant`;
        resultText.textContent = this.result;
        this.say(this.result);
        break;
    }
  }

  say(m) {
    console.log(m);
    var msg = new SpeechSynthesisUtterance(m);
    speechSynthesis.speak(msg);
  }

  convertKelvinToCelsius(kelvin) {
    if (kelvin < 0) {
      return "below absolute zero (0 K)";
    } else {
      return kelvin - 273.15;
    }
  }
}

function processCommand(transcript) {
  const ce = new CommandExecutor();
  commandText.textContent = transcript;
  if (transcript.includes("weather")) {
    ce.startWith("Fetching your weather").run("weather");
  } else if (transcript.includes("time")) {
    ce.startWith().run("time");
  } else if (transcript.includes("about you")) {
    ce.run("about");
  } else if (transcript.includes("your name")) {
    ce.run("name");
  }
}

engine.addEventListener("result", e => {
  let transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("");
  if (e.results[0].isFinal) {
    processCommand(transcript);
  }
});

engine.addEventListener("end", engine.start);

engine.start();
