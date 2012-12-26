var StartScene = (function () {
    function StartScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.01, 100);
        this.scene.add(this.camera);
    }
    StartScene.prototype.render = function (dt) {
    };
    StartScene.prototype.update = function (dt) {
    };
    return StartScene;
})();
//@ sourceMappingURL=StartScene.js.map
