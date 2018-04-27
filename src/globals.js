const wellWidth = 10;
const wellHeight = 22;
const pieceUp = 0;
const pieceRight = 1;
const pieceDown = 2;
const pieceLeft = 3;
const pieceMax = 4;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let droppingHeight = 22;
let droppingWidth = 5;
let droppingDelta = 0;
let droppingRate = 500;
let droppingTetromino = 1;
let pieceOrientation = pieceDown;

let trackedTetrominoPosition;
let currentTetrominoGradient;