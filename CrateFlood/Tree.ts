///<reference path='tslib/three.d.ts'/>

///<reference path='Sprite.ts'/>
///<reference path='Random.ts'/>
///<reference path='Assets.ts'/>

class Tree extends Sprite {
    constructor(position?: THREE.Vector2, rotation?: THREE.Euler, id?: number, layer?: number) { 
        if (layer == null) {
            layer = Layer.treesForeground;
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
            size = new THREE.Vector2(37, 32);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.tree1);
        }
        if (id == 1) {
            size = new THREE.Vector2(46, 43);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.tree2);
        }
        if (id == 2) {
            size = new THREE.Vector2(58, 59);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.tree3);
        }

        super(size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }
}