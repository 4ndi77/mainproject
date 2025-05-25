let targetText = '';
let startTime;
function renderTargetText(text) {
  const container = document.getElementById('text-to-type');
  container.innerHTML = ''; // clear old content
  for (const char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    container.appendChild(span);
  }
}
async function getRandomSentenceFromPHP() {
  try {
    const response = await fetch('quotes.php');
    const data = await response.json();
    return data.quote;
  } catch (error) {
    console.error('Failed to load quote:', error);
    return "Failed to load quote. Please try again.";
  }
}

async function startTest() {
  document.getElementById('main-h1').style.display = 'none';
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('typing-test').style.display = 'block';

  targetText = await getRandomSentenceFromPHP();
  renderTargetText(targetText);

  const inputBox = document.getElementById('input-box');
  inputBox.value = '';
  inputBox.disabled = false;
  inputBox.focus();

  document.getElementById('results').innerHTML = '';
  document.getElementById('restart-btn').style.display = 'none';

  startTime = new Date();
}
async function restartTest() {
  targetText = await getRandomSentenceFromPHP();
  renderTargetText(targetText);

  const inputBox = document.getElementById('input-box');
  inputBox.value = '';
  inputBox.disabled = false;
  inputBox.focus();

  document.getElementById('results').innerHTML = '';
  document.getElementById('restart-btn').style.display = 'none';

  startTime = new Date();
}
document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById('input-box');
  const highScoreDisplay = document.getElementById('high-score-display');

  let bestWPM = localStorage.getItem('highScore');
  if (bestWPM) {
    highScoreDisplay.innerText = `🏅 Your Best WPM: ${bestWPM}`;
  }

  inputBox.addEventListener('input', () => {
    const input = inputBox.value;
    const spans = document.getElementById('text-to-type').querySelectorAll('span');

    for (let i = 0; i < spans.length; i++) {
      const char = input[i];
      if (char == null) {
        spans[i].className = '';
      } else if (char === targetText[i]) {
        spans[i].className = 'correct';
      } else {
        spans[i].className = 'incorrect';
      }
    }

    const now = new Date();
    const timeElapsed = (now - startTime) / 1000;
    const typedText = inputBox.value.trim();
    const wordsTyped = typedText === '' ? 0 : typedText.split(/\s+/).length;
    const liveWPM = Math.round((wordsTyped / timeElapsed) * 60);
    document.getElementById('live-wpm').innerText = `WPM: ${liveWPM}`;

    if (inputBox.value === targetText) {
      const endTime = new Date();
      const totalTime = (endTime - startTime) / 1000;
      const wordCount = targetText.trim().split(/\s+/).length;
      const finalWPM = Math.round((wordCount / totalTime) * 60);

      let highScore = localStorage.getItem('highScore');
      highScore = highScore ? parseInt(highScore) : 0;

      let highScoreMsg = '';
      if (finalWPM > highScore) {
        localStorage.setItem('highScore', finalWPM);
        highScoreMsg = '<br>🎉 New High Score!';
        highScoreDisplay.innerText = `🏅 Your Best WPM: ${finalWPM}`;
      } else {
        highScoreMsg = `<br>🏅 Best WPM: ${highScore}`;
      }

      document.getElementById('results').innerHTML =
        `✅ Done!<br>Time: ${totalTime.toFixed(2)}s<br>WPM: ${finalWPM}${highScoreMsg}`;
      document.getElementById('live-wpm').innerText = `WPM: ${finalWPM}`;
      inputBox.disabled = true;
      document.getElementById('restart-btn').style.display = 'inline-block';
    }
  });
});



document.getElementById('theme-toggle-btn').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});