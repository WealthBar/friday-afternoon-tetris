let audioPlaying = false;

function playAudio() {
  audioPlaying = true;
  document.getElementById("music").play();
  document.getElementById("sound-on").style.display = 'none';
  document.getElementById("sound-off").style.display = 'block';
}

function stopAudio() {
  audioPlaying = false;
  document.getElementById("music").pause();
  document.getElementById("sound-off").style.display = 'none';
  document.getElementById("sound-on").style.display = 'block';
}
