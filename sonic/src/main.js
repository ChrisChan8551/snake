import k from './kaplayCtx';

//importing assets

k.loadSprite('chemical-bg', 'graphics/chemical-bg.png');
k.loadSprite('platforms', 'graphics/platforms.png');
// the picture has frames in there.
// this function you tell it how many frames there are
k.loadSprite('sonic', 'graphics/sonic.png', {
	// how many frames per row
	sliceX: 8,
	// how many frames per column
	sliceY: 2,
	//animation parameters
	anims: {
		//speed is frames per second
		run: { from: 0, to: 7, loop: true, speed: 30 },
		jump: { from: 8, to: 15, loop: true, speed: 100 },
	},
});
k.loadSprite('ring', 'graphics/ring.png', {
	sliceX: 16,
	sliceY: 1,
	anims: {
		spin: { from: 0, to: 15, loop: true, speed: 30 },
	},
});
k.loadSprite('motobug', 'graphics/motobug.png', {
	sliceX: 5,
	sliceY: 1,
	anims: {
		run: { from: 0, to: 4, loop: true, speed: 8 },
	},
});
