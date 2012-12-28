///<reference path='three.d.ts'/>
///<reference path='dat.gui.d.ts'/>

///<reference path='assets.ts'/>
///<reference path='Layer.ts'/>

///<reference path='BaseScene.ts'/>

///<reference path='Rain.ts'/>
///<reference path='Sprite.ts'/>
///<reference path='Player.ts'/>
///<reference path='Tree.ts'/>
///<reference path='Lightning.ts'/>

class CrateScene extends BaseScene {
    constructor (renderer: THREE.Renderer) {
        super(renderer);

        var moontex = THREE.ImageUtils.loadTexture(Assets.Image.moon);
        var hill1 = THREE.ImageUtils.loadTexture(Assets.Image.hill1);
        var hill2 = THREE.ImageUtils.loadTexture(Assets.Image.hill2);

        var playertex = THREE.ImageUtils.loadTexture(Assets.Sprite.player1);
        var backgroundGradientTex = THREE.ImageUtils.loadTexture(Assets.Image.bggradient);

        var starsTex = THREE.ImageUtils.loadTexture(Assets.Image.stars);

		var moon = new Sprite(77, 75, moontex, new THREE.Vector3(260, 170, Layer.moon));
		var stars = new Sprite(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, starsTex, new THREE.Vector3(Config.RENDER_WIDTH / 2, Config.RENDER_HEIGHT / 2, Layer.stars));
		

		var player = new Player(new THREE.Vector3(100, 100, Layer.middle));

		var hilltree0 = new Tree(new THREE.Vector2(283, 76), new THREE.Vector3(0, 0, Math.PI/8), 0);
        var hilltree1 = new Tree(new THREE.Vector2(239, 68), new THREE.Vector3(0, 0, Math.PI/3), 1);
        var hilltree2 = new Tree(new THREE.Vector2(103, 110), new THREE.Vector3(0, 0, Math.PI/3), 2);

		this.scene.add(moon);
		this.scene.add(new Sprite(146, 60, hill1, new THREE.Vector3(270, 30, Layer.hill1)));
		this.scene.add(new Sprite(208, 89, hill2, new THREE.Vector3(139, 44, Layer.hill2)));
		//this.scene.add(hilltree0);
        //this.scene.add(hilltree1);
        //this.scene.add(hilltree2);
        //this.scene.add(player);
        //this.scene.add(new Lightning(new THREE.Vector2(Config.RENDER_WIDTH/2, Config.RENDER_HEIGHT/2)));
        this.scene.add(new Sprite(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, backgroundGradientTex, new THREE.Vector3(Config.RENDER_WIDTH/2, Config.RENDER_HEIGHT/2, Layer.back)));
        this.scene.add(stars);

		if (Debug.GUI_ENABLED) {
		    Debug.addItems(this.debug, this.scene.children);

		    this.debug.add(player.texture.offset, 'x', -1, 1, 0.01);
            this.debug.add(player.texture.offset, 'y', -1, 1, 0.01);
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