var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Water = (function (_super) {
    __extends(Water, _super);
    function Water(position, risingRate, rotation, layer) {
        if(layer == null) {
            layer = Layer.waterForeground;
        }
        if(rotation != null) {
            this.rotation = rotation;
        }
        if(risingRate == null) {
            this.risingRate = 10;
        } else {
            this.risingRate = risingRate;
        }
        var size = new THREE.Vector2(Config.RENDER_WIDTH, Config.RENDER_HEIGHT);
        var texture = new THREE.Texture(Utility.generateImage(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, "#1111BB", 0.23));
        texture.needsUpdate = true;
        _super.call(this, size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }
    Water.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        this.position.y += this.risingRate * dt;
    };
    return Water;
})(Sprite);
//@ sourceMappingURL=Water.js.map
