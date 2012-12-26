var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CrateScene = (function (_super) {
    __extends(CrateScene, _super);
    function CrateScene(renderer) {
        _super.call(this, renderer);
        this.scene.add(new Rain());
    }
    CrateScene.prototype.render = function (dt) {
        _super.prototype.render.call(this, dt);
    };
    CrateScene.prototype.update = function (dt) {
    };
    return CrateScene;
})(BaseScene);
//@ sourceMappingURL=CrateScene.js.map
