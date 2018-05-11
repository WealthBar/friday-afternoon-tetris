import {gameState} from "./globals";

export function clearLinesCtor() {
  function clearLine(tetrisWell, row) {
    for (let i = row; i < tetrisWell.length - 1; ++i) {
      for (let j = 1; j < tetrisWell[i].length - 1; ++j) {
        tetrisWell[i][j] = tetrisWell[i + 1][j];
      }
    }
  }

  function execute(tetrisWell) {
    console.log("clearlines");
    for (let i = tetrisWell.length - 2; i > 0; --i) {
      const slice = tetrisWell[i]
        .slice(1, tetrisWell[i].length - 1);
      const complete = slice
        .every(
          x => x > 0);

      if (complete) {
        clearLine(tetrisWell, i);
      }
    }
  }

  return {
    execute,
  };
}

export const clearLines = clearLinesCtor().execute;
