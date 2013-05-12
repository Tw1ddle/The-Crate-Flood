///<reference path='tslib/Three.d.ts'/>

///<reference path='Sprite.ts'/>
///<reference path='Assets.ts'/>

///<reference path='Config.ts'/>
///<reference path='Utility.ts'/>
///<reference path='Layer.ts'/>

class Lightning extends Sprite {
    constructor (position: THREE.Vector2) {
        var texture: THREE.Texture = new THREE.Texture(Utility.generateImage(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, "#FFFFFF", 0.23));
        texture.needsUpdate = true;

        super(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, texture, new THREE.Vector3(position.x, position.y, Layer.lightning), new THREE.Vector2(1, 1));

        this.cumulativeTime = 0;
        this.flashDuration = 0.10;
        this.frequency = 4.00;
        this.visible = false;

        this.material.overdraw = false;
    }

    public update(dt: number, scrollPoint: THREE.Vector2) {
        super.update(dt, scrollPoint);

        this.cumulativeTime += dt;

        if (this.cumulativeTime > (this.frequency + this.flashDuration)) {
            this.cumulativeTime = 0;
            this.visible = false;
        }

        if (this.cumulativeTime > this.frequency) {
            this.visible = true;
        }
    }

    private cumulativeTime: number;
    private flashDuration: number;
    private frequency: number;
}
