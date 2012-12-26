///<reference path='IScene.ts'/>

///<reference path='dat.gui.d.ts'/>

class BaseScene implements IScene {
    constructor (private renderer: THREE.Renderer) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.CombinedCamera(Config.GAME_WIDTH, Config.GAME_HEIGHT, 75, 0.01, 5000, -1000, 1000);
        this.camera.rotation.set(0, 0, 0);

        this.scene.add(this.camera);
        this.scene.add(new THREE.AmbientLight(0xFFFFFF));

        if (Config.DEBUG) {
            this.debug.add(this.camera.position, 'x', -Config.GAME_WIDTH, Config.GAME_WIDTH, 1).listen();
            this.debug.add(this.camera.position, 'y', -Config.GAME_HEIGHT, 10000, 1).listen();
            this.debug.add(this.camera.position, 'z', -300, 300, 1).listen();

            this.debug.add(this.camera.rotation, 'x', -Math.PI, Math.PI, 0.1).listen();
            this.debug.add(this.camera.rotation, 'y', -Math.PI, Math.PI, 0.1).listen();
            this.debug.add(this.camera.rotation, 'z', -Math.PI, Math.PI, 0.1).listen();
        }
    }

    public scene: THREE.Scene;
    public camera: THREE.Camera;

    public debug: any = new dat.GUI();

    public render(dt: number): void {
        this.renderer.render(this.scene, this.camera);
    }

    public update(dt: number): void {
    }
}