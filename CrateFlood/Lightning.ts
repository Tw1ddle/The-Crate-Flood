///<reference path='Three.d.ts'/>

///<reference path='Sprite.ts'/>
///<reference path='Assets.ts'/>

///<reference path='Config.ts'/>
///<reference path='Utility.ts'/>
///<reference path='Layer.ts'/>

class Lightning extends Sprite {
    constructor (position: THREE.Vector2) {
        var texture: THREE.Texture = new THREE.Texture(Utility.generateImage(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, "#FFFFFF", 0.23));
        texture.needsUpdate = true;

        super(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, texture, new THREE.Vector3(position.x, position.y, Layer.lightning));

        this.cumulativeTime = 0;
        this.flashDuration = 0.10;
        this.frequency = 4.00;
        this.visible = false;
    }

    public update(dt: number) {
        super.update(dt);

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
