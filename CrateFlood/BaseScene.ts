///<reference path='IScene.ts'/>

class BaseScene implements IScene {
    constructor (private renderer: THREE.Renderer) {
        this.scene.add(this.camera);
    }

    public scene: THREE.Scene = new THREE.Scene();
    public camera: THREE.Camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.01, 100);

    render(dt: number): void {
        this.renderer.render(this.scene, this.camera);
    }

    update(dt: number): void {
    }
}