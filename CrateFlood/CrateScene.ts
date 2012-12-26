///<reference path='three.d.ts'/>
///<reference path='dat.gui.d.ts'/>

///<reference path='BaseScene.ts'/>

///<reference path='Rain.ts'/>
///<reference path='Layer.ts'/>
///<reference path='config.ts'/>

class CrateScene extends BaseScene {
    constructor (renderer: THREE.Renderer) {
        super(renderer);

        this.camera.position.z = 200;

        var geometry = new THREE.CubeGeometry( 50, 50, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: true } );

		var cube = new THREE.Mesh( geometry, material );

		cube.position.x = 0;
		cube.position.y = 0;
		cube.position.z = 10;

		this.scene.add( cube );

		if (Config.DEBUG) {
            this.debug.add(cube.position, 'x', -1000, 1000, 0.1).listen();
            this.debug.add(cube.position, 'y', -1000, 1000, 0.1).listen();
            this.debug.add(cube.position, 'z', -1000, 1000, 0.1).listen();
		}

       // this.scene.add(new Rain(new THREE.Vector2(Config.GAME_WIDTH/2, Config.GAME_WIDTH/2)));
    }

    public render(dt: number) {
        super.render(dt);
    }

    public update(dt: number) {
        //this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
}