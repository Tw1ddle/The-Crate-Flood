///<reference path='three.d.ts'/>
///<reference path='jquery-1.8.d.ts'/>
///<reference path='stats.d.ts'/>
///<reference path='extensions.d.ts'/>

///<reference path='assert.ts'/>

///<reference path='assets.ts'/>
///<reference path='config.ts'/>
///<reference path='debug.ts'/>
///<reference path='terminal.ts'/>
///<reference path='random.ts'/>

///<reference path='IGame.ts'/>
///<reference path='BaseScene.ts'/>

///<reference path='CrateFlood.ts'/>

class Main {
    private renderstats: Stats = new Stats();
    private updatestats: Stats = new Stats();

    private clock: THREE.Clock = new THREE.Clock(true);

    private game: IGame = new CrateFlood();
    
    constructor () {
        //random number generator
        Random.setSeed(Date.now());
        
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

        console.log("foo");

        //go
        this.animate();
    }

    private render(dt: number) {
        this.renderstats.begin();

        this.game.render(dt);

        this.renderstats.end();
    }

    private update(dt: number) {
        this.updatestats.begin();

        this.game.update(dt);

        this.updatestats.end();
    }

    private animate() : void {
        var _this = this;
    
        var _cb = function () { 
            var dt: number = _this.clock.getDelta() * 1000; // ms
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
            console.terminal = function (msg: any) : void {
                console.log(msg);
                //terminal.write(msg);
            }
        }
    }
    
    window["main"] = new Main(); //add Main to the window context so the terminal can get at it
};