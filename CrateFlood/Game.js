var Game = (function () {
    function Game() {
        this.clock = new THREE.Clock(true);
        this.renderer = new THREE.CanvasRenderer();
        this.paused = false;
        this.started = true;
        if(Debug.GUI_ENABLED) {
            this.gui = new dat.gui.GUI();
        }
        this.renderer.setSize(Config.GAME_WIDTH, Config.GAME_HEIGHT);
        this.renderer.setClearColor(new THREE.Color(8913032));
        this.renderer.autoClear = false;
        document.getElementById('maingame').appendChild(this.renderer.domElement);
        this.loaderscene = new LoaderScene(this.renderer);
        this.startscreenscene = new StartScreenScene(this.renderer);
        this.gamescene = new CrateScene(this.renderer);
        this.pausescene = new PauseScene(this.renderer);
    }
    Game.prototype.pause = function () {
        this.paused = true;
    };
    Game.prototype.resume = function () {
        this.paused = false;
    };
    Game.prototype.start = function () {
        this.started = true;
    };
    Game.prototype.stop = function () {
        this.started = false;
    };
    Game.prototype.togglePaused = function (p) {
        console.info(p);
        this.paused = p;
        console.info(this.paused);
    };
    Game.prototype.render = function (dt) {
        this.renderer.clear();
        if(!this.started) {
        }
        if(!this.paused) {
            this.gamescene.render(dt);
        }
        if(this.paused) {
        }
    };
    Game.prototype.update = function (dt) {
        if(!this.started) {
            this.startscreenscene.update(dt);
        }
        if(!this.paused) {
            this.gamescene.update(dt);
        }
    };
    Game.prototype.reset = function () {
        this.paused = false;
        this.started = false;
    };
    Game.prototype.onContextRightClick = function (event) {
        if(event.button === 2) {
            event.preventDefault();
        }
    };
    Game.prototype.onCanvasMouseMove = function (event) {
        event.preventDefault();
    };
    Game.prototype.resize = function (event) {
    };
    return Game;
})();
//@ sourceMappingURL=Game.js.map
