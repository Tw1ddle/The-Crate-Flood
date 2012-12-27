///<reference path='three.d.ts'/>

///<reference path='assert.ts'/>

module Animations {
    export var none: { frames: number[]; times: number[]; } = { frames: [0], times: [0] };
}

class Sprite extends THREE.Mesh {
    constructor (width: number, height: number, public texture?: THREE.Texture, position?: THREE.Vector3, tileLayout?: THREE.Vector3) {
        super(new THREE.PlaneGeometry(width, height), new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture, overdraw: true }));

        if (position != null) {
            this.position.set(position.x, position.y, position.z);
        }

        if (tileLayout == null) {
            this.tileLayout = new THREE.Vector3(1, 1, 1);
        } else {
            this.tileLayout = tileLayout;
        }

        assert(texture != null, 'Sprite with null texture constructed');
    }

    public update(dt: number) {
        if (this.anims.length != 0) {
            this.timeAccumulator += dt;

            if (this.timeAccumulator > this.anims[this.currentAnimation].times[this.currentFrame]) {
                console.info("setting tile");
                this.setTile();
            }
        }
    }

    private setTile() {
        this.timeAccumulator = 0;

        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeatVector2 = new THREE.Vector2(1 / this.tileLayout.x, 1 / this.tileLayout.y);

        this.currentFrame++;

        if (this.currentFrame == this.anims[this.currentAnimation].frames.length) {
            this.currentFrame = 0;
        }

        var currentColumn: number = this.anims[this.currentAnimation].frames[this.currentFrame] % this.tileLayout.x;
       // this.texture.offset.x = currentColumn / this.tileLayout.x;

        var currentRow: number = Math.floor(this.anims[this.currentAnimation].frames[this.currentFrame] / this.tileLayout.x);
      //  this.texture.offset.y = currentRow / this.tileLayout.y;
    }

    private setAnimation(id : number) {
        this.currentAnimation = id;
    }

    private timeAccumulator: number = 0;
    private tileLayout: THREE.Vector3; //xdim, ydim, total sprites
    private currentFrame: number = 0;

    public currentAnimation: number;
    public anims: { frames: number[]; times: number[]; }[] = new Array();
}