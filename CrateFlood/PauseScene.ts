///<reference path='three.d.ts'/>

///<reference path='IScene.ts'/>

class PauseScene implements IScene {
    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.01, 100);

    constructor () {
        this.scene.add(this.camera);
    }

    public render(dt: number) {
    }

    public update(dt: number) {
    }
}