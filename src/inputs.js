const keyPressed = Object.create(null);
const movementInputRate = 100;
let movementInputDelta = 0;
let flipKeyPressed = false;

function flipLeft(orientation) {
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

function flipRight(orientation) {
  // TODO
}

function handleFlip() {
  if (keyPressed.ArrowUp && !flipKeyPressed) {
    flipKeyPressed = true;
    pieceOrientation = flipLeft(pieceOrientation);
  }
}

function handleMovement() {
  if (keyPressed.ArrowLeft) {
    let leftmostCollisionBlock = getLeftmostCollision(tetrominos[droppingTetromino][pieceOrientation]);
    if (droppingWidth > -leftmostCollisionBlock) { droppingWidth -= 1; }
  }

  if (keyPressed.ArrowRight) {
    let rightmostCollisionBlock = getRightmostCollision(tetrominos[droppingTetromino][pieceOrientation]);
    console.log(rightmostCollisionBlock);
    if (droppingWidth < width - rightmostCollisionBlock) { droppingWidth += 1; }
  }
}

function handleKeyInputs(delta) {
  handleFlip();

  movementInputDelta += delta;
  if (movementInputDelta > movementInputRate) {
    movementInputDelta -= movementInputRate;
    handleMovement();
  }

  lastInputTime = Date.now
}

function resetKeyPress() {
  flipKeyPressed = false;
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
