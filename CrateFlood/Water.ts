///<reference path='Three.d.ts'/>

///<reference path='Sprite.ts'/>
///<reference path='Layer.ts'/>
///<reference path='Assets.ts'/>

class Water extends Sprite {
    constructor (position?: THREE.Vector2, rotation?: THREE.Vector3, layer?: number) { 
        if (layer == null) {
            layer = Layer.treesForeground;
        }

        if (rotation) {
            this.rotation = rotation;
        }

        var size: THREE.Vector2 = new THREE.Vector2();
        var texture: THREE.Texture;

        //add textures

        super(size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }
}