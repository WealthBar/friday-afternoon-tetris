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

  return -leftmostIndex;
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

function isNotColliding(keyPressed, width, tetromino) {
  let leftmostCollisionBlock = getLeftmostCollision(tetromino);
  let rightmostCollisionBlock = getRightmostCollision(tetromino);
  let notColliding = false;
  if (keyPressed.ArrowLeft && width > leftmostCollisionBlock) { notColliding = true; }
  if (keyPressed.ArrowRight && width < wellWidth - rightmostCollisionBlock) { notColliding = true; }

  return notColliding;
}
