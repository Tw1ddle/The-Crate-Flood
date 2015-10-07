///<reference path='tslib/stats.d.ts'/>

///<reference path='assert.ts'/>

///<reference path='debug.ts'/>
///<reference path='terminal.ts'/>
///<reference path='random.ts'/>

///<reference path='IGame.ts'/>
///<reference path='Game.ts'/>

class Main {
    private renderstats: Stats = new Stats();
    private updatestats: Stats = new Stats();

    private clock: THREE.Clock = new THREE.Clock(true);

    public game: IGame;
    
    constructor () {
        //random number generator
        Random.setSeed(Date.now());

        //load resources
        //todo - get rid of all asset loads elsewhere
        //add callback etc
        //...

        //load game
        this.game = new Game(); //public so we can get at it through terminal
        
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

    public render(dt: number) {
        this.renderstats.begin();

        this.game.render(dt);

        this.renderstats.end();
    }

    public update(dt: number) {
        this.updatestats.begin();

        this.game.update(dt);

        this.updatestats.end();
    }

    public pause() {
    }

    public resume() {
    }

    private animate() : void {
        var _this = this;

        var _cb = function (p: any) { 
            var dt: number = _this.clock.getDelta(); // seconds
            _this.update(dt);
            _this.render(dt);
            requestAnimationFrame(_cb);
        }
        _cb(_this);  
    }
}

window.onload = () => {

    if (Debug.TERMINAL_ENABLED) { 
        var terminal: Debug.Terminal = new Debug.Terminal();

        // override the browser console and direct stuff to the terminal
        if (window.console) {
            function customLog(message: any) {
                terminal.write(message); //todo
            }

          //  <any>console.log = customLog;
          //  <any>console.info = customLog;
          //  <any>console.warn = customLog;
        }

    }
    
    window["main"] = new Main();
};