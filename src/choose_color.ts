import * as Random from "random-js";
import {colorList} from "./color_list";

export function chooseColor() {
  let random = new Random(Random.engines.mt19937().autoSeed());
  // -1 is to allow for range in 0 based Array
  return colorList[random.integer(1, colorList.length) - 1];
}