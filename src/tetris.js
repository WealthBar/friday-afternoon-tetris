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

  }

  function commitToWell(tetromino) {
    for (let tH = 0; tH < tetromino.length; ++tH) {
      for (let tW = 0; tW < tetromino[tH].length; ++tW) {
        if (tetromino[tH][tW] === 0) {
          continue;
        }
        let wellW = droppingWidth + tW;
        let wellH = droppingHeight + tH;

        tetrisWell[wellH][wellW] = tetromino[tH][tW];
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

        droppingHeight = wellHeight; // piece height
        pickNewPiece();
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
    drawTetromino(pieceOrientation);
  }
}
