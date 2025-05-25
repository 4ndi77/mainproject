<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$sentences = [
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
header('Content-Type: application/json');
echo json_encode(['quote' => $sentences[array_rand($sentences)]]);
?>