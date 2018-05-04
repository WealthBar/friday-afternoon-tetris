import {gameState} from "./globals";

export function considerMovingThatWay({ offsetW = 0, offsetH = 0, tetromino }) {
  //console.log(tetromino);
  for (let tH = 0; tH < tetromino.length; ++tH) {
    for (let tW = 0; tW < tetromino[tH].length; ++tW) {
      if (tetromino[tH][tW] === 0) {
        continue;
      }
      let wellW = gameState.droppingWidth + offsetW + tW + 1;
      let wellH = gameState.droppingHeight + offsetH + tH + 1;
      if (wellH >= gameState.tetrisWell.length) {
        debugger;
      }
      //console.log(JSON.stringify({wellH, wellW, well: tetrisWell[wellH][wellW]}));
      if (gameState.tetrisWell[wellH][wellW] !== 0) {
        return true;
      }
    }
  }
  return false;
}
