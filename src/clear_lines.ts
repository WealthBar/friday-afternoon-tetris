import {gameState} from "./globals";

export function clearLinesCtor(tetrisWell) {
  function clearLine(row) {
    for (let i = row; i < tetrisWell.length - 1; ++i) {
      for (let j = 1; j < tetrisWell[i].length - 1; ++j) {
        tetrisWell[i][j] = tetrisWell[i + 1][j];
      }
    }
  }

  function execute() {
    for (let i = tetrisWell.length - 2; i > 0; --i) {
      const slice = tetrisWell[i]
        .slice(1, tetrisWell[i].length - 1);
      const complete = slice
        .every(
          x => x > 0);

      if (complete) {
        clearLine(i);
      }
    }
  }

  return {
    tetrisWell,
    execute,
  };
}

export const clearLines = clearLinesCtor(gameState.tetrisWell).execute;
