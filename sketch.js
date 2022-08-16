let [WIDTH, HEIGHT] = [20, 20];
let s = 30;
let apples = [];
let snake = [[10, 10]];

function setup() {
  createCanvas(WIDTH * s, HEIGHT * s, P2D);
  newApple();
  newApple();
}

function draw() {
  background(51);

  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (checkArr(apples, x, y)) fill(255, 60, 60);
      else if (checkArr(snake, x, y)) fill(60, 200, 60);
      else noFill();

      rect(x * s, y * s, s, s);
    }
  }
}

function newApple() {
  apples.push([floor(random(WIDTH)), floor(random(HEIGHT))]);
}

function checkArr(arr, x, y) {
  let check = false;
  arr.forEach(([ax, ay]) => {
    if (ax == x && ay == y && !check) check = true;
  });
  return check;
}

