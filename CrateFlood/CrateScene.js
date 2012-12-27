var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CrateScene = (function (_super) {
    __extends(CrateScene, _super);
    function CrateScene(renderer) {
        _super.call(this, renderer);
        var moontex = THREE.ImageUtils.loadTexture(Assets.Image.moon);
        var hill1 = THREE.ImageUtils.loadTexture(Assets.Image.hill1);
        var hill2 = THREE.ImageUtils.loadTexture(Assets.Image.hill2);
        var moon = new Sprite(77, 75, moontex, new THREE.Vector3(260, 170, Layer.moon));
        this.scene.add(moon);
        this.scene.add(new Sprite(146, 60, hill1, new THREE.Vector3(270, 30, Layer.hill1)));
        this.scene.add(new Sprite(208, 89, hill2, new THREE.Vector3(139, 44, Layer.hill2)));
        this.scene.add(new Tree(new THREE.Vector2(55, 21), 0));
        this.scene.add(new Tree(new THREE.Vector2(95, 21), 1));
        this.scene.add(new Tree(new THREE.Vector2(155, 21), 2));
        if(Debug.ENABLED) {
            Debug.addItems(this.debug, this.scene.children);
        }
        this.scene.add(new Rain(new THREE.Vector2(Config.GAME_WIDTH / 2, Config.GAME_WIDTH / 2)));
    }
    CrateScene.prototype.render = function (dt) {
        _super.prototype.render.call(this, dt);
    };
    CrateScene.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
    };
    return CrateScene;
})(BaseScene);
//@ sourceMappingURL=CrateScene.js.map
