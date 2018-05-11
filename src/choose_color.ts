import * as Random from "random-js";
import {colorList} from "./color_list";

export function chooseColor() {
  let random = new Random(Random.engines.mt19937().autoSeed());
  // choosing from a 0 based array
  return colorList[random.integer(1, colorList.length) - 1];
}