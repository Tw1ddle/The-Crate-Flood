var LoaderScene = (function () {
    function LoaderScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.01, 100);
        this.scene.add(this.camera);
    }
    LoaderScene.prototype.render = function (dt) {
    };
    LoaderScene.prototype.update = function (dt) {
    };
    return LoaderScene;
})();
//@ sourceMappingURL=LoaderScene.js.map
