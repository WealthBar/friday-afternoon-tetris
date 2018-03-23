{
  let tetrisWell = createGrid(10, 22);
  let pieceBorder = createGrid(4, 4);
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let droppingX = 5;
  let droppingY = 22;
  let droppingDelta = 0;
  let droppingRate = 1000;
  let drawWell = copyWell(tetrisWell);

  MainLoop.setUpdate(update).setDraw(draw).setEnd(end).start();

  function createGrid(width, height) {
    let array = []
    for (let i = 0; i < height; i++) {
      array.push(Array(width).fill(0))
    }
    return array;
  };

  function end() {
    return false;
  };

  function copyWell() {
    let array = []
    for (let i = 0; i < tetrisWell.length; i++) {
      array.push(Array.from(tetrisWell[i]))
    }
    return array;
  };

  function update(delta) {
    drawWell = copyWell(tetrisWell);

    droppingDelta += delta;

    if (droppingDelta > droppingRate) {
      droppingY -= 1;
      droppingDelta -= droppingRate;
    }

    drawWell[droppingX][droppingY] = 1;
    // tetrisWell.map((row, i) => {
    //   row.map((piece, j) => {
    //     // tetrisWell[i][j] = Math.random() > 0.5 ? 1 : 0;
    //     // tetrisWell[i][j] = 
    //     if (i === 0 || j === 0) {
    //       // tetrisWell[i][j] = Math.random() > 0.5 ? 1 : 0;
    //     tetrisWell[j][i] = 1;
    //     }
    //   })
    // })
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let pieceWidth = canvas.width/tetrisWell.length;
    let pieceHeight = canvas.height/tetrisWell[0].length;

    tetrisWell.map((row, i) => {
      row.map((piece, j) => {
        if (drawWell[i][j] === 1) {
          let x = i * pieceWidth;
          let y = j * pieceHeight;

          ctx.fillRect(x, canvas.height - y - pieceHeight, pieceWidth, pieceHeight);
        }
      })
    })
  };
}
