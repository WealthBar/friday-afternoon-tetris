const width = 10;
const height = 22;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let droppingHeight = 22;
let droppingWidth = 5;
let droppingDelta = 0;
let droppingRate = 1000;
let droppingTetromino = 1;
