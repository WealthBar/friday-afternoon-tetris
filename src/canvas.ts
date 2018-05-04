export function canvasCtor() {
  let canvas: any = undefined;
  let ctx: any = undefined;

  canvas = <HTMLCanvasElement> document.getElementById("canvas");
  if (!canvas) {
    throw new Error("canvas wtf?");
  }

  ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("ctx wtf?");
  }

  return {
    ctx,
    canvas,
  }
}