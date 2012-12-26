var PauseScene = (function () {
    function PauseScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.01, 100);
        this.scene.add(this.camera);
    }
    PauseScene.prototype.render = function (dt) {
    };
    PauseScene.prototype.update = function (dt) {
    };
    return PauseScene;
})();
//@ sourceMappingURL=PauseScene.js.map
