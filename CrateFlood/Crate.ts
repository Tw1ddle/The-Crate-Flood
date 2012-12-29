///<reference path='Three.d.ts'/>
///<reference path='math.ts'/>

///<reference path='Sprite.ts'/>
///<reference path='Layer.ts'/>

///<reference path='Config.ts'/>

///<reference path='random.ts'/>
///<reference path='assets.ts'/>

class Crate extends Sprite {
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

        super(size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }

    public update(dt: number): void {
        super.update(dt);
    }
}