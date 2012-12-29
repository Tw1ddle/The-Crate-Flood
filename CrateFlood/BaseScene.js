var BaseScene = (function () {
    function BaseScene(renderer) {
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, Config.RENDER_WIDTH, Config.RENDER_HEIGHT, 0, -1000, 1000);
        this.camera.position.set(0, 0, 200);
        if(Debug.GUI_ENABLED) {
            this.debug = new dat.gui.GUI();
            Debug.addCamera(this.debug, this.camera, 'Camera');
            Debug.addSceneInfo(this.debug, this.scene, 'Scene');
        }
    }
    BaseScene.prototype.render = function (dt) {
        this.renderer.render(this.scene, this.camera);
    };
    BaseScene.prototype.update = function (dt) {
        for(var i = 0; i < this.scene.children.length; i++) {
            var object = this.scene.children[i];
            if(Utility.isFunction(object.update)) {
                object.update(dt);
            }
        }
    };
    return BaseScene;
})();
//@ sourceMappingURL=BaseScene.js.map
