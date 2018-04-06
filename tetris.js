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

  // Scoped to this function land
  const width = 10;
  const height = 22;
  const keyPressed = Object.create(null);
  const leftRightInputRate = 100;

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let droppingHeight = 22;
  let droppingWidth = 5;
  let droppingDelta = 0;
  let droppingRate = 1000;
  let leftRightInputDelta = 0;

  let tetrisWell = createGrid(
    {
      width,
      height,
    },
  );

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

  function updateDrop(delta) {
    droppingDelta += delta;
    if (droppingDelta > droppingRate) {
      droppingHeight -= 1;
      droppingDelta -= droppingRate;
      if (droppingHeight < 0) {
        droppingHeight = height;
      }
    }
  }

  // TODO: In the glorious future:
  // function rateCheck(delta, rate, functionThatYouWant);

  function handleLeftRightInput() {
    if (keyPressed.ArrowLeft) {
      if (droppingWidth > 0) { droppingWidth -= 1; }
    }

    if (keyPressed.ArrowRight) {
      if (droppingWidth < width - 1) { droppingWidth += 1; }
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

  function update(delta) {
    handleKeyInputs(delta);
    updateDrop(delta);
  }

  let pieceWidth = canvas.width / tetrisWell[0].length;
  let pieceHeight = canvas.height / tetrisWell.length;

  tetrisWell[2][4] = 1;

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
        droppingHeight,
        droppingWidth,
      );
      ctx.fillRect(
        x,
        y,
        pieceWidth,
        pieceHeight,
      );
    }
  }

  document.addEventListener('keyup', (event) => {
    const {key} = event;
    delete keyPressed[key];
  }, false);

  document.addEventListener('keydown', (event) => {
    const {key} = event;
    keyPressed[key] = 1;
  }, false);
}
