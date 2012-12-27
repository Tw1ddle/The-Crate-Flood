///<reference path='three.d.ts'/>

///<reference path='assert.ts'/>

class Sprite extends THREE.Mesh {
    constructor (width: number, height: number, texture?: THREE.Texture, position?: THREE.Vector3, private tiles?: THREE.Vector2, private duration?: number) {
        super(new THREE.PlaneGeometry(width, height), new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture, overdraw: true }));

        if (position != null) {
            this.position.set(position.x, position.y, position.z);
        }

        if (tiles != null) {
            this.numTiles = tiles.x * tiles.y;
        } else {
            this.numTiles = 1;
        }

        assert(texture != null, 'Sprite with null texture constructed');
    }

    public update(dt: number) {
        this.cumulativeTime += dt;
    }

    private setTile(index: number) {

    }

    private cumulativeTime : number;
    private numTiles : number;
}