///<reference path='three.d.ts'/>

///<reference path='assert.ts'/>

///<reference path='IMoveable.ts'/>

module Animations {
    export var none: { frames: number[]; times: number[]; } = { frames: [0], times: [0] };
}

class Sprite extends THREE.Mesh implements IMoveable {
    constructor (public width: number, public height: number, public texture?: THREE.Texture, position?: THREE.Vector3, tileLayout?: THREE.Vector3) {
        super(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ map: texture, overdraw: true }));

        (<any>(this)).doubleSided = true;

        if (position != null) {
            this.position.set(position.x, position.y, position.z); //for now, don't use the reference
        } else {
            this.position = new THREE.Vector3(0, 0, 0);
        }

        if (!tileLayout) {
            this.tileLayout = new THREE.Vector3(1, 1, 1);
        } else {
            this.tileLayout = tileLayout;
        }

        assert(texture != null, 'Sprite with null texture constructed');
    }

    public update(dt: number) {
        if (this.anims.length != 0) {
            this.animationTimeAccumulator += dt;

            if (this.animationTimeAccumulator > this.anims[this.currentAnimation].times[this.currentFrame]) {
                console.info("setting tile");
                this.setTile();
            }
        }

        // pixels per second
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
    }

    private setTile() {
        this.animationTimeAccumulator = 0;

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

    private animationTimeAccumulator: number = 0;
    private tileLayout: THREE.Vector3; //xdim, ydim, total sprites
    private currentFrame: number = 0;

    public velocity: THREE.Vector2 = new THREE.Vector2(0, 0);  

    public currentAnimation: number;
    public anims: { frames: number[]; times: number[]; }[] = new Array();
}