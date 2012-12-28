var Debug;
(function (Debug) {
    var ScreenConsole = (function () {
        function ScreenConsole() {
        }
        ScreenConsole.prototype.write = function (message) {
        };
        return ScreenConsole;
    })();
    Debug.ScreenConsole = ScreenConsole;    
    Debug.ENABLED = true;
    var uniqueID = (function () {
        var id = 0;
        return function () {
            id++;
            return id.toString();
        }
    })();
    function getFolder(gui, tag) {
        if(tag != null) {
            return gui.addFolder(tag.concat(' (').concat(uniqueID().concat(')')));
        } else {
            return gui.addFolder('Item '.concat('(').concat(uniqueID().concat(')')));
        }
    }
    function addItem(gui, object, tag) {
        assert(Debug.ENABLED, "Debug addon called with debugging disabled");
        var folder = getFolder(gui, tag);
        folder.add(object.position, 'x', -1000, 1000, 0.1).listen();
        folder.add(object.position, 'y', -1000, 1000, 0.1).listen();
        folder.add(object.position, 'z', -1000, 1000, 0.1).listen();
        folder.add(object.rotation, 'x', 0, Math.PI * 2, 0.1).listen();
        folder.add(object.rotation, 'y', 0, Math.PI * 2, 0.1).listen();
        folder.add(object.rotation, 'z', 0, Math.PI * 2, 0.1).listen();
        folder.add(object.scale, 'x', 0, 10, 0.1).listen();
        folder.add(object.scale, 'y', 0, 10, 0.1).listen();
        folder.add(object.scale, 'z', 0, 10, 0.1).listen();
        folder.add(object, 'visible').listen();
        folder.add(object, 'id').listen();
    }
    Debug.addItem = addItem;
    function addItems(gui, objects, tag) {
        for(var i = 0; i < objects.length; i++) {
            addItem(gui, objects[i], tag);
        }
    }
    Debug.addItems = addItems;
    function addSceneInfo(gui, scene, tag) {
        var folder = getFolder(gui, tag);
        folder.add(scene.children, 'length').listen();
    }
    Debug.addSceneInfo = addSceneInfo;
    function addToScene() {
    }
    Debug.addToScene = addToScene;
})(Debug || (Debug = {}));
//@ sourceMappingURL=debug.js.map
