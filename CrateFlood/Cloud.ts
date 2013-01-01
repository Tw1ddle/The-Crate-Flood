///<reference path='Three.d.ts'/>
///<reference path='math.ts'/>

///<reference path='Sprite.ts'/>
///<reference path='Layer.ts'/>

///<reference path='Config.ts'/>

///<reference path='random.ts'/>
///<reference path='assets.ts'/>

class Cloud extends Sprite {
    constructor (position: THREE.Vector2, rotation?: THREE.Vector3, id?: number, layer?: number) {
        if (layer == null) {
            layer = Layer.clouds;
        }

       if (id == null) {
            id = Random.nextIntRange(0, 2);
        }

        if (rotation) {
            this.rotation = rotation;
        }
         
        assert(id <= 2 && id >= 0);

        var size: THREE.Vector2 = new THREE.Vector2();
        var texture: THREE.Texture;

        if (id == 0) {
            size = new THREE.Vector2(107, 20);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.cloud1);
        }
        if (id == 1) {
            size = new THREE.Vector2(61, 17);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.cloud2);
        }
        if (id == 2) {
            size = new THREE.Vector2(110, 22);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.cloud3);
        }

        super(size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer), new THREE.Vector2(0, 0));

        this.velocity.x = Random.nextDoubleRange(20, 50);
        this.scroll = new THREE.Vector2(1, 0.85);
    }

    public update(dt: number, scrollPoint: THREE.Vector2): void {
        super.update(dt, scrollPoint);

        if (this.position.x - this.width/2 > Config.RENDER_WIDTH) {
            this.position.x = -this.width / 2;

            this.position.y = Math.clamp(Random.nextDoubleRange(this.position.y - 10, this.position.y + 10), Config.RENDER_HEIGHT/2, Config.RENDER_HEIGHT);

            this.velocity.x = Random.nextDoubleRange(20, 50);
        }
    }
}