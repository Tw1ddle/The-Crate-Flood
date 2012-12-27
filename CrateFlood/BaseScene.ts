///<reference path='IScene.ts'/>
///<reference path='Debug.ts'/>

///<reference path='dat.gui.d.ts'/>

class BaseScene implements IScene {
    constructor (private renderer: THREE.Renderer) {
        //setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, Config.RENDER_WIDTH, Config.RENDER_HEIGHT, 0, -1000, 1000);
        this.camera.position.set(0, 0, 200);

        //debugging
        if (Debug.ENABLED) {
            this.debug = new dat.GUI();
            Debug.addItem(this.debug, this.camera, 'Camera');
        }
    }

    public scene: THREE.Scene;
    public camera: THREE.OrthographicCamera;

    public debug: any;

    public render(dt: number): void {
        this.renderer.render(this.scene, this.camera);
    }

    public update(dt: number): void {
    }
}