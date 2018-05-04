import * as fs from "fs";
import {main} from "./util/main";
import {recursiveReaddirSync} from "./util/recursive-readdir-sync";

main(async () => {
  for (const f of recursiveReaddirSync("dist")) {
    if (!f.endsWith(".js")) {
      continue;
    }
    // console.log(f);
    let contents = fs.readFileSync(f, "utf8");

    contents = contents.replace(
      /\nvar __awaiter/,
      "\n/* istanbul ignore next */ var __awaiter",
    );
    fs.writeFileSync(f, contents);
  }
});
