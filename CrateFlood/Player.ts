///<reference path='Sprite.ts'/>

///<reference path='Assets.ts'/>

module Animations {
    export var walkleft: { frames: number[]; times: number[]; } = { frames: [0], times: [0] };
}

class Player extends Sprite {
    constructor (position: THREE.Vector3) {
        var texture = THREE.ImageUtils.loadTexture(Assets.Sprite.player1);

        super(28, 28, texture, position, new THREE.Vector3(4, 2, 8));
        
        this.anims.push({ frames: [4, 5, 6, 7], times: [2, 2, 2, 2] });

        this.currentAnimation = 0;
    }

    public update(dt: number): void {
        //controls
        //change state
        //set velocity

        super.update(dt);
    }
}