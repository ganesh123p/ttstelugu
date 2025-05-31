const speakBtn = document.getElementById('speakBtn');
const textInput = document.getElementById('textInput');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const historyList = document.getElementById('historyList');
const splash = document.getElementById('splash');
const app = document.getElementById('app');
const tour = document.getElementById('tour');

setTimeout(() => {
  splash.classList.add('hidden');
  app.classList.remove('hidden');
  if (!localStorage.getItem("visited")) {
    tour.classList.remove('hidden');
    localStorage.setItem("visited", "true");
  }
}, 2500);

function hideTour() {
  tour.classList.add('hidden');
}

function detectLang(text) {
  if (/[ఀ-౿]/.test(text)) return "te-IN";
  if (/[ऀ-ॿ]/.test(text)) return "hi-IN";
  return "en-US";
}

function addToHistory(text) {
  let history = JSON.parse(localStorage.getItem("ttsHistory") || "[]");
  history = [text, ...history.filter(t => t !== text)].slice(0, 10);
  localStorage.setItem("ttsHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("ttsHistory") || "[]");
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.onclick = () => {
      textInput.value = item;
    };
    historyList.appendChild(li);
  });
}

speakBtn.onclick = () => {
  const text = textInput.value.trim();
  if (!text) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = detectLang(text);
  utter.rate = parseFloat(rateInput.value);
  utter.pitch = parseFloat(pitchInput.value);
  speechSynthesis.speak(utter);
  addToHistory(text);
};

renderHistory();
