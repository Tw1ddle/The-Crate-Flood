var BaseScene = (function () {
    function BaseScene(renderer) {
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.01, 100);
        this.scene.add(this.camera);
    }
    BaseScene.prototype.render = function (dt) {
        this.renderer.render(this.scene, this.camera);
    };
    BaseScene.prototype.update = function (dt) {
    };
    return BaseScene;
})();
//@ sourceMappingURL=BaseScene.js.map
