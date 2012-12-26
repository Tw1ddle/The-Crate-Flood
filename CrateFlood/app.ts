///<reference path='three.d.ts'/>
///<reference path='jquery-1.8.d.ts'/>
///<reference path='stats.d.ts'/>

///<reference path='assert.ts'/>

///<reference path='assets.ts'/>
///<reference path='config.ts'/>

///<reference path='IGame.ts'/>
///<reference path='IScene.ts'/>

///<reference path='LoaderScene.ts'/>
///<reference path='StartScreenScene.ts'/>
///<reference path='CrateScene.ts'/>
///<reference path='PauseScene.ts'/>

class CrateFlood implements IGame {
    private gui: any;
    private renderstats: Stats = new Stats();
    private updatestats: Stats = new Stats();

    private clock: THREE.Clock = new THREE.Clock(true);
    private renderer: THREE.CanvasRenderer = new THREE.CanvasRenderer();

    private loaderscene: IScene;
    private startscreenscene: IScene;
    private gamescene: IScene;
    private pausescene: IScene;

    private paused: bool = false;
    private started: bool = false;
    
    constructor () {
        //setup renderer
        this.renderer.setSize(Config.GAME_WIDTH, Config.GAME_HEIGHT);

        //set window
        document.getElementById("maingame").appendChild(this.renderer.domElement);

        //event listeners
        this.renderer.domElement.addEventListener('mousemove', this.onCanvasMouseMove.bind(this), false); // 'this' binding - https://developer.mozilla.org/en-US/docs/DOM/element.addEventListener
        this.renderer.domElement.addEventListener('contextmenu', this.onContextRightClick.bind(this), false);
        window.addEventListener('resize', this.resize.bind(this), false);
        //todo - lose/regain focus/pause the game controls

        //load the levels (todo - loading callback)
        this.loaderscene = new LoaderScene();

        this.startscreenscene = new StartScreenScene();
        this.gamescene = new CrateScene();
        this.pausescene = new PauseScene();
        
        //stats
        this.renderstats.setMode(1);
        this.renderstats.domElement.style.position = 'absolute';
        this.renderstats.domElement.style.left = '860px';
        this.renderstats.domElement.style.top = '0px';
        document.body.appendChild(this.renderstats.domElement);

        this.updatestats.setMode(1);
        this.updatestats.domElement.style.position = 'absolute';
        this.updatestats.domElement.style.left = '960px';
        this.updatestats.domElement.style.top = '0px';
        document.body.appendChild(this.updatestats.domElement);

        //go
        this.animate();
    }

    private render(dt: number) {
        this.renderstats.begin();

        if (!this.started) {
            this.startscreenscene.render(dt);
        }

        this.gamescene.render(dt);

        if (this.paused) {
            this.pausescene.render(dt);
        }

        this.renderstats.end();
    }

    private update(dt: number) {
        this.updatestats.begin();

        if (!this.started) {
            this.startscreenscene.update(dt);
        }

        if (!this.paused) {
            this.gamescene.update(dt);
        }

        this.updatestats.end();
    }

    private pause() {
        this.paused = true;
    }

    private resume() {
        this.paused = false;
    }

    private resize(): void {
    }

    private onContextRightClick(event: any): void {
        if (event.button === 2) {
            event.preventDefault();
        }
    }

    private onCanvasMouseMove(event: any) : void {
        event.preventDefault();
    }

    private animate() : void {
        var _this = this;
    
        var _cb = function () { 
            var dt: number = _this.clock.getDelta();
            _this.update(dt);
            _this.render(dt);
            requestAnimationFrame(_cb);
        }
        _cb(_this);  
    }
}

window.onload = () => {
    var crateFlood: CrateFlood = new CrateFlood();
};