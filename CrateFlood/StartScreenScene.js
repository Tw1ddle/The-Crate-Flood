var StartScreenScene = (function () {
    function StartScreenScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.01, 100);
        this.scene.add(this.camera);
    }
    StartScreenScene.prototype.render = function (dt) {
    };
    StartScreenScene.prototype.update = function (dt) {
    };
    return StartScreenScene;
})();
//@ sourceMappingURL=StartScreenScene.js.map
