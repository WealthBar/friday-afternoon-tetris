import * as assert from "assert";
import {clearLinesCtor} from "./clear_lines";

describe(
  "clearLines",
  () => {
    it(
      "clears one line at the bottom",
      () => {
        // well is upside down.

        //todo: make a array of cases and loop over them.
        // ie. const cases = [{well:[[...]],expected:[[...]]},{...},...]
        const well = [
          [-1, -1, -1, -1],
          [-1, 1, 1, -1],
          [-1, 2, 0, -1],
          [-1, 0, 0, -1],
        ];

        const expected = [
          [-1, -1, -1, -1],
          [-1, 2, 0, -1],
          [-1, 0, 0, -1],
          [-1, 0, 0, -1],
        ];

        const subject = clearLinesCtor();
        subject.execute(well);

        assert.deepEqual(
          well,
          expected,
        );
      },
    );
  },
);
