///<reference path='three.d.ts'/>

///<reference path='Sprite.ts'/>
///<reference path='Random.ts'/>
///<reference path='Assets.ts'/>
///<reference path='Layer.ts'/>


class Island extends Sprite {
        constructor (position?: THREE.Vector2, rotation?: THREE.Vector3, id? : number, layer?: number) { 
        if (layer == null) {
            layer = Layer.islandsForeground;
        }

        if (id == null) {
            id = Random.nextIntRange(0, 4);
        }

        if (rotation) {
            this.rotation = rotation;
        }

        assert(id <= 4 && id >= 0);

        var size: THREE.Vector2 = new THREE.Vector2();
        var texture: THREE.Texture;

        if (id == 0) {
            size = new THREE.Vector2(81, 26);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island1);
        }
        if (id == 1) {
            size = new THREE.Vector2(51, 20);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island2);
        }
        if (id == 2) {
            size = new THREE.Vector2(110, 30);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island3);
        }
        if (id == 3) {
            size = new THREE.Vector2(111, 35);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island4);
        }
        if (id == 4) {
            size = new THREE.Vector2(89, 35);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island5);
        }

        super(size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }
}