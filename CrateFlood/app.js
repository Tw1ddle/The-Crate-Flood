var Main = (function () {
    function Main() {
        this.renderstats = new Stats();
        this.updatestats = new Stats();
        this.clock = new THREE.Clock(true);
        this.game = new CrateFlood();
        Random.setSeed(Date.now());
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
        this.game.render(dt);
        this.renderstats.end();
    };
    Main.prototype.update = function (dt) {
        this.updatestats.begin();
        this.game.update(dt);
        this.updatestats.end();
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
    if(Debug.TERMINAL_ENABLED) {
        var terminal = new Debug.Terminal();
    }
    var main = new Main();
};
//@ sourceMappingURL=app.js.map
