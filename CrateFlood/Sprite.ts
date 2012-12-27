///<reference path='three.d.ts'/>

class Sprite extends THREE.Mesh {
    constructor (width: number, height: number, texture: THREE.Texture) {
        super(new THREE.PlaneGeometry(width, height), new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture, overdraw: true }));
    }

    public update(dt: number) {
    }
}