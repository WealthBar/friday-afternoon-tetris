/* eslint-disable no-console */

/* istanbul ignore next */
export const main = ((function mainCtor() {
  process.on(
    "unhandledRejection",
    (error) => {
      /* istanbul ignore next */
      console.error(
        `unhandledRejection: ${error}`,
        error.stack,
      );
    },
  );
  return function main(f) {
    (async function () {
      try {
        await f();
      } catch (e) {
        console.error(e);
      } finally {
        console.log("done");
        process.exit(0);
      }
    })();
  };
})());

export function ignore() {
}
