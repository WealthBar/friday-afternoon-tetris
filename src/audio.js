let audioPlaying = false;
const music = new Audio('audio/music/tetris.mp3')
music.loop = true;

const rotate = new Audio('audio/sfx/rotate.wav');

function playAudio() {
  audioPlaying = true;
  music.play();
  document.getElementById("sound-on").style.display = 'none';
  document.getElementById("sound-off").style.display = 'block';
}

function stopAudio() {
  audioPlaying = false;
  music.pause();
  document.getElementById("sound-off").style.display = 'none';
  document.getElementById("sound-on").style.display = 'block';
}

function playRotate() {
  if (audioPlaying) {
    rotate.play();
  }
}
