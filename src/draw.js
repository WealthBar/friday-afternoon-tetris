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
    width,
    height,
  },
);

tetrisWell[2][4] = 1;

let pieceWidth = canvas.width / tetrisWell[0].length;
let pieceHeight = canvas.height / tetrisWell.length;

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
  for (let h = 0; h < height; ++h) {
    for (let w = 0; w < width; ++w) {
      if (tetrisWell[h][w] === 1) {
        let [x, y] = toScreenCoords(
          h,
          w,
        );

        // ctx.fillRect(
        //   x,
        //   y,
        //   pieceWidth,
        //   pieceHeight,
        // );
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

function drawTetromino() {
  currentTetromino = tetrominos[droppingTetromino].piece;
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
