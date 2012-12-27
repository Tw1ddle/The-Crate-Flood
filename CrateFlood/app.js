var CrateFlood = (function () {
    function CrateFlood() {
        this.renderstats = new Stats();
        this.updatestats = new Stats();
        this.clock = new THREE.Clock(true);
        this.renderer = new THREE.CanvasRenderer();
        this.paused = false;
        this.started = false;
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
    CrateFlood.prototype.render = function (dt) {
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
    CrateFlood.prototype.update = function (dt) {
        this.updatestats.begin();
        if(!this.started) {
            this.startscreenscene.update(dt);
        }
        this.gamescene.update(dt);
        this.updatestats.end();
    };
    CrateFlood.prototype.pause = function () {
        this.paused = true;
    };
    CrateFlood.prototype.resume = function () {
        this.paused = false;
    };
    CrateFlood.prototype.reset = function () {
        this.paused = false;
        this.started = false;
    };
    CrateFlood.prototype.resize = function () {
        this.renderer.setSize(Config.GAME_WIDTH, Config.GAME_HEIGHT);
    };
    CrateFlood.prototype.onContextRightClick = function (event) {
        if(event.button === 2) {
            event.preventDefault();
        }
    };
    CrateFlood.prototype.onCanvasMouseMove = function (event) {
        event.preventDefault();
    };
    CrateFlood.prototype.animate = function () {
        var _this = this;
        var _cb = function () {
            var dt = _this.clock.getDelta() * 1000;
            _this.update(dt);
            _this.render(dt);
            requestAnimationFrame(_cb);
        };
        _cb(_this);
    };
    return CrateFlood;
})();
window.onload = function () {
    var crateFlood = new CrateFlood();
};
//@ sourceMappingURL=app.js.map
