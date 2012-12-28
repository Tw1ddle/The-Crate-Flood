var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Animations;
(function (Animations) {
    Animations.none = {
        frames: [
            0
        ],
        times: [
            0
        ]
    };
})(Animations || (Animations = {}));
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(width, height, texture, position, tileLayout) {
        _super.call(this, new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: true
}));
        this.texture = texture;
        this.timeAccumulator = 0;
        this.currentFrame = 0;
        this.anims = new Array();
        if(position != null) {
            this.position.set(position.x, position.y, position.z);
        }
        if(!tileLayout) {
            this.tileLayout = new THREE.Vector3(1, 1, 1);
        } else {
            this.tileLayout = tileLayout;
        }
        assert(texture != null, 'Sprite with null texture constructed');
    }
    Sprite.prototype.update = function (dt) {
        if(this.anims.length != 0) {
            this.timeAccumulator += dt;
            if(this.timeAccumulator > this.anims[this.currentAnimation].times[this.currentFrame]) {
                console.info("setting tile");
                this.setTile();
            }
        }
    };
    Sprite.prototype.setTile = function () {
        this.timeAccumulator = 0;
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeatVector2 = new THREE.Vector2(1 / this.tileLayout.x, 1 / this.tileLayout.y);
        this.currentFrame++;
        if(this.currentFrame == this.anims[this.currentAnimation].frames.length) {
            this.currentFrame = 0;
        }
        var currentColumn = this.anims[this.currentAnimation].frames[this.currentFrame] % this.tileLayout.x;
        var currentRow = Math.floor(this.anims[this.currentAnimation].frames[this.currentFrame] / this.tileLayout.x);
    };
    Sprite.prototype.setAnimation = function (id) {
        this.currentAnimation = id;
    };
    return Sprite;
})(THREE.Mesh);
//@ sourceMappingURL=Sprite.js.map
