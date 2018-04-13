function createGrid(
  {
    width,
    height,
  },
) {
  const grid = Array(height);
  for (let h = 0; h < height; ++h) {
    grid[h] = Array(width).fill(0);
  }
  return grid;
}

let tetrisWell = createGrid(
  {
    width: wellWidth + 2,
    height: wellHeight + 1,
  },
);

const wellBorderLeft = -1;
const wellBorderRight = -2;
const wellBorderBottom = -3;

function addBorders() {
  for (let i = 0; i < tetrisWell.length; ++i) {
    tetrisWell[i][0] = wellBorderLeft;
    tetrisWell[i][wellWidth + 1] = wellBorderRight;
  }
  for (let i = 0; i < tetrisWell[0].length; ++i) {
    tetrisWell[0][i] = wellBorderBottom;
  }
}

addBorders();

tetrisWell[3][4] = 1;

let pieceWidth = canvas.width / wellWidth;
let pieceHeight = canvas.height / wellHeight;

function toScreenCoords(
  h,
  w,
) {
  return [(w - 1) * pieceWidth, canvas.height - h * pieceHeight];
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
  for (let h = 0; h < wellHeight; ++h) {
    for (let w = 0; w < wellWidth; ++w) {
      if (tetrisWell[h][w] !== 0) {
        let [x, y] = toScreenCoords(
          h,
          w,
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

function pickTetrominoColor(x, y) {
  let gradient = ctx.createRadialGradient(x,y,10,x+1,y+1,40);
  gradient.addColorStop(0,"red"); // TODO: Cycle through colors
  gradient.addColorStop(1,"white");
  return gradient;
}

function drawTetromino(orientation) {
  currentTetromino = tetrominos[droppingTetromino][orientation];
  for (let i = 0; i < currentTetromino.length; i++) {
    for (let j = 0; j < currentTetromino[i].length; j++) {
      if (currentTetromino[i][j] !== 1) { continue; }

      const [x, y] = toScreenCoords(
        droppingHeight - i,
        droppingWidth + j,
      );

      let gradient = pickTetrominoColor(x, y);
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
