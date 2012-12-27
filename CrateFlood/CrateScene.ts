///<reference path='three.d.ts'/>
///<reference path='dat.gui.d.ts'/>

///<reference path='BaseScene.ts'/>

///<reference path='Rain.ts'/>
///<reference path='Sprite.ts'/>
///<reference path='Tree.ts'/>
///<reference path='Layer.ts'/>
///<reference path='assets.ts'/>

class CrateScene extends BaseScene {
    constructor (renderer: THREE.Renderer) {
        super(renderer);

        var moontex = THREE.ImageUtils.loadTexture(Assets.Image.moon);
        var hill1 = THREE.ImageUtils.loadTexture(Assets.Image.hill1);
        var hill2 = THREE.ImageUtils.loadTexture(Assets.Image.hill2);

		var moon = new Sprite(77, 75, moontex, new THREE.Vector3(260, 170, Layer.moon));

		this.scene.add(moon);
		this.scene.add(new Sprite(146, 60, hill1, new THREE.Vector3(270, 30, Layer.hill1)));
		this.scene.add(new Sprite(208, 89, hill2, new THREE.Vector3(139, 44, Layer.hill2)));
		this.scene.add(new Tree(new THREE.Vector2(55, 21), 0));
        this.scene.add(new Tree(new THREE.Vector2(95, 21), 1));
        this.scene.add(new Tree(new THREE.Vector2(155, 21), 2));

		if (Debug.ENABLED) {
		    Debug.addItems(this.debug, this.scene.children);
		}

        this.scene.add(new Rain(new THREE.Vector2(Config.GAME_WIDTH/2, Config.GAME_WIDTH/2)));
    }

    public render(dt: number) {
        super.render(dt);
    }

    public update(dt: number) {
        super.update(dt);
    }
}