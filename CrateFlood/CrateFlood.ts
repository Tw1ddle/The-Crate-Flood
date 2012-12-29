///<reference path='IGame.ts'/>

///<reference path='three.d.ts'/>
///<reference path='jquery-1.8.d.ts'/>
///<reference path='stats.d.ts'/>

///<reference path='assert.ts'/>

///<reference path='assets.ts'/>
///<reference path='config.ts'/>
///<reference path='debug.ts'/>
///<reference path='terminal.ts'/>

///<reference path='BaseScene.ts'/>

///<reference path='LoaderScene.ts'/>
///<reference path='StartScreenScene.ts'/>
///<reference path='CrateScene.ts'/>
///<reference path='PauseScene.ts'/>

class CrateFlood implements IGame {
    private gui: any;

    private clock: THREE.Clock = new THREE.Clock(true);
    private renderer: THREE.CanvasRenderer = new THREE.CanvasRenderer();

    private loaderscene: BaseScene;
    private startscreenscene: BaseScene;
    private gamescene: BaseScene;
    private pausescene: BaseScene;

    private paused: bool = false;
    private started: bool = false;
    
    constructor () {
        if (Debug.GUI_ENABLED) {
            this.gui = new dat.gui.GUI();
        }

        //setup renderer
        this.renderer.setSize(Config.GAME_WIDTH, Config.GAME_HEIGHT);
        this.renderer.setClearColor(new THREE.Color(0x880088));

        //set game window
        document.getElementById('maingame').appendChild(this.renderer.domElement);

        //load the levels (todo - loading callback)
        this.loaderscene = new LoaderScene(this.renderer);

        this.startscreenscene = new StartScreenScene(this.renderer);
        this.gamescene = new CrateScene(this.renderer);
        this.pausescene = new PauseScene(this.renderer);
    }

    public foo(): void {
        console.info("blah");
    }

    public bar(num: number): void {
        console.info(num);
    }

    public baz(obj: Object): void {
        console.info(obj.toString());
    }


    private render(dt: number) {

        if (!this.started) {
            this.startscreenscene.render(dt);
        }

        this.gamescene.render(dt);

        if (this.paused) {
            this.pausescene.render(dt);
        }

    }

    private update(dt: number) {

        if (!this.started) {
            this.startscreenscene.update(dt);
        }

      //  if (!this.paused && this.started) {
            this.gamescene.update(dt);
      //  }

    }

    private pause() {
        this.paused = true;
    }

    private resume() {
        this.paused = false;
    }

    private reset(): void {
        this.paused = false;
        this.started = false;
    }

    private onContextRightClick(event: any): void {
        if (event.button === 2) {
            event.preventDefault();
        }
    }

    private onCanvasMouseMove(event: any) : void {
        event.preventDefault();
    }

    private resize(event: any): void {
        //todo
    }
}