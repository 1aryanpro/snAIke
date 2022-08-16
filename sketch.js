let [WIDTH, HEIGHT] = [20, 20];
let s = 30;
let apple;
let snake = [
  [10, 10],
  [11, 10],
  [12, 10],
  [13, 10],
];
let dir = 0;
let ndir = -1;

let timer = 1000;

function setup() {
  createCanvas(WIDTH * s, HEIGHT * s, P2D);
  newApple();
}

function draw() {
  background(51);

  timer -= deltaTime;
  if (timer <= 0) {
    move(ndir == -1 ? dir : ndir);
    timer = 150;

    if (ndir != -1) {
      dir = ndir;
      ndir = -1;
    }
  }

  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (checkArr([apple], x, y)) fill(255, 60, 60);
      else if (checkArr(snake, x, y)) fill(60, 200, 60);
      else noFill();

      rect(x * s, y * s, s, s);
    }
  }
}

function newApple() {
  let ap;
  do {
    ap = [floor(random(WIDTH)), floor(random(HEIGHT))];
  } while (checkArr(snake, ...ap));
  apple = ap;
}

function checkArr(arr, x, y) {
  let check = false;
  arr.forEach(([ax, ay]) => {
    if (ax == x && ay == y && !check) check = true;
  });
  return check;
}

function move(dir) {
  //   1
  // 0 + 2
  //   3

  head = [...snake[0]];
  switch (dir) {
    case 0:
      head[0]--;
      break;
    case 1:
      head[1]--;
      break;
    case 2:
      head[0]++;
      break;
    case 3:
      head[1]++;
      break;
  }

  if (checkArr(snake, ...head)) {
    return;
    // switch to game over condition
  }

  if (head[0] < 0 || head[0] >= WIDTH || head[1] < 0 || head[1] >= HEIGHT)
    return;

  if (checkArr([apple], ...head)) {
    newApple();
  } else snake.pop();
  snake.unshift(head);
}

function keyPressed() {
  if (keyCode > 36 && keyCode < 41 && ndir == -1) {
    let keyDir = keyCode - 37;
    // if ((dir - keyDir) % 2 == 0) return;
    ndir = keyDir;
  }
}
