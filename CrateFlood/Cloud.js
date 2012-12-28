var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(position, rotation, id, layer) {
        if(layer == null) {
            layer = Layer.clouds;
        }
        if(id == null) {
            id = Random.nextIntRange(0, 2);
        }
        if(rotation) {
            this.rotation = rotation;
        }
        assert(id <= 2 && id >= 0);
        var size = new THREE.Vector2();
        var texture;
        if(id == 0) {
            size = new THREE.Vector2(37, 32);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.cloud1);
        }
        if(id == 1) {
            size = new THREE.Vector2(46, 43);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.cloud2);
        }
        if(id == 2) {
            size = new THREE.Vector2(58, 59);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.cloud3);
        }
        _super.call(this, size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }
    Cloud.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
    };
    return Cloud;
})(Sprite);
//@ sourceMappingURL=Cloud.js.map
