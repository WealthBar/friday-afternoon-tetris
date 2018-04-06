const keyPressed = Object.create(null);
const leftRightInputRate = 100;
let leftRightInputDelta = 0;


function handleLeftRightInput() {
  if (keyPressed.ArrowLeft) {
    if (droppingWidth > 0) { droppingWidth -= 1; }
  }

  if (keyPressed.ArrowRight) {
    if (droppingWidth < width - tetrominos[droppingTetromino].width) { droppingWidth += 1; }
  }
}

function handleKeyInputs(delta) {
  leftRightInputDelta += delta;
  if (leftRightInputDelta > leftRightInputRate) {
    leftRightInputDelta -= leftRightInputRate;
    handleLeftRightInput();
  }

  lastInputTime = Date.now
}

// Event listeners
document.addEventListener('keyup', (event) => {
  const {key} = event;
  delete keyPressed[key];
}, false);

document.addEventListener('keydown', (event) => {
  const {key} = event;
  keyPressed[key] = 1;
}, false);
