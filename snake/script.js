// Define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = { x: 1, y: 0 }; // Right direction by default
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Directions mapping
const directions = {
	ArrowUp: { x: 0, y: -1 },
	ArrowDown: { x: 0, y: 1 },
	ArrowLeft: { x: -1, y: 0 },
	ArrowRight: { x: 1, y: 0 },
};

// function for creating and positioning game elements (snake, food)
function createAndPositionElement(className, position) {
	const element = document.createElement('div');
	element.className = className;
	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
	board.appendChild(element);
}

// Draw game elements
function draw() {
	board.innerHTML = '';
	snake.forEach((segment) => createAndPositionElement('snake', segment));
	if (gameStarted) createAndPositionElement('food', food);
	updateScore();
}

// Generate new food position, ensuring it doesn't overlap with the snake
function generateFood() {
	let newFoodPosition;
	do {
		newFoodPosition = {
			x: Math.floor(Math.random() * gridSize) + 1,
			y: Math.floor(Math.random() * gridSize) + 1,
		};
	} while (isPositionOnSnake(newFoodPosition));
	return newFoodPosition;
}

// Check if a given position is on the snake
function isPositionOnSnake(position) {
	return snake.some(
		(segment) => segment.x === position.x && segment.y === position.y
	);
}

// Move the snake
function move() {
	const head = {
		...snake[0],
		x: snake[0].x + direction.x,
		y: snake[0].y + direction.y,
	};
	snake.unshift(head); // Add new head

	// Check if food is eaten
	if (head.x === food.x && head.y === food.y) {
		food = generateFood();
		increaseSpeed();
	} else {
		snake.pop(); // Remove last segment if no food eaten
	}
}

// Keypress event listener
function handleKeyPress(event) {
	const newDirection = directions[event.key];
	if (!gameStarted && event.code === 'Space') {
		startGame();
	} else if (
		newDirection &&
		(snake.length === 1 || !isOppositeDirection(newDirection))
	) {
		direction = newDirection;
	}
}

function isOppositeDirection(newDirection) {
	return (
		direction.x + newDirection.x === 0 && direction.y + newDirection.y === 0
	);
}

// Start or reset game
function startGame() {
	toggleGameUI(false); // Hide instructions/logo
	gameStarted = true;
	gameInterval = setInterval(gameLoop, gameSpeedDelay);
}

function resetGame() {
	updateHighScore();
	stopGame();
	snake = [{ x: 10, y: 10 }];
	food = generateFood();
	direction = { x: 1, y: 0 }; // Reset to right direction
	gameSpeedDelay = 200;
	draw();
}

function stopGame() {
	clearInterval(gameInterval);
	gameStarted = false;
	toggleGameUI(true); // Show instructions/logo
}

// Toggle game UI (instructions and logo)
function toggleGameUI(show) {
	instructionText.style.display = show ? 'block' : 'none';
	logo.style.display = show ? 'block' : 'none';
}

// Main game loop
function gameLoop() {
	move();
	if (checkCollision()) {
		resetGame();
	} else {
		draw();
	}
}

// Check for collisions with walls or self
function checkCollision() {
	const head = snake[0];
	// Check wall collision
	if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize)
		return true;
	// Check self-collision
	return snake
		.slice(1)
		.some((segment) => segment.x === head.x && segment.y === head.y);
}

// Increase snake speed as it eats food
function increaseSpeed() {
	if (gameSpeedDelay > 25) {
		gameSpeedDelay -= Math.max(1, Math.floor(gameSpeedDelay / 50));
		clearInterval(gameInterval);
		gameInterval = setInterval(gameLoop, gameSpeedDelay);
	}
}

// Update score and high score
function updateScore() {
	const currentScore = snake.length - 1;
	score.textContent = currentScore.toString().padStart(3, '0');
}

function updateHighScore() {
	const currentScore = snake.length - 1;
	if (currentScore > highScore) {
		highScore = currentScore;
		highScoreText.textContent = highScore.toString().padStart(3, '0');
	}
	highScoreText.style.display = 'block';
}

// Event listener
document.addEventListener('keydown', handleKeyPress);
