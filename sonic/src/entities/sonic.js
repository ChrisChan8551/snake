// constructor taking a pos variable or vector
import k from '../kaplayCtx';
export function makeSonic(pos) {
	const sonic = k.add([
		k.sprite('sonic', { anim: 'run' }),
		k.scale(4),
		k.area(),
		//allows you to change the origin of game object
		k.anchor('center'),
		k.pos(pos),
		k.body({ jumpForce: 1700 }),
		// add object to make extra methods
		{
			setControls() {
				k.onButtonPress('jump', () => {
					if (this.isGrounded()) {
						this.play('jump'); // playing animation
						this.jump();
						k.play('jump', { volume: 0.5 }); // playing sound (kaplay global)
					}
				});
			},
			setEvents() {
				this.onGround(() => {
					this.play('run');
				});
			},
		},
	]);
    
	return sonic;
}
