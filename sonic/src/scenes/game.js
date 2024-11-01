import k from '../kaplayCtx';

export default function game() {
	const citySfx = k.play('city', { volume: 0.2, loop: true });
	k.setGravity(3100);
	const bgPieceWidth = 1920;
	const bgPieces = [
		k.add([
			k.sprite('chemical-bg'),
			k.pos(0, 0),
			k.scale(2),
			k.opacity(0.8),
		]),
		k.add([
			k.sprite('chemical-bg'),
			k.pos(bgPieceWidth, 0),
			k.scale(2),
			k.opacity(0.8),
		]),
	];

	const platformWidth = 1280;
	const platforms = [
		k.add([k.sprite('platforms'), k.pos(0, 450), k.scale(4)]),
		k.add([k.sprite('platforms'), k.pos(platformWidth, 450), k.scale(4)]),
	];

	let gameSpeed = 300;
	k.loop(1, () => {
		gameSpeed += 50;
	});

	k.onUpdate(() => {
		if (bgPieces[1].pos.x < 0) {
			bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
			bgPieces.push(bgPieces.shift());
		}
		bgPieces[0].move(-100, 0);
		bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);
	});
}