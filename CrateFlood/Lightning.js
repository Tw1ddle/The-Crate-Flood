var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Lightning = (function (_super) {
    __extends(Lightning, _super);
    function Lightning(position) {
        var texture = new THREE.Texture(Utility.generateImage(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, "#FFFFFF", 0.23));
        texture.needsUpdate = true;
        _super.call(this, Config.RENDER_WIDTH, Config.RENDER_HEIGHT, texture, new THREE.Vector3(position.x, position.y, Layer.lightning));
        this.cumulativeTime = 0;
        this.flashDuration = 50;
        this.frequency = 4000;
        this.visible = false;
    }
    Lightning.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        this.cumulativeTime += dt;
        if(this.cumulativeTime > (this.frequency + this.flashDuration)) {
            this.cumulativeTime = 0;
            this.visible = false;
        }
        if(this.cumulativeTime > this.frequency) {
            this.visible = true;
        }
    };
    return Lightning;
})(Sprite);
//@ sourceMappingURL=Lightning.js.map
