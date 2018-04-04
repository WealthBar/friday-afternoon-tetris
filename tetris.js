{
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

  const width = 10;
  const height = 22;
  let tetrisWell = createGrid(
    {
      width,
      height,
    },
  );

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let droppingH = 22;
  let droppingW = 5;
  let droppingDelta = 0;
  let droppingRate = 1000;

  MainLoop.setUpdate(update)
    .setDraw(draw)
    .setEnd(end)
    .start();

  function end(
    fps,
    panic,
  ) {
    if (panic) {
      MainLoop.resetFrameDelta();
    }
  }

  function update(delta) {
    droppingDelta += delta;

    if (droppingDelta > droppingRate) {
      droppingH -= 1;
      droppingDelta -= droppingRate;
      if (droppingH < 0) {
        droppingH = height;
      }
    }
  }

  let pieceWidth = canvas.width / tetrisWell[0].length;
  let pieceHeight = canvas.height / tetrisWell.length;

  tetrisWell[2][4] = 1;
  console.log(tetrisWell);

  function toScreenCoords(
    h,
    w,
  ) {
    return [w * pieceWidth, canvas.height - (h + 1) * pieceHeight];
  }

  function draw() {
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

    for (let h = 0; h < height; ++h) {
      for (let w = 0; w < width; ++w) {
        if (tetrisWell[h][w] === 1) {
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

    {
      const [x, y] = toScreenCoords(
        droppingH,
        droppingW,
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
