const keyPressed = Object.create(null);
const movementInputRate = 100;
let movementInputDelta = 0;
let rotateKeyPressed = false;
let downKeyPressed = false;

function rotateLeft(orientation) {
  return (orientation + 1) % pieceMax;
}

function rotateRight(orientation) {
  return (orientation - 1) % pieceMax;
}

function handleRotate() {
  if (keyPressed.ArrowUp && !rotateKeyPressed) {
    rotateKeyPressed = true;
    const potentialOrientation = rotateLeft(pieceOrientation);
    const tetromino = tetrominos[droppingTetromino][potentialOrientation];

    const collision = considerMovingThatWay({
      tetromino,
    });

    if (!collision) {
      pieceOrientation = potentialOrientation;
      playRotate();
    }
    // TODO: Bump if out of bounds
  }
}

function handleLeftRightMovement(tetromino) {
  const direction = keyPressed.ArrowRight ? 1 : -1;

  const collision = considerMovingThatWay({
    offsetW: direction,
    tetromino,
  });

  if (!collision) {
    droppingWidth += direction;
  }
}

function handleDrop() {
  droppingRate = downKeyPressed ? fastDroppingRate : defaultDroppingRate;
}

function handleMovement(delta) {
  movementInputDelta += delta;


  if (keyPressed.ArrowDown) {
    downKeyPressed = true;
  }
  handleDrop();

  if (movementInputDelta > movementInputRate) {
    movementInputDelta -= movementInputRate;
    const tetromino = tetrominos[droppingTetromino][pieceOrientation];

    if (keyPressed.ArrowLeft || keyPressed.ArrowRight) {
      handleLeftRightMovement(tetromino);
    }
  }
}

function handleKeyInputs(delta) {
  handleRotate();
  handleMovement(delta);
  lastInputTime = Date.now;
}

function resetKeyPress() {
  rotateKeyPressed = false;
  downKeyPressed = false;
}

// Event listeners
document.addEventListener(
  'keyup',
  (event) => {
    const { key } = event;
    delete keyPressed[key];
    resetKeyPress();
  },
  false,
);

document.addEventListener(
  'keydown',
  (event) => {
    const { key } = event;
    keyPressed[key] = 1;
  },
  false,
);
