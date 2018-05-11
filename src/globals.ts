import {chooseColor} from "./choose_color";
import * as Random from "random-js";

export const gameState: any = {
  wellWidth: 10,
  wellHeight: 22,
  pieceUp: 0,
  pieceRight: 1,
  pieceDown: 2,
  pieceLeft: 3,
  pieceMax: 4,
  // recommended to make one of these per process
  random: new Random(Random.engines.mt19937().autoSeed()),


  droppingHeight: 22,
  droppingWidth: 5,
  droppingDelta: 0,
  defaultDroppingRate: 500,
  fastDroppingRate: 25,
  droppingRate: 500,
  droppingTetromino: 0,
  pieceOrientation: 2,
  trackedTetrominoPosition: 22,
  currentTetrominoGradient: chooseColor(),
  tetrisWell:[[0]],
};

