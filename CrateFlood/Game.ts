///<reference path='IGame.ts'/>

///<reference path='tslib/three.d.ts'/>
///<reference path='tslib/jquery-1.8.d.ts'/>
///<reference path='tslib/stats.d.ts'/>

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

class Game implements IGame {
    private gui: any;

    private clock: THREE.Clock = new THREE.Clock(true);
    private renderer: THREE.CanvasRenderer = new THREE.CanvasRenderer();

    private loaderscene: BaseScene;
    private startscreenscene: BaseScene;
    private gamescene: BaseScene;
    private pausescene: BaseScene;

    private paused: bool = false;
    private started: bool = true;
    
    constructor () {
        if (Debug.GUI_ENABLED) {
            this.gui = new dat.gui.GUI();
        }

        //setup renderer
        this.renderer.setSize(Config.GAME_WIDTH, Config.GAME_HEIGHT);
        this.renderer.setClearColor(new THREE.Color(0x880088));
        this.renderer.autoClear = false; //don't clear the screen between scene renders

        //set game window
        document.getElementById('maingame').appendChild(this.renderer.domElement);

        //load the levels (todo - loading callback)
        this.loaderscene = new LoaderScene(this.renderer);

        this.startscreenscene = new StartScreenScene(this.renderer);
        this.gamescene = new CrateScene(this.renderer);
        this.pausescene = new PauseScene(this.renderer);
    }

    public pause() : void {
        this.paused = true;
    }

    public resume(): void {
        this.paused = false;
    }

    public start(): void {
        this.started = true;
    }

    public stop(): void {
        this.started = false;
    }

    public togglePaused(p: bool): void {
        console.info(p);

        this.paused = p;

        console.info(this.paused);
    }

    private render(dt: number): void {
        this.renderer.clear();

        if (!this.started) {
       //     this.startscreenscene.render(dt);
        }

        if (!this.paused) {
            this.gamescene.render(dt);
        }

        if (this.paused) {
       //     this.pausescene.render(dt);
        }
    }

    private update(dt: number): void {

        if (!this.started) {
            this.startscreenscene.update(dt);
        }

        if (!this.paused) {
            this.gamescene.update(dt);
        }

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