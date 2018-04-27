{
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

  function pickNewPiece() {
    droppingTetromino = Math.floor(Math.random()*tetrominos.length);
  }

  function commitToWell(tetromino) {
    for (let tH = 0; tH < tetromino.length; ++tH) {
      for (let tW = 0; tW < tetromino[tH].length; ++tW) {
        if (tetromino[tH][tW] === 0) {
          continue;
        }
        let wellW = droppingWidth + tW + 1;
        let wellH = droppingHeight + tH + 1;

        tetrisWell[wellH][wellW] = 1; // tetromino[tH][tW];
      }
    }
  }

  function clearLine(row) {
    for (let i = 1; i < tetrisWell.length-1; ++i) {
      for (let j = 1; j < tetrisWell[i].length-1; ++j) {
        tetrisWell[i][j] = tetrisWell[i+1][j]
      }
    }
  }

  function clearLines() {
    for (let i = 1; i < tetrisWell.length; i++) {
      const complete = tetrisWell[i].slice(1, tetrisWell[i].length - 1).every(x => x > 0 )
      if (complete){
        clearLine(i)
      }
    }
  }

  function updateDrop(delta) {
    const tetromino = tetrominos[droppingTetromino][pieceOrientation];

    droppingDelta += delta;
    if (droppingDelta > droppingRate) {
      const colliding = considerMovingThatWay({
        offsetH: -1,
        tetromino,
      });

      if (!colliding) {
        droppingHeight -= 1;
        droppingDelta -= droppingRate;
        // todo: add some latch time before committing the the well.
      } else {
        // todo: copy into well
        // todo: spawn new piece

        commitToWell(tetromino);

        droppingWidth = wellWidth / 2;
        droppingHeight = wellHeight;
        clearLines();
        pickNewPiece();
        currentTetrominoGradient = chooseColor();
      }
    }
  }

  // TODO: In the glorious future:
  // function rateCheck(delta, rate, functionThatYouWant);

  function update(delta) {
    handleKeyInputs(delta);
    updateDrop(delta);
  }

  function draw() {
    drawPlayerArea();
    drawWell();
    drawTetromino(pieceOrientation, currentTetrominoGradient);
  }
}
