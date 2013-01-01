///<reference path='IScene.ts'/>
///<reference path='debug.ts'/>

///<reference path='Utility.ts'/>

///<reference path='dat.gui.d.ts'/>

class BaseScene implements IScene {
    constructor (private renderer: THREE.Renderer) {
        //setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, Config.RENDER_WIDTH, Config.RENDER_HEIGHT, 0, -1000, 1000);
        this.camera.position.set(0, 0, 200);
        //this.camera.scale.set(1.3, 1.3, 1.0);

        //debugging
        if (Debug.GUI_ENABLED) {
            this.camera.position.set(-60, -41, 200);
            this.camera.scale.set(1.3, 1.3, 1.0);

            this.debug = new dat.gui.GUI();
            Debug.addCamera(this.debug, this.camera, 'Camera');
            Debug.addSceneInfo(this.debug, this.scene, 'Scene');
        }
    }

    public scene: THREE.Scene; // public for debugging
    public camera: THREE.OrthographicCamera;
    
    public debug: any;

    public render(dt: number): void {
        this.renderer.render(this.scene, this.camera);
    }

    // if this is slow then it might be worth making a separate list of updateable objects
    public update(dt: number): void {
        for (var i = 0; i < this.scene.children.length; i++) {

            var object : any = this.scene.children[i];

            if (Utility.isFunction( object.update )) {
                object.update(dt);
            }
        }
    }
}