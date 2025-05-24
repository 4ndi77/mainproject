let targetText = '';
let startTime;

const sentences = [
  "The forest whispered secrets to the wind as leaves danced gently. Birds chirped melodies above while deer stepped softly through mossy paths, hidden from sight, yet alive in every heartbeat.",
  "Rain tapped on the window like a lullaby. Inside, a candle flickered, casting soft shadows across the room. A book lay open, forgotten, as dreams gently pulled thoughts elsewhere.",
  "Mountains stood like ancient guardians beneath a sky of fire and gold. Clouds drifted lazily, painting stories across the heavens while the earth remained still, patient, and endlessly watching.",
  "She wandered through fields of lavender, the scent clinging to her skin. Butterflies followed like floating dreams, and for a moment, the world became calm, vivid, and perfectly silent.",
  "The lighthouse blinked steadily through the storm, guiding ships home. Waves crashed below with fury, but its light never wavered, a steadfast symbol of hope in the face of chaos.",
  "Time slowed in the old café. Cups clinked softly, laughter lingered in corners, and every memory seemed preserved in coffee stains, echoes of past conversations that refused to fade.",
  "Stars scattered across the midnight sky like diamonds on velvet. Crickets sang in rhythm, and a single owl soared, silent and majestic, over a world fast asleep and unaware.",
  "The city buzzed with endless life: horns, footsteps, conversations tangled in motion. Neon lights blinked above, casting colors on wet pavement while someone, somewhere, found meaning in the noise.",
  "He wrote her name in the sand, watching waves erase it slowly. Each tide carried away a little more, yet the memory remained, deeper than any ocean could reach.",
  "Autumn leaves spiraled down in bursts of color. Children laughed, chasing wind-blown piles while parents watched, cups in hand, wrapped in scarves and moments they hoped would never end.",
  "Silence filled the room after the last note played. Her fingers hovered above the piano, trembling. In that pause, emotion echoed louder than sound, heavy with beauty and loss.",
  "The dog waited by the door each day, ears perked. Footsteps never came. Still, his tail wagged with hope, proving loyalty never faltered—even in the face of absence.",
  "Snow fell in perfect stillness. The world softened under white blankets, each flake a whispered promise of peace. Fires crackled indoors as hearts leaned closer, warmed by quiet joy.",
  "Bookshelves lined the dusty room, each spine a gateway to another life. He ran his fingers across the titles, searching for a story to match the ache inside.",
  "They danced barefoot under moonlight, laughter blending with music from a distant radio. Stars watched from above, their joy infinite, framed in a night they’d remember forever."
];
function renderTargetText(text) {
  const container = document.getElementById('text-to-type');
  container.innerHTML = ''; // clear old content
  for (const char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    container.appendChild(span);
  }
}
function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function startTest() {
  document.getElementById('main-h1').style.display = 'none';
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('typing-test').style.display = 'block';

  targetText = getRandomSentence();
  renderTargetText(targetText);

  const inputBox = document.getElementById('input-box');
  inputBox.value = '';
  inputBox.disabled = false;
  inputBox.focus();

  document.getElementById('results').innerHTML = '';
  document.getElementById('restart-btn').style.display = 'none';

  startTime = new Date();
}
function restartTest() {
  targetText = getRandomSentence();
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

  // Save user preference to localStorage
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// On page load, apply saved theme if any
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});
