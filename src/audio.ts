let audioPlaying = false;
const music = new Audio("audio/music/tetris.mp3");
music.loop = true;

const rotate = new Audio("audio/sfx/rotate.wav");

export function playAudio() {
  audioPlaying = true;
  music.play();
  const soundOn = document.getElementById("sound-on");
  if (soundOn) {
    soundOn.style.display = "none";
  }
  const soundOff = document.getElementById("sound-off");
  if (soundOff) {
    soundOff.style.display = "block";
  }
}

export function stopAudio() {
  audioPlaying = false;
  music.pause();
  const soundOn = document.getElementById("sound-on");
  if (soundOn) {
    soundOn.style.display = "block";
  }
  const soundOff = document.getElementById("sound-off");
  if (soundOff) {
    soundOff.style.display = "none";
  }
}

export function playRotate() {
  if (audioPlaying) {
    rotate.play();
  }
}
