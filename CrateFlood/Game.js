var Game = (function () {
    function Game() {
        this.clock = new THREE.Clock(true);
        this.renderer = new THREE.CanvasRenderer();
        this.paused = false;
        this.started = false;
        if(Debug.GUI_ENABLED) {
            this.gui = new dat.gui.GUI();
        }
        this.renderer.setSize(Config.GAME_WIDTH, Config.GAME_HEIGHT);
        this.renderer.setClearColor(new THREE.Color(8913032));
        document.getElementById('maingame').appendChild(this.renderer.domElement);
        this.loaderscene = new LoaderScene(this.renderer);
        this.startscreenscene = new StartScreenScene(this.renderer);
        this.gamescene = new CrateScene(this.renderer);
        this.pausescene = new PauseScene(this.renderer);
    }
    Game.prototype.render = function (dt) {
        if(!this.started) {
            this.startscreenscene.render(dt);
        }
        this.gamescene.render(dt);
        if(this.paused) {
            this.pausescene.render(dt);
        }
    };
    Game.prototype.update = function (dt) {
        if(!this.started) {
            this.startscreenscene.update(dt);
        }
        this.gamescene.update(dt);
    };
    Game.prototype.pause = function () {
        this.paused = true;
    };
    Game.prototype.resume = function () {
        this.paused = false;
    };
    Game.prototype.reset = function () {
        this.paused = false;
        this.started = false;
    };
    return Game;
})();
//@ sourceMappingURL=Game.js.map
