import * as fs from "fs";
import * as p from "path";

/* istanbul ignore next */
export const recursiveReaddirSync = function* recursiveReaddirSync(path) {
  const files = fs.readdirSync(path);
  let stats;

  for (const file of files) {

    stats = fs.lstatSync(p.join(path, file));
    if (stats.isDirectory()) {
      yield* recursiveReaddirSync(p.join(path, file));
    } else {
      yield p.join(path, file);
    }
  }
};

export function ignore() {
}
