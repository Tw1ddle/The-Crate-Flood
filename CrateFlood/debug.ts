///<reference path='three.d.ts'/>
///<reference path='dat.gui.d.ts'/>
///<reference path='assert.ts'/>

module Debug {
    export var ENABLED: bool = true;

    //synchronous
    var uniqueID = (function () {
        var id: number = 0;

        return function () { 
            id++;
            return id.toString();
         };
    })();

    export function addItem(gui: any, object: THREE.Object3D, tag?: string): void {
        assert(ENABLED, "Debug addon called with debugging disabled");

        var folder: any;
        
        if (tag != null) {
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

    export function addItems(gui: any, objects: THREE.Object3D[], tag?: string): void {
        for (var i = 0; i < objects.length; i++) {
            addItem(gui, objects[i], tag);
        }
    }

}