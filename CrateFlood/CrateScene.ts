///<reference path='three.d.ts'/>
///<reference path='dat.gui.d.ts'/>

///<reference path='BaseScene.ts'/>

///<reference path='Rain.ts'/>
///<reference path='Sprite.ts'/>
///<reference path='Layer.ts'/>
///<reference path='config.ts'/>
///<reference path='assets.ts'/>

class CrateScene extends BaseScene {
    constructor (renderer: THREE.Renderer) {
        super(renderer);

        this.camera.position.z = 200;
        this.camera.toOrthographic();
        this.camera.setZoom(2.0); // for some reason the orthographic view in the combined camera seems to be twice as big as it should be

        var texture = THREE.ImageUtils.loadTexture(Assets.Image.moon);

		var plane : Sprite = new Sprite(77, 75, texture);

		this.scene.add( plane );

		if (Config.DEBUG) {
            var cubedebug = this.debug.addFolder('Test');
            cubedebug.add(plane.position, 'x', -1000, 1000, 0.1).listen();
            cubedebug.add(plane.position, 'y', -1000, 1000, 0.1).listen();
            cubedebug.add(plane.position, 'z', -1000, 1000, 0.1).listen();

            cubedebug.add(plane.rotation, 'x', -Math.PI, Math.PI, 0.1).listen();
            cubedebug.add(plane.rotation, 'y', -Math.PI, Math.PI, 0.1).listen();
            cubedebug.add(plane.rotation, 'z', -Math.PI, Math.PI, 0.1).listen();
		}

       // this.scene.add(new Rain(new THREE.Vector2(Config.GAME_WIDTH/2, Config.GAME_WIDTH/2)));
    }

    public render(dt: number) {
        super.render(dt);
    }

    public update(dt: number) {
    }
}