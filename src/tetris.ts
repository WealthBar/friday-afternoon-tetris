import * as MainLoop from 'mainloop.js';
import {gameState} from "./globals";
import {considerMovingThatWay} from "./collisions";
import {clearLines} from "./clear_lines";
import {tetrominos} from "./tetrominos";
import {handleKeyInputs} from "./inputs";
import {chooseColor} from "./choose_color";
import {draw} from "./draw";

{
  console.log(MainLoop);

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

  function pickNewPiece() {
    gameState.droppingTetromino = Math.floor(Math.random()*tetrominos.length);
  }

  function commitToWell(tetromino) {
    for (let tH = 0; tH < tetromino.length; ++tH) {
      for (let tW = 0; tW < tetromino[tH].length; ++tW) {
        if (tetromino[tH][tW] === 0) {
          continue;
        }
        let wellW = gameState.droppingWidth + tW + 1;
        let wellH = gameState.droppingHeight + tH + 1;

        gameState.tetrisWell[wellH][wellW] = 1; // tetromino[tH][tW];
      }
    }
  }

  function updateDrop(delta) {
    const tetromino = tetrominos[gameState.droppingTetromino][gameState.pieceOrientation];

    gameState.droppingDelta += delta;
    if (gameState.droppingDelta > gameState.droppingRate) {
      const colliding = considerMovingThatWay({
        offsetH: -1,
        tetromino,
      });

      if (!colliding) {
        gameState.droppingHeight -= 1;
        gameState.droppingDelta -= gameState.droppingRate;
        // todo: add some latch time before committing the the well.
      } else {
        // todo: copy into well
        // todo: spawn new piece

        commitToWell(tetromino);

        gameState.droppingWidth = gameState.wellWidth / 2;
        gameState.droppingHeight = gameState.wellHeight;
        clearLines();
        pickNewPiece();
        gameState.currentTetrominoGradient = chooseColor();
      }
    }
  }

  // TODO: In the glorious future:
  // function rateCheck(delta, rate, functionThatYouWant);

  function update(delta) {
    handleKeyInputs(delta);
    updateDrop(delta);
  }


}
