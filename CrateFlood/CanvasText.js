var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CanvasText = (function (_super) {
    __extends(CanvasText, _super);
    function CanvasText(position, text, size, font, colour) {
        _super.call(this);
        this.position = position;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
    }
    CanvasText.prototype.createTextCanvas = function (text, size, font, colour) {
    };
    CanvasText.prototype.createText2D = function () {
    };
    return CanvasText;
})(THREE.Object3D);
//@ sourceMappingURL=CanvasText.js.map
