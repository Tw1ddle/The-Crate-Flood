var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CrateScene = (function (_super) {
    __extends(CrateScene, _super);
    function CrateScene(renderer) {
        _super.call(this, renderer);
        this.camera.position.z = 200;
        this.camera.toOrthographic();
        this.camera.setZoom(2);
        var texture = THREE.ImageUtils.loadTexture(Assets.Image.moon);
        var plane = new Sprite(77, 75, texture);
        this.scene.add(plane);
        if(Config.DEBUG) {
            var cubedebug = this.debug.addFolder('Test');
            cubedebug.add(plane.position, 'x', -1000, 1000, 0.1).listen();
            cubedebug.add(plane.position, 'y', -1000, 1000, 0.1).listen();
            cubedebug.add(plane.position, 'z', -1000, 1000, 0.1).listen();
            cubedebug.add(plane.rotation, 'x', -Math.PI, Math.PI, 0.1).listen();
            cubedebug.add(plane.rotation, 'y', -Math.PI, Math.PI, 0.1).listen();
            cubedebug.add(plane.rotation, 'z', -Math.PI, Math.PI, 0.1).listen();
        }
    }
    CrateScene.prototype.render = function (dt) {
        _super.prototype.render.call(this, dt);
    };
    CrateScene.prototype.update = function (dt) {
    };
    return CrateScene;
})(BaseScene);
//@ sourceMappingURL=CrateScene.js.map
