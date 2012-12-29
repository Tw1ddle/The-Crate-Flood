var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Island = (function (_super) {
    __extends(Island, _super);
    function Island(position, rotation, id, layer) {
        if(layer == null) {
            layer = Layer.islandsForeground;
        }
        if(id == null) {
            id = Random.nextIntRange(0, 4);
        }
        if(rotation) {
            this.rotation = rotation;
        }
        assert(id <= 4 && id >= 0);
        var size = new THREE.Vector2();
        var texture;
        if(id == 0) {
            size = new THREE.Vector2(81, 26);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island1);
        }
        if(id == 1) {
            size = new THREE.Vector2(51, 20);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island2);
        }
        if(id == 2) {
            size = new THREE.Vector2(110, 30);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island3);
        }
        if(id == 3) {
            size = new THREE.Vector2(111, 35);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island4);
        }
        if(id == 4) {
            size = new THREE.Vector2(89, 35);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island5);
        }
        _super.call(this, size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }
    return Island;
})(Sprite);
//@ sourceMappingURL=Island.js.map
