var blockSize = 25;
var rows = 17;
var cols = 17;
var board;
var context;

// Snake head
var snakeX = blockSize * 4;
var snakeY = blockSize * 8;

// Velocity
var velocityX = 0;
var velocityY = 0;

// Snake body
var snakeBody = [];

// Food
var foodX = blockSize * 12;
var foodY = blockSize * 8;

//game conditions and etc
var gameOver = false;
var score = 0;

//on window load, load initializeGame function
window.onload = function () {
  initializeGame();
};

//initializes game.
function initializeGame() {
  board = document.getElementById("board");
  socre = document.getElementById("score");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  document.addEventListener("keydown", changeDirection);
  setInterval(update, 1000 / 10); // Call update function 10 times per second
}

//update function, (game updater thing)
function update() {
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height); // Clear the canvas

  // Draw checkered board
  var color1 = "black";
  var color2 = "#1a1918"; // Dark gray
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      context.fillStyle = (x + y) % 2 == 0 ? color1 : color2;
      context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
  }

  // Draw the food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  // Check if the snake has eaten the food
  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    score++;
    document.getElementById("score").innerText = "Score: " + score;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  // Draw the snake & move snake's head
  context.fillStyle = "lime";
  snakeX += velocityX;
  snakeY += velocityY;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //game over conditions
  if (
    snakeX < 0 ||
    snakeX >= cols * blockSize ||
    snakeY < 0 ||
    snakeY >= rows * blockSize
  ) {
    gameOver = true;
    alert("game over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("game over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY !== blockSize) {
    velocityX = 0;
    velocityY = -blockSize;
  } else if (e.code == "ArrowDown" && velocityY !== -blockSize) {
    velocityX = 0;
    velocityY = blockSize;
  } else if (e.code == "ArrowLeft" && velocityX !== blockSize) {
    velocityX = -blockSize;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX !== -blockSize) {
    velocityX = blockSize;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
