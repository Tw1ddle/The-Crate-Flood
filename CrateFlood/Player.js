var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Animations;
(function (Animations) {
    Animations.walkleft = {
        frames: [
            0
        ],
        times: [
            0
        ]
    };
})(Animations || (Animations = {}));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(position) {
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
    Player.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
    };
    return Player;
})(Sprite);
//@ sourceMappingURL=Player.js.map
