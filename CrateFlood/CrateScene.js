var CrateScene = (function () {
    function CrateScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.01, 100);
        this.scene.add(this.camera);
    }
    CrateScene.prototype.render = function (dt) {
    };
    CrateScene.prototype.update = function (dt) {
    };
    return CrateScene;
})();
//@ sourceMappingURL=CrateScene.js.map
