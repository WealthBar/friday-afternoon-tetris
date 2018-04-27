function randomizeTetrominoColor() {
  return colorList[Math.floor(Math.random() * colorList.length)];
}

function pickTetrominoColor({x, y}) {
  let gradient = ctx.createRadialGradient(
    x,
    y,
    10, x + 1, y + 1,
    40,
  );

  gradient.addColorStop(0, randomizeTetrominoColor());
  gradient.addColorStop(1, randomizeTetrominoColor());
  return gradient;
}