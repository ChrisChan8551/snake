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
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Drawing game map, snake, and food
function draw() {
	board.innerHTML = '';
	drawSnake();
	drawFood();
}

// Draw snake
function drawSnake() {
	snake.forEach((segment) => {
		const snakeElement = createGameElement('div', 'snake');
		setPosition(snakeElement, segment);
		board.appendChild(snakeElement);
	});
}

// Creating a snake or food cube/div
function createGameElement(tag, className) {
	const element = document.createElement(tag);
	element.className = className;
	return element;
}

// Set position of the snake or food
function setPosition(element, position) {
	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
}

// Testing draw function
// draw();

//Draw food function
function drawFood() {
	const foodElement = createGameElement('div', 'food');
	setPosition(foodElement, food);
	board.appendChild(foodElement);
}

//Generate Food
function generateFood() {
	const x = Math.floor(Math.random() * gridSize) + 1;
	const y = Math.floor(Math.random() * gridSize) + 1;
	return { x, y };
}

// Moving the snake
function move() {
	// need to make a shallow copy of the snake head by tapping into the snake object
	const head = { ...snake[0] };
	switch (direction) {
		case 'up':
			head.y--;
			break;
		case 'down':
			head.y++;
			break;
		case 'left':
			head.x--;
			break;
		case 'right':
			head.x++;
			break;
	}
	//adds head object to the beginning of the snake
	snake.unshift(head);
	// removing the head from the array, otherwise the head will be just lengthening. Gives the illusion of movement
	// snake.pop();

	// when snake "eats the food"
	if (head.x == food.x && head.y == food.y) {
		//regenerate new location of food
		food = generateFood();
		increaseSpeed();
		clearInterval(gameInterval); // Clear previous game interval
		// speeds up snake when it eats food
		gameInterval = setInterval(() => {
			move();
			// checkCollision();
			draw();
		}, gameSpeedDelay);
	} else {
		snake.pop();
	}
}

//Test moving
// setInterval(() => {
// 	move(); // move first
// 	draw(); // then draw again new position
// 	// change the direction up top to test
// }, 200);

// Start game function
function startGame() {
	gameStarted = true; // keep track of a running game

	// when game starts, hide the logo and instructions
	instructionText.style.display = 'none';
	logo.style.display = 'none';
	gameInterval = setInterval(() => {
		move();
		// checkCollision(); // check if snake runs into corners
		draw();
	}, gameSpeedDelay);
}

// Keypress event listener
function handleKeyPress(event) {
	if (
		(!gameStarted && event.code === 'Space') ||
		(!gameStarted && event.key === ' ')
	) {
		startGame();
	} else {
		switch (event.key) {
			case 'ArrowUp':
				direction = 'up';
				break;
			case 'ArrowDown':
				direction = 'down';
				break;
			case 'ArrowLeft':
				direction = 'left';
				break;
			case 'ArrowRight':
				direction = 'right';
				break;
		}
	}
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
	//   console.log(gameSpeedDelay);
	if (gameSpeedDelay > 150) {
		gameSpeedDelay -= 5;
	} else if (gameSpeedDelay > 100) {
		gameSpeedDelay -= 3;
	} else if (gameSpeedDelay > 50) {
		gameSpeedDelay -= 2;
	} else if (gameSpeedDelay > 25) {
		gameSpeedDelay -= 1;
	}
}

