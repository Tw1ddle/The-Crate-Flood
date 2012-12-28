var Utility;
(function (Utility) {
    function isFunction(x) {
        return Object.prototype.toString.call(x) == '[object Function]';
    }
    Utility.isFunction = isFunction;
    function generateImage(width, height, fillStyle, alpha) {
        var canvas = document.createElement('canvas');
        assert(canvas, 'canvas image not generated');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        assert(context, '2d canvas context not found');
        context.fillStyle = fillStyle;
        context.globalAlpha = alpha;
        context.fillRect(0, 0, width, height);
        return canvas;
    }
    Utility.generateImage = generateImage;
    function getKeys(object) {
        return Object.keys(object);
    }
    Utility.getKeys = getKeys;
    function getPropertyValuePairs(object) {
        var pairs = "";
        for(var key in object) {
            pairs.concat("[" + key + "]=" + object[key]);
        }
        return pairs;
    }
    Utility.getPropertyValuePairs = getPropertyValuePairs;
})(Utility || (Utility = {}));
//@ sourceMappingURL=IScene.js.map
