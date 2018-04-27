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

  function updateDrop(delta) {
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
        droppingHeight = wellHeight; // piece height
        currentTetrominoGradient = pickTetrominoColor(trackedTetrominoPosition);
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
