var Main = (function () {
    function Main() {
        this.renderstats = new Stats();
        this.updatestats = new Stats();
        this.clock = new THREE.Clock(true);
        this.renderer = new THREE.CanvasRenderer();
        this.paused = false;
        this.started = false;
        if(Debug.ENABLED) {
            this.gui = new dat.GUI();
        }
        Random.setSeed(Date.now());
        this.renderer.setSize(Config.GAME_WIDTH, Config.GAME_HEIGHT);
        this.renderer.setClearColor(new THREE.Color(8913032));
        document.getElementById('maingame').appendChild(this.renderer.domElement);
        this.renderer.domElement.addEventListener('mousemove', this.onCanvasMouseMove.bind(this), false);
        this.renderer.domElement.addEventListener('contextmenu', this.onContextRightClick.bind(this), false);
        window.addEventListener('resize', this.resize.bind(this), false);
        this.loaderscene = new LoaderScene(this.renderer);
        this.startscreenscene = new StartScreenScene(this.renderer);
        this.gamescene = new CrateScene(this.renderer);
        this.pausescene = new PauseScene(this.renderer);
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
        this.animate();
    }
    Main.prototype.render = function (dt) {
        this.renderstats.begin();
        if(!this.started) {
            this.startscreenscene.render(dt);
        }
        this.gamescene.render(dt);
        if(this.paused) {
            this.pausescene.render(dt);
        }
        this.renderstats.end();
    };
    Main.prototype.update = function (dt) {
        this.updatestats.begin();
        if(!this.started) {
            this.startscreenscene.update(dt);
        }
        this.gamescene.update(dt);
        this.updatestats.end();
    };
    Main.prototype.pause = function () {
        this.paused = true;
    };
    Main.prototype.resume = function () {
        this.paused = false;
    };
    Main.prototype.reset = function () {
        this.paused = false;
        this.started = false;
    };
    Main.prototype.resize = function () {
        this.renderer.setSize(Config.GAME_WIDTH, Config.GAME_HEIGHT);
    };
    Main.prototype.onContextRightClick = function (event) {
        if(event.button === 2) {
            event.preventDefault();
        }
    };
    Main.prototype.onCanvasMouseMove = function (event) {
        event.preventDefault();
    };
    Main.prototype.animate = function () {
        var _this = this;
        var _cb = function () {
            var dt = _this.clock.getDelta() * 1000;
            _this.update(dt);
            _this.render(dt);
            requestAnimationFrame(_cb);
        };
        _cb(_this);
    };
    return Main;
})();
window.onload = function () {
    var main = new Main();
};
//@ sourceMappingURL=app.js.map
