///<reference path='IScene.ts'/>

///<reference path='dat.gui.d.ts'/>

class BaseScene implements IScene {
    constructor (private renderer: THREE.Renderer) {
        //setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.CombinedCamera(Config.GAME_WIDTH, Config.GAME_HEIGHT, 75, 0.01, 5000, -1000, 1000);

        this.scene.add(this.camera);
        this.scene.add(new THREE.AmbientLight(0xFFFFFF));

        //debugging
        if (Config.DEBUG) {
            this.debug = new dat.GUI();
            var camdebug = this.debug.addFolder('Camera');
            camdebug.add(this.camera.position, 'x', -Config.GAME_WIDTH, Config.GAME_WIDTH, 1).listen();
            camdebug.add(this.camera.position, 'y', -Config.GAME_HEIGHT, 10000, 1).listen();
            camdebug.add(this.camera.position, 'z', -300, 300, 1).listen();

            camdebug.add(this.camera.rotation, 'x', -Math.PI, Math.PI, 0.1).listen();
            camdebug.add(this.camera.rotation, 'y', -Math.PI, Math.PI, 0.1).listen();
            camdebug.add(this.camera.rotation, 'z', -Math.PI, Math.PI, 0.1).listen();

            camdebug.add(this.camera, 'zoom', 0.1, 10, 0.1).listen().onChange((function (value) {
                this.camera.setZoom(value);
            }).bind(this));

            camdebug.add(this.camera, 'inPerspectiveMode').listen().onChange((function (value) {
                if (value == true) {
                    this.camera.toPerspective();
                }
                else if( value == false) {
                    this.camera.toOrthographic();
                }
            }).bind(this));


        }
    }

    public scene: THREE.Scene;
    public camera: THREE.CombinedCamera;

    public debug: any;

    public render(dt: number): void {
        this.renderer.render(this.scene, this.camera);
    }

    public update(dt: number): void {
    }
}