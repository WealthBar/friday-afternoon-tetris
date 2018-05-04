import {colorList} from "./color_list";

export function chooseColor() {
  return colorList[Math.floor(Math.random() * colorList.length)];
}