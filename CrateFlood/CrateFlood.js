var CrateFlood = (function () {
    function CrateFlood() {
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
    CrateFlood.prototype.foo = function () {
        console.info("blah");
    };
    CrateFlood.prototype.bar = function (num) {
        console.info(num);
    };
    CrateFlood.prototype.baz = function (obj) {
        console.info(obj.toString());
    };
    CrateFlood.prototype.render = function (dt) {
        if(!this.started) {
            this.startscreenscene.render(dt);
        }
        this.gamescene.render(dt);
        if(this.paused) {
            this.pausescene.render(dt);
        }
    };
    CrateFlood.prototype.update = function (dt) {
        if(!this.started) {
            this.startscreenscene.update(dt);
        }
        this.gamescene.update(dt);
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
    CrateFlood.prototype.onContextRightClick = function (event) {
        if(event.button === 2) {
            event.preventDefault();
        }
    };
    CrateFlood.prototype.onCanvasMouseMove = function (event) {
        event.preventDefault();
    };
    CrateFlood.prototype.resize = function (event) {
    };
    return CrateFlood;
})();
//@ sourceMappingURL=CrateFlood.js.map
