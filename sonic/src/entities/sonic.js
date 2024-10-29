// constructor taking a pos variable or vector
import k from "../kaplayCtx";
export function makeSonic(pos) {
	const sonic = k.add([
		k.sprite('sonic', { anim: 'run' }),
		k.scale(4),
		k.area(),
        //allows you to change the origin of game object
		k.anchor('center'),
        k.pos(pos),

	]);
}
