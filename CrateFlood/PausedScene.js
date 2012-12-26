var PausedScene = (function () {
    function PausedScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.01, 100);
    }
    PausedScene.prototype.render = function (dt) {
    };
    PausedScene.prototype.update = function (dt) {
    };
    return PausedScene;
})();
//@ sourceMappingURL=PausedScene.js.map
