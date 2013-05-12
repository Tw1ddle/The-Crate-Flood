///<reference path='tslib/Three.d.ts'/>

///<reference path='Sprite.ts'/>
///<reference path='Layer.ts'/>
///<reference path='Assets.ts'/>
///<reference path='Utility.ts'/>
///<reference path='Config.ts'/>

class Water extends Sprite {
    constructor (position?: THREE.Vector2, risingRate?: number, rotation?: THREE.Vector3, layer?: number) {
        if (layer == null) {
            layer = Layer.waterForeground;
        }

        if (rotation != null) {
            this.rotation = rotation;
        }

        if (risingRate == null) {
            this.risingRate = 10;
        } else {
            this.risingRate = risingRate;
        }

        var size: THREE.Vector2 = new THREE.Vector2(Config.RENDER_WIDTH, Config.RENDER_HEIGHT);
        var texture: THREE.Texture = new THREE.Texture(Utility.generateImage(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, "#1111BB", 0.23));
        texture.needsUpdate = true;

        //add textures
        

        super(size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer), new THREE.Vector2(1, 1));
        this.material.overdraw = false; //override overdraw
    }

    public update(dt: number, scrollPoint: THREE.Vector2) {
        super.update(dt, scrollPoint);

        this.position.y += this.risingRate * dt;
    }

    private risingRate: number;
}