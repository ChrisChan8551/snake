// this is a context file

import kaplay from 'kaplay';

// you want to declare a variable for kaplay and not set it to be a global variable. The function names that you use may sometimes conflict with other functions in the library that may have the same name.
const k = kaplay({
	width: 1920,
	height: 1080,
	letterbox: true,
	background: [0, 0, 0],
	global: false,
	touchToMouse: true,
	buttons: {
		jump: {
			keyboard: ['space'],
			mouse: 'left',
		},
	},
	debugKey: 'd',
	debug: true,
});

export default k;
