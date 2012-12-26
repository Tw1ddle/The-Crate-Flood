var BaseScene = (function () {
    function BaseScene(renderer) {
        this.renderer = renderer;
        this.debug = new dat.GUI();
        this.scene = new THREE.Scene();
        this.camera = new THREE.CombinedCamera(Config.GAME_WIDTH, Config.GAME_HEIGHT, 75, 0.01, 5000, -1000, 1000);
        this.camera.rotation.set(0, 0, 0);
        this.scene.add(this.camera);
        this.scene.add(new THREE.AmbientLight(16777215));
        if(Config.DEBUG) {
            this.debug.add(this.camera.position, 'x', 0, Config.GAME_WIDTH, 1).listen();
            this.debug.add(this.camera.position, 'y', -Config.GAME_HEIGHT, 10000, 1).listen();
            this.debug.add(this.camera.position, 'z', -300, 300, 1).listen();
            this.debug.add(this.camera.rotation, 'x', -Math.PI, Math.PI, 0.1).listen();
            this.debug.add(this.camera.rotation, 'y', -Math.PI, Math.PI, 0.1).listen();
            this.debug.add(this.camera.rotation, 'z', -Math.PI, Math.PI, 0.1).listen();
        }
    }
    BaseScene.prototype.render = function (dt) {
        this.renderer.render(this.scene, this.camera);
    };
    BaseScene.prototype.update = function (dt) {
    };
    return BaseScene;
})();
//@ sourceMappingURL=BaseScene.js.map
