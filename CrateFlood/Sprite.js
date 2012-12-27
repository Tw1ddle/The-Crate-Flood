var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(width, height, texture) {
        _super.call(this, new THREE.PlaneGeometry(width, height), new THREE.MeshPhongMaterial({
    color: 16777215,
    map: texture,
    overdraw: true
}));
    }
    Sprite.prototype.update = function (dt) {
    };
    return Sprite;
})(THREE.Mesh);
//@ sourceMappingURL=Sprite.js.map
