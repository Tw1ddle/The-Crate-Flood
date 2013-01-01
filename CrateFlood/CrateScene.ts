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
///<reference path='Island.ts'/>
///<reference path='Cloud.ts'/>
///<reference path='Water.ts'/>
///<reference path='Crate.ts'/>
///<reference path='TextItem.ts'/>

class CrateScene extends BaseScene {
    constructor (renderer: THREE.Renderer) {
        super(renderer);

        var moontex = THREE.ImageUtils.loadTexture(Assets.Image.moon);
        var hill1 = THREE.ImageUtils.loadTexture(Assets.Image.hill1);
        var hill2 = THREE.ImageUtils.loadTexture(Assets.Image.hill2);

        var playertex = THREE.ImageUtils.loadTexture(Assets.Sprite.player1);
        var backgroundGradientTex = THREE.ImageUtils.loadTexture(Assets.Image.bggradient);
        var groundTex = THREE.ImageUtils.loadTexture(Assets.Image.ground);

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
       // this.scene.add(new Lightning(new THREE.Vector2(Config.RENDER_WIDTH/2, Config.RENDER_HEIGHT/2)));
        this.scene.add(new Sprite(400, 250, backgroundGradientTex, new THREE.Vector3(Config.RENDER_WIDTH/2, Config.RENDER_HEIGHT/2, Layer.back)));
        this.scene.add(stars);
        this.scene.add(new Island(new THREE.Vector2(50, 120)));
        this.scene.add(new Island(new THREE.Vector2(200, 100)));
        this.scene.add(new Island(new THREE.Vector2(290, 60)));
        this.scene.add(new Island(new THREE.Vector2(100, 180)));
        this.scene.add(new Crate(new THREE.Vector2(102, 195)));
        this.scene.add(new Sprite(400, 19, groundTex, new THREE.Vector3(Config.RENDER_WIDTH / 2, 0, Layer.earthBackground)));

        this.scene.add(new Cloud(new THREE.Vector2(-100, Random.nextDoubleRange(200, 225)), new THREE.Vector3(0, 0, 0), 0));
        this.scene.add(new Cloud(new THREE.Vector2(-100, Random.nextDoubleRange(150, 200)), new THREE.Vector3(0, 0, 0), 1));
        this.scene.add(new Cloud(new THREE.Vector2(-100, Random.nextDoubleRange(50, 100)), new THREE.Vector3(0, 0, 0), 2));

        this.scene.add(new Water(new THREE.Vector2(Config.RENDER_WIDTH/2, -Config.RENDER_HEIGHT/2)));

        this.scene.add(new TextItem(new THREE.Vector3(46, 227, Layer.front), 200, 12, "12px Helvetica", "white", "GENESIS 6:17"));
        this.scene.add(new TextItem(new THREE.Vector3(194, 191, Layer.front), 350, 12, "12px Helvetica", "white", "I am going to bring floodwaters on the earth to destroy all life under the heavens..."));
        this.scene.add(new TextItem(new THREE.Vector3(178, 160, Layer.front), 350, 12, "12px Helvetica", "white", "...every creature that has the breath of life in it."));
        this.scene.add(new TextItem(new THREE.Vector3(171, 130, Layer.front), 350, 12, "12px Helvetica", "white", "Everything on earth will perish."));

        this.scene.add(new Rain(new THREE.Vector2(200, 100)));

		if (Debug.GUI_ENABLED) {
		    Debug.addItems(this.debug, this.scene.children);

		    this.debug.add(player.texture.offset, 'x', -1, 1, 0.01);
            this.debug.add(player.texture.offset, 'y', -1, 1, 0.01);
		}
    }

    public render(dt: number) {
        super.render(dt);
    }

    public update(dt: number) {
        super.update(dt);
    }
}