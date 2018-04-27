const keyPressed = Object.create(null);
const movementInputRate = 100;
let movementInputDelta = 0;
let rotateKeyPressed = false;

function rotateLeft(orientation) {
  return (orientation + 1) % pieceMax;
}

function rotateRight(orientation) {
  return (orientation - 1) % pieceMax;
}

function handleRotate() {
  if (keyPressed.ArrowUp && !rotateKeyPressed) {
    rotateKeyPressed = true;
    const po = rotateLeft(pieceOrientation);
    const tetromino = tetrominos[droppingTetromino][po];

    const collision = considerMovingThatWay({
      tetromino,
    });

    if (!collision) {
      pieceOrientation = po;
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

function handleMovement(delta) {
  movementInputDelta += delta;

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
