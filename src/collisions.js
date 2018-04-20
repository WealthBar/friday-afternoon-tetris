function getLeftmostCollision(tetromino) {
  let leftmostIndex = 4;
  for (let i = 0; i < currentTetromino.length; i++) {
    for (let j = 0; j < currentTetromino[i].length; j++) {
      let block = currentTetromino[i][j];
      if (block !== 1) {
        continue;
      }
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
      if (block !== 1) {
        continue;
      }
      if (j > rightmostIndex) {
        rightmostIndex = j;
      }
    }
  }

  return rightmostIndex + 1;
}

function considerMovingThatWay({ offsetW = 0, offsetH = 0, tetromino }) {
  //console.log(tetromino);
  for (let tH = 0; tH < tetromino.length; ++tH) {
    for (let tW = 0; tW < tetromino[tH].length; ++tW) {
      if (tetromino[tH][tW] === 0) {
        continue;
      }
      let wellW = droppingWidth + offsetW + tW;
      let wellH = droppingHeight + offsetH + tH;
      if (wellH >= tetrisWell.length) {
        debugger;
      }
      //console.log(JSON.stringify({wellH, wellW, well: tetrisWell[wellH][wellW]}));
      if (tetrisWell[wellH][wellW] !== 0) {
        return true;
      }
    }
  }
  return false;
}

function isNotColliding(
  keyPressed,
  width,
  tetromino,
) {
  let leftmostCollisionBlock = getLeftmostCollision(tetromino);
  let rightmostCollisionBlock = getRightmostCollision(tetromino);
  let notColliding = false;
  if (keyPressed.ArrowLeft && width > leftmostCollisionBlock) {
    notColliding = true;
  }
  if (keyPressed.ArrowRight && width < wellWidth - rightmostCollisionBlock) {
    notColliding = true;
  }

  return notColliding;
}
