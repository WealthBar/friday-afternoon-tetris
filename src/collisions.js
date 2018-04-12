function getLeftmostCollision(tetromino) {
  let leftmostIndex = 4;
  for (let i = 0; i < currentTetromino.length; i++) {
    for (let j = 0; j < currentTetromino[i].length; j++) {
      let block = currentTetromino[i][j];
      if (block !== 1) { continue; }
      if (j < leftmostIndex) {
        leftmostIndex = j;
      }
    }
  }

  return leftmostIndex;
}

function getRightmostCollision(tetromino) {
  let rightmostIndex = 0;
  for (let i = 0; i < currentTetromino.length; i++) {
    for (let j = 0; j < currentTetromino[i].length; j++) {
      let block = currentTetromino[i][j];
      if (block !== 1) { continue; }
      if (j > rightmostIndex) {
        rightmostIndex = j;
      }
    }
  }

  return rightmostIndex + 1;
}
