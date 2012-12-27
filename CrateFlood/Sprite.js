var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(width, height, texture, position, tiles, duration) {
        _super.call(this, new THREE.PlaneGeometry(width, height), new THREE.MeshPhongMaterial({
    color: 16777215,
    map: texture,
    overdraw: true
}));
        this.tiles = tiles;
        this.duration = duration;
        if(position != null) {
            this.position.set(position.x, position.y, position.z);
        }
        if(tiles != null) {
            this.numTiles = tiles.x * tiles.y;
        } else {
            this.numTiles = 1;
        }
        assert(texture != null, 'Sprite with null texture constructed');
    }
    Sprite.prototype.update = function (dt) {
        this.cumulativeTime += dt;
    };
    Sprite.prototype.setTile = function (index) {
    };
    return Sprite;
})(THREE.Mesh);
//@ sourceMappingURL=Sprite.js.map
