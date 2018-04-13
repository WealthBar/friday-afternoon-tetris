const keyPressed = Object.create(null);
const movementInputRate = 100;
let movementInputDelta = 0;
let rotateKeyPressed = false;

function rotateLeft(orientation) {
  switch(orientation) {
    case 'pieceDown':
      return 'pieceRight';
      break;
    case 'pieceLeft':
      return 'pieceDown';
      break;
    case 'pieceUp':
      return 'pieceLeft';
      break;
    case 'pieceRight':
      return 'pieceUp';
      break;
    default:
      console.log('why');
      break;
  }
}

function rotateRight(orientation) {
  // TODO
}

function handleRotate() {
  if (keyPressed.ArrowUp && !rotateKeyPressed) {
    rotateKeyPressed = true;
    pieceOrientation = rotateLeft(pieceOrientation);
    playRotate();
    // TODO: Bump if out of bounds
  }
}

function handleMovement(delta) {
  movementInputDelta += delta;
  if (movementInputDelta > movementInputRate) {
    movementInputDelta -= movementInputRate;
    tetromino = tetrominos[droppingTetromino][pieceOrientation];
    if (isNotColliding(keyPressed, droppingWidth, tetromino)) {
      if (keyPressed.ArrowLeft) { droppingWidth -= 1; }
      if (keyPressed.ArrowRight) { droppingWidth += 1; }
    }
  }
}

function handleKeyInputs(delta) {
  handleRotate();
  handleMovement(delta);
  lastInputTime = Date.now
}

function resetKeyPress() {
  rotateKeyPressed = false;
}

// Event listeners
document.addEventListener('keyup', (event) => {
  const {key} = event;
  delete keyPressed[key];
  resetKeyPress();
}, false);

document.addEventListener('keydown', (event) => {
  const {key} = event;
  keyPressed[key] = 1;
}, false);
