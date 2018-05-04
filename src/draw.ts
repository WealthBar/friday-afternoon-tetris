// todo: move initialization stuff out to somewhere else
import {gameState} from "./globals";
import {tetrominos} from "./tetrominos";
import {canvasCtor} from "./canvas";

function createGrid(
  {
    width,
    height,
  },
) {
  const grid = Array(height);
  for (let h = 0; h < height; ++h) {
    grid[h] = Array(width)
      .fill(0);
  }
  return grid;
}

gameState.tetrisWell = createGrid(
  {
    width: gameState.wellWidth + 2,
    height: gameState.wellHeight + 5,
  },
);

const canvasState = canvasCtor();
let ctx = canvasState.ctx;
let canvas = canvasState.canvas;

const wellBorderLeft = -1;
const wellBorderRight = -2;
const wellBorderBottom = -3;

function addBorders() {
  for (let i = 0; i < gameState.tetrisWell.length; ++i) {
    gameState.tetrisWell[i][0] = wellBorderLeft;
    gameState.tetrisWell[i][gameState.wellWidth + 1] = wellBorderRight;
  }
  for (let i = 0; i < gameState.tetrisWell[0].length; ++i) {
    gameState.tetrisWell[0][i] = wellBorderBottom;
  }
}

addBorders();

gameState.tetrisWell[2][gameState.wellWidth+1] = 1;


let pieceWidth = canvas.width / gameState.wellWidth;
let pieceHeight = canvas.height / gameState.wellHeight;

function toScreenCoords(
  {
    h,
    w,
  },
) {
  return {
    x: w * pieceWidth,
    y: canvas.height - (h+1) * pieceHeight,
  };
}

function drawPlayerArea() {
  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height,
  );

  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';
  ctx.imageSmoothingEnabled = false;
  ctx.strokeRect(
    0,
    0,
    canvas.width,
    canvas.height,
  );
}

function drawWell() {
  for (let h = 0; h < gameState.wellHeight; ++h) {
    for (let w = 0; w < gameState.wellWidth; ++w) {
      if (gameState.tetrisWell[h+1][w+1] !== 0) {
        const { x, y } = toScreenCoords(
          {
            h,
            w,
          },
        );

        ctx.fillRect(
          x,
          y,
          pieceWidth,
          pieceHeight,
        );
      }
    }
  }
}

function pickTetrominoColor(
  x,
  y,
  color,
) {
  let gradient = ctx.createRadialGradient(
    x,
    y,
    10, x + 1, y + 1,
    40,
  );
  gradient.addColorStop(
    0,
    color,
  );
  gradient.addColorStop(
    1,
    'white',
  );
  return gradient;
}

function drawTetromino(orientation, color) {
  // console.log(JSON.stringify(
  //   {
  //     droppingWidth,
  //     droppingHeight,
  //   },
  //   undefined,
  //   2,
  // ));
  let currentTetromino = tetrominos[gameState.droppingTetromino][orientation];
  for (let i = 0; i < currentTetromino.length; i++) {
    for (let j = 0; j < currentTetromino[i].length; j++) {
      if (currentTetromino[i][j] !== 1) {
        continue;
      }

      const { x, y } = toScreenCoords(
        {
          h: gameState.droppingHeight + i,
          w: gameState.droppingWidth + j,
        },
      );

      const gradient = pickTetrominoColor(
        x,
        y,
        color,
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(
        x,
        y,
        pieceWidth,
        pieceHeight,
      );
    }
  }
}

export function draw() {
  drawPlayerArea();
  drawWell();
  drawTetromino(gameState.pieceOrientation, gameState.currentTetrominoGradient);
}
