import {gameState} from "./globals";
import {tetrominos} from "./tetrominos";
import {considerMovingThatWay} from "./collisions";
import {playRotate} from "./audio";

const keyPressed = Object.create(null);
const movementInputRate = 100;
let movementInputDelta = 0;
let rotateKeyPressed = false;
let downKeyPressed = false;
let lastInputTime = Date.now();

function rotateLeft(orientation) {
  return (orientation + 1) % gameState.pieceMax;
}

function rotateRight(orientation) {
  return (orientation - 1) % gameState.pieceMax;
}

function handleRotate() {
  if (keyPressed.ArrowUp && !rotateKeyPressed) {
    rotateKeyPressed = true;
    const potentialOrientation = rotateLeft(gameState.pieceOrientation);
    const tetromino = tetrominos[gameState.droppingTetromino][potentialOrientation];

    const collision = considerMovingThatWay({
      tetromino,
    });

    if (!collision) {
      gameState.pieceOrientation = potentialOrientation;
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
    gameState.droppingWidth += direction;
  }
}

function handleDrop() {
  gameState.droppingRate = downKeyPressed ? gameState.fastDroppingRate : gameState.defaultDroppingRate;
}

function handleMovement(delta) {
  movementInputDelta += delta;


  if (keyPressed.ArrowDown) {
    downKeyPressed = true;
  }
  handleDrop();

  if (movementInputDelta > movementInputRate) {
    movementInputDelta -= movementInputRate;
    const tetromino = tetrominos[gameState.droppingTetromino][gameState.pieceOrientation];

    if (keyPressed.ArrowLeft || keyPressed.ArrowRight) {
      handleLeftRightMovement(tetromino);
    }
  }
}

export function handleKeyInputs(delta) {
  handleRotate();
  handleMovement(delta);
  lastInputTime = Date.now();
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
