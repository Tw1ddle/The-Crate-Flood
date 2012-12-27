var Debug;
(function (Debug) {
    Debug.ENABLED = true;
    var uniqueID = (function () {
        var id = 0;
        return function () {
            id++;
            return id.toString();
        }
    })();
    function addItem(gui, object, tag) {
        assert(Debug.ENABLED, "Debug addon called with debugging disabled");
        var folder;
        if(tag != null) {
            folder = gui.addFolder(tag.concat(' ').concat(uniqueID()));
        } else {
            folder = gui.addFolder('Object3D'.concat(' ').concat(uniqueID()));
        }
        folder.add(object.position, 'x', -1000, 1000, 0.1).listen();
        folder.add(object.position, 'y', -1000, 1000, 0.1).listen();
        folder.add(object.position, 'z', -1000, 1000, 0.1).listen();
        folder.add(object.rotation, 'x', -Math.PI, Math.PI, 0.1).listen();
        folder.add(object.rotation, 'y', -Math.PI, Math.PI, 0.1).listen();
        folder.add(object.rotation, 'z', -Math.PI, Math.PI, 0.1).listen();
    }
    Debug.addItem = addItem;
    function addItems(gui, objects, tag) {
        for(var i = 0; i < objects.length; i++) {
            addItem(gui, objects[i], tag);
        }
    }
    Debug.addItems = addItems;
})(Debug || (Debug = {}));
//@ sourceMappingURL=Debug.js.map
