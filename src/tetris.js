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
      droppingHeight -= 1;
      droppingDelta -= droppingRate;
      if (droppingHeight < 0) {
        droppingHeight = wellHeight;
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
