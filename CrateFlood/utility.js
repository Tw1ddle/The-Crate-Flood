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
    function modifyConsoleLogging(logic) {
    }
    Utility.modifyConsoleLogging = modifyConsoleLogging;
    function getKeys(object) {
        return Object.keys(object);
    }
    Utility.getKeys = getKeys;
    function getValues(object) {
        var values = new Array();
        for(var key in object) {
            values.push("[" + object[key] + "]");
        }
        return values;
    }
    Utility.getValues = getValues;
    function getPropertyValuePairs(object) {
        var pairs = new Array();
        for(var key in object) {
            pairs.push(key + "=[" + object[key] + "]");
        }
        return pairs;
    }
    Utility.getPropertyValuePairs = getPropertyValuePairs;
    function executeFunctionByName(functionName, context) {
        var more = [];
        for (var _i = 0; _i < (arguments.length - 2); _i++) {
            more[_i] = arguments[_i + 2];
        }
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    }
    Utility.executeFunctionByName = executeFunctionByName;
    function getObjectByName(name, context) {
        var namespaces = name.split(".");
        var func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func];
    }
    Utility.getObjectByName = getObjectByName;
    function dumpObjectIndented(obj, indent) {
        if (typeof indent === "undefined") { indent = " "; }
        var result = "";
        if(indent == null) {
            indent = "";
        }
        for(var property in obj) {
            var value = obj[property];
            if(typeof value == 'string') {
                value = "'" + value + "'";
            } else {
                if(typeof value == 'object') {
                    if(value instanceof Array) {
                        value = "[ " + value + " ]";
                    } else {
                        var od = dumpObjectIndented(value, indent + "  ");
                        value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
                    }
                }
            }
            result += indent + "'" + property + "' : " + value + ",\n";
        }
        return result.replace(/,\n$/, "");
    }
    Utility.dumpObjectIndented = dumpObjectIndented;
})(Utility || (Utility = {}));
//@ sourceMappingURL=Utility.js.map
