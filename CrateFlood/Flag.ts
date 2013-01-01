///<reference path='Sprite.ts'/>

///<reference path='Assets.ts'/>

module Animations {
    export var waveunactivated: { frames: number[]; times: number[]; } = { frames: [0], times: [0] };
    export var waveactivated: { frames: number[]; times: number[]; } = { frames: [0], times: [0] };
}

class Flag extends Sprite {
    constructor (position: THREE.Vector3) {
        var texture = THREE.ImageUtils.loadTexture(Assets.Sprite.flag1);

        super(28, 28, texture, position, new THREE.Vector2(1, 1), new THREE.Vector3(4, 2, 8));
        
        this.anims.push({ frames: [4, 5, 6, 7], times: [2, 2, 2, 2] });

        this.currentAnimation = 0;
    }

    public update(dt: number, scrollPoint: THREE.Vector2): void {
        super.update(dt, scrollPoint);
    }
}