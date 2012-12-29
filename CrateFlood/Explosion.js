var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Animations;
(function (Animations) {
    Animations.explode = {
    };
})(Animations || (Animations = {}));
var Explosion = (function (_super) {
    __extends(Explosion, _super);
    function Explosion(position) {
        var texture = THREE.ImageUtils.loadTexture(Assets.Sprite.player1);
        _super.call(this, 28, 28, texture, position, new THREE.Vector3(4, 2, 8));
        this.anims.push({
            frames: [
                4, 
                5, 
                6, 
                7
            ],
            times: [
                2, 
                2, 
                2, 
                2
            ]
        });
        this.currentAnimation = 0;
    }
    Explosion.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
    };
    return Explosion;
})(Sprite);
//@ sourceMappingURL=Explosion.js.map
